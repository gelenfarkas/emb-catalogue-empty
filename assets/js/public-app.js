import { APP_VERSION, appendVersion, logCacheDiagnostics } from "./cache-utils.js";

const [
  {
    createDebug,
    applyDefaultProductPriority,
    getFilterOptions,
    isOheroProduct,
    loadCatalogFromManifest,
    filterProducts,
    sortProducts,
    errorMessage,
  },
  { requireElements, showStatus, parseNumber },
  { fillSelect, renderActiveFilters, renderProductSkeletons, renderProducts },
  { BRAND_MAP },
] = await Promise.all([
  import(appendVersion("./catalog-core.js")),
  import(appendVersion("./dom-utils.js")),
  import(appendVersion("./render.js")),
  import(appendVersion("./brand-mapping.js")),
]);

const REQUIRED = [
  "#status",
  "#searchInput",
  "#searchSubmitBtn",
  "#searchClearBtn",
  "#mainCategoryFilter",
  "#autoCategoryFilter",
  "#brandFilter",
  "#minPriceInput",
  "#maxPriceInput",
  "#sellerFilter",
  "#sortSelect",
  "#activeFilters",
  "#resultCount",
  "#datasetCount",
  "#duplicateCount",
  "#loadingStatus",
  "#productGrid",
  "#loadMoreBtn",
  "#loadMoreCount",
  "#loadMoreMessage",
  "#emptyState",
  "#productCardTemplate",
];

const INITIAL_BATCH_SIZE = 40;
const LOAD_MORE_BATCH_SIZE = 40;
const SKELETON_CARD_COUNT = 10;
const FILTER_RENDER_DELAY_MS = 120;
const LOAD_MORE_DELAY_MS = 240;
const DEFAULT_SORT = "default";

let elements;
let catalog = {
  datasets: [],
  products: [],
  duplicateCount: 0,
  debug: createDebug("public"),
};
let rendered = [];
let visibleLimit = INITIAL_BATCH_SIZE;
let renderFrame = 0;
let filterRenderTimer = 0;
let loadMoreTimer = 0;
let brandSlugToLabel = new Map();
let brandLabelToSlug = new Map();
let activeSearchQuery = "";

init();

async function init() {
  try {
    elements = requireElements(REQUIRED);
  } catch (error) {
    return;
  }

  bindFilters();
  document.querySelector("#resetFiltersBtn")?.addEventListener("click", resetFilters);
  elements.loadMoreBtn.addEventListener("click", showMoreProducts);
  window.addEventListener("popstate", handlePopState);
  showLoadingState("Termékek betöltése... Ez néhány másodpercet igénybe vehet, mert több ezer terméket készítünk elő a szűréshez.", { skeleton: true });
  await loadManifest();
}

async function loadManifest() {
  const initStart = performance.now();
  showStatus(elements.status, "Légy türelemmel, a katalógus betöltése folyamatban van. Több ezer terméket rendezünk kereshető listába.");
  console.groupCollapsed("[Public catalog] Betöltés");

  try {
    catalog = await loadCatalogFromManifest({ debug: createDebug("public") });
    prepareProductsForSearch();
    refreshFilterOptions();
    render({ reason: "initial" });
    catalog.debug.performance.totalInitMs = performance.now() - initStart;
    logPublicPerformance(catalog.debug.performance);
    showStatus(
      elements.status,
      catalog.debug.errors.length
        ? `${rendered.length} termék betöltve, de ${catalog.debug.errors.length} adatforrás hibát jelzett.`
        : `${rendered.length} termék betöltve a katalógusba.`,
      catalog.debug.errors.length ? "error" : "info",
    );
    console.info("Publikus katalógus betöltve", {
      datasets: catalog.datasets.length,
      products: catalog.products.length,
      rendered: rendered.length,
    });
    logCacheDiagnostics({
      page: "public",
      appScriptUrl: import.meta.url,
      manifestUrl: catalog.debug?.manifest?.fetchUrl || appendVersion("data/manifest.json"),
      cleanup: window.__CACHE_CLEANUP_SUMMARY__ || null,
    });
  } catch (error) {
    console.error("Publikus katalógus betöltési hiba", error);
    clearLoadingState();
    showStatus(elements.status, "A termékek betöltése nem sikerült.", "error");
  } finally {
    console.groupEnd();
  }
}

function bindFilters() {
  elements.searchSubmitBtn.addEventListener("click", submitSearch);
  elements.searchClearBtn.addEventListener("click", clearSearch);
  elements.searchInput.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    submitSearch();
  });

  for (const input of [elements.minPriceInput, elements.maxPriceInput]) {
    input.addEventListener("input", () => scheduleRender({ resetPage: true }));
    input.addEventListener("change", () => scheduleRender({ resetPage: true }));
  }

  for (const input of [elements.mainCategoryFilter, elements.autoCategoryFilter, elements.sellerFilter, elements.sortSelect]) {
    input.addEventListener("change", () => scheduleRender({ resetPage: true }));
  }

  elements.brandFilter.addEventListener("change", () => {
    updateUrlState();
    scheduleRender({ resetPage: true });
  });
}

function prepareProductsForSearch() {
  for (const product of catalog.products) {
    product.searchIndex = product.searchIndex || buildSearchIndex(product);
  }
}

function refreshFilterOptions() {
  const options = getFilterOptions(catalog.products, catalog.datasets);
  fillSelect(elements.mainCategoryFilter, options.mainCategories, "Összes manuális kategória");
  fillSelect(elements.autoCategoryFilter, options.autoCategories, "Összes automatikus kategória");
  fillSelect(elements.brandFilter, options.brands, "Összes márka");
  fillSelect(elements.sellerFilter, options.sellers, "Összes bolt");
  rebuildBrandSlugMaps(options.brands);
  applySearchFromUrl();
  applyBrandFromUrl();
}

function scheduleRender({ resetPage = false, onComplete = null } = {}) {
  window.clearTimeout(filterRenderTimer);
  window.clearTimeout(loadMoreTimer);
  if (!onComplete) resetSearchButton();
  showLoadingState("Találatok frissítése...", { soft: true });
  filterRenderTimer = window.setTimeout(() => {
    if (renderFrame) cancelAnimationFrame(renderFrame);
    renderFrame = requestAnimationFrame(() => {
      renderFrame = 0;
      try {
        render({ reason: "filter-change", resetPage });
      } finally {
        if (typeof onComplete === "function") onComplete();
      }
    });
  }, FILTER_RENDER_DELAY_MS);
}

function render({ reason = "manual", resetPage = false } = {}) {
  const start = performance.now();
  if (resetPage) visibleLimit = INITIAL_BATCH_SIZE;
  const filters = readFilters();
  const filterStart = performance.now();
  const filteredProducts = filterProducts(catalog.products, filters);
  rendered = hasUserSort(filters.sort) ? sortProducts(filteredProducts, filters.sort) : applyDefaultProductPriority(filteredProducts);
  const visibleProducts = rendered.slice(0, visibleLimit);
  const filterSortMs = performance.now() - filterStart;

  try {
    const renderStart = performance.now();
    renderProducts(elements.productGrid, visibleProducts, elements.productCardTemplate, { mode: "public" });
    const renderMs = performance.now() - renderStart;
    catalog.debug.performance.firstRenderMs = catalog.debug.performance.firstRenderMs || renderMs;

    if (reason === "initial") {
      const oheroCount = rendered.reduce((count, product) => count + (isOheroProduct(product) ? 1 : 0), 0);
      console.info("[Public catalog] Első render", {
        products: visibleProducts.length,
        totalMatches: rendered.length,
        oheroCount,
        firstProductsAreOhero: rendered.slice(0, Math.min(oheroCount, 12)).every(isOheroProduct),
        filterSortMs: roundMs(filterSortMs),
        renderMs: roundMs(renderMs),
        totalRenderCycleMs: roundMs(performance.now() - start),
      });
    }

    if (reason === "filter-change") {
      console.info("[Public catalog] Szűrés render", {
        products: visibleProducts.length,
        totalMatches: rendered.length,
        filterSortMs: roundMs(filterSortMs),
        renderMs: roundMs(renderMs),
        totalRenderCycleMs: roundMs(performance.now() - start),
      });
    }
  } catch (error) {
    console.error("Publikus render hiba", error);
    clearLoadingState();
    showStatus(elements.status, `A terméklista megjelenítése nem sikerült: ${errorMessage(error)}`, "error");
    return;
  }

  clearLoadingState();
  elements.emptyState.hidden = rendered.length > 0;
  updateLoadMoreState(visibleProducts.length, rendered.length);
  elements.resultCount.textContent =
    visibleLimit < rendered.length ? `${visibleProducts.length} / ${rendered.length} találat` : `${rendered.length} találat`;
  elements.datasetCount.textContent = `${catalog.datasets.length} válogatás`;
  elements.duplicateCount.textContent = `${catalog.duplicateCount} ismétlődés szűrve`;
  renderActiveFilters(elements.activeFilters, [
    { label: "Keresés", value: filters.query },
    { label: "Automatikus kategória", value: filters.autoCategory },
    { label: "Márka", value: filters.brand },
    { label: "Min", value: filters.minPrice ?? "" },
    { label: "Max", value: filters.maxPrice ?? "" },
    { label: "Bolt", value: filters.seller },
    { label: "Manuális kategória", value: filters.mainCategory },
  ]);
}

function showMoreProducts() {
  const button = elements.loadMoreBtn;
  button.disabled = true;
  button.classList.add("is-loading");
  button.innerHTML = `<span>Betöltés...</span><small>További termékek betöltése...</small>`;
  showLoadingState("További termékek betöltése...", { soft: true });

  loadMoreTimer = window.setTimeout(() => {
    visibleLimit += LOAD_MORE_BATCH_SIZE;
    render({ reason: "load-more" });
  }, LOAD_MORE_DELAY_MS);
}

function updateLoadMoreState(loadedProducts, totalProducts) {
  const hasProducts = totalProducts > 0;
  const hasMoreProducts = loadedProducts < totalProducts;

  elements.loadMoreCount.textContent = `${loadedProducts} / ${totalProducts} találat megjelenítve`;
  elements.loadMoreMessage.textContent = hasProducts
    ? hasMoreProducts
      ? "Van még betölthető termék."
      : "Minden találat megjelenítve."
    : "Nincs megjeleníthető termék.";

  elements.loadMoreBtn.hidden = !hasMoreProducts;
  elements.loadMoreBtn.disabled = false;
  elements.loadMoreBtn.classList.remove("is-loading");
  elements.loadMoreBtn.innerHTML = `<span>További termékek betöltése</span><small>Kattints a következő adag megjelenítéséhez</small>`;
}

function hasUserSort(sort) {
  return Boolean(sort && sort !== DEFAULT_SORT);
}

function readFilters() {
  return {
    query: activeSearchQuery,
    mainCategory: elements.mainCategoryFilter.value,
    autoCategory: elements.autoCategoryFilter.value,
    brand: elements.brandFilter.value,
    minPrice: parseNumber(elements.minPriceInput.value),
    maxPrice: parseNumber(elements.maxPriceInput.value),
    seller: elements.sellerFilter.value,
    sort: elements.sortSelect.value,
  };
}

function resetFilters() {
  elements.searchInput.value = "";
  activeSearchQuery = "";
  elements.mainCategoryFilter.value = "";
  elements.autoCategoryFilter.value = "";
  elements.brandFilter.value = "";
  elements.minPriceInput.value = "";
  elements.maxPriceInput.value = "";
  elements.sellerFilter.value = "";
  elements.sortSelect.value = DEFAULT_SORT;
  updateUrlState();
  scheduleRender({ resetPage: true });
}

function submitSearch() {
  const nextQuery = elements.searchInput.value.trim();
  activeSearchQuery = nextQuery;
  updateUrlState();
  elements.searchSubmitBtn.disabled = true;
  elements.searchSubmitBtn.textContent = "Keresés...";
  scheduleRender({ resetPage: true, onComplete: resetSearchButton });
}

function clearSearch() {
  if (!elements.searchInput.value && !activeSearchQuery) return;
  elements.searchInput.value = "";
  activeSearchQuery = "";
  updateUrlState();
  scheduleRender({ resetPage: true });
}

function resetSearchButton() {
  elements.searchSubmitBtn.disabled = false;
  elements.searchSubmitBtn.textContent = "Keresés";
}

function rebuildBrandSlugMaps(brandLabels) {
  brandSlugToLabel = new Map();
  brandLabelToSlug = new Map();

  for (const label of brandLabels || []) {
    const slug = brandSlugForLabel(label);
    if (!slug) continue;
    brandSlugToLabel.set(slug, label);
    brandLabelToSlug.set(label, slug);
  }
}

function applyBrandFromUrl() {
  const slug = normalizeBrandSlug(new URLSearchParams(window.location.search).get("brand"));
  if (!slug) return;

  const label = brandSlugToLabel.get(slug);
  if (label && optionExists(elements.brandFilter, label)) {
    elements.brandFilter.value = label;
  }
}

function applySearchFromUrl() {
  const query = String(new URLSearchParams(window.location.search).get("search") || "").trim();
  activeSearchQuery = query;
  elements.searchInput.value = query;
}

function updateBrandUrlFromSelect({ replace = false } = {}) {
  updateUrlState({ replace });
}

function updateUrlState({ replace = false } = {}) {
  const url = new URL(window.location.href);
  const slug = brandLabelToSlug.get(elements.brandFilter.value) || "";

  if (slug) {
    url.searchParams.set("brand", slug);
  } else {
    url.searchParams.delete("brand");
  }

  if (activeSearchQuery) {
    url.searchParams.set("search", activeSearchQuery);
  } else {
    url.searchParams.delete("search");
  }

  const nextUrl = `${url.pathname}${url.search}${url.hash}`;
  const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  if (nextUrl === currentUrl) return;

  const method = replace ? "replaceState" : "pushState";
  window.history[method]({}, "", nextUrl);
}

function handlePopState() {
  const previousBrand = elements.brandFilter.value;
  const previousSearch = activeSearchQuery;
  elements.brandFilter.value = "";
  applySearchFromUrl();
  applyBrandFromUrl();
  if (elements.brandFilter.value !== previousBrand || activeSearchQuery !== previousSearch) {
    scheduleRender({ resetPage: true });
  }
}

function brandSlugForLabel(label) {
  const brand = (BRAND_MAP || []).find((item) => item.label === label);
  return normalizeBrandSlug(brand?.id || label);
}

function normalizeBrandSlug(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function optionExists(select, value) {
  return Array.from(select.options || []).some((option) => option.value === value);
}

function buildSearchIndex(product) {
  return [
    product.title,
    product.normalizedTitle,
    product.itemId,
    product.sellerName,
    product.source,
    product.primaryBrand,
    ...(product.brands || []),
    product.categoryLabel,
    product.manualCategory,
    ...(product.autoCategories || []),
    ...(product.allCategories || product.categories || []),
  ]
    .map((value) => String(value || ""))
    .join(" ")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function showLoadingState(message, { skeleton = false, soft = false } = {}) {
  elements.loadingStatus.textContent = message;
  elements.loadingStatus.hidden = false;
  elements.productGrid.classList.toggle("is-loading", soft);
  if (skeleton) renderProductSkeletons(elements.productGrid, SKELETON_CARD_COUNT);
}

function clearLoadingState() {
  elements.loadingStatus.hidden = true;
  elements.productGrid.classList.remove("is-loading");
}

function logPublicPerformance(metrics) {
  console.info("[Public catalog] Performance mérés");
  console.table({
    verzio: APP_VERSION,
    "manifest fetch": roundMs(metrics.manifestFetchMs),
    "manifest parse": roundMs(metrics.manifestParseMs),
    "datasetek összesen": roundMs(metrics.datasetTotalMs),
    "dataset fetch összesen": roundMs(metrics.datasetFetchMs),
    "dataset parse összesen": roundMs(metrics.datasetParseMs),
    normalizálás: roundMs(metrics.normalizeMs),
    deduplikáció: roundMs(metrics.dedupeMs),
    "első render": roundMs(metrics.firstRenderMs),
    "teljes public init": roundMs(metrics.totalInitMs),
  });
}

function roundMs(value) {
  return `${Math.round((value || 0) * 10) / 10} ms`;
}
