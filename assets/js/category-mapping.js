export const UNCATEGORIZED_LABEL = "Kategorizálatlan";

const CN_WEIGHT = 2;
const DEFAULT_WEIGHT = 1;

const UNCATEGORIZED_KEYWORDS = ["耳机"];

export const CATEGORY_MAP = [
  {
    id: "cipo",
    label: "Cipő",
    keywords: {
      hu: ["cipő", "cipők", "sportcipő", "edzőcipő", "bakancs", "szandál", "szandal"],
      en: ["shoe", "shoes", "sneaker", "sneakers", "low-top", "low top", "running shoe", "basketball shoe", "boot", "boots", "sandals", "slides", "slipper", "trainer", "trainer shoes"],
      cn: ["鞋", "鞋子", "运动鞋", "跑步鞋", "篮球鞋", "休闲鞋", "板鞋", "户外鞋", "徒步鞋", "越野鞋", "凉鞋", "拖鞋", "雪地靴", "登山鞋", "低帮", "高帮", "帆布鞋"],
    },
  },
  {
    id: "sport",
    label: "Sport",
    priority: 1,
    keywords: {
      hu: ["sport", "edző", "edzo", "futás", "futas", "kosárlabda", "kosarlabda", "fitness"],
      en: ["sport", "sports", "running", "runner", "basketball", "training", "fitness", "gym", "workout"],
      cn: ["运动", "篮球", "训练", "健身"],
    },
  },
  {
    id: "outdoor",
    label: "Outdoor",
    priority: 1,
    keywords: {
      hu: ["outdoor", "túra", "tura", "túrázás", "turazas", "túracipő", "turacipo", "terep", "kemping"],
      en: ["outdoor", "hiking", "trekking", "trail", "camping", "mountain"],
      cn: ["户外", "登山", "徒步", "越野"],
    },
  },
  {
    id: "taska",
    label: "Táska",
    keywords: {
      hu: ["táska", "táskák", "hátizsák", "hatizsak", "sporttáska", "oldaltáska", "kézitáska", "kezitaska", "válltáska", "valltaska"],
      en: ["bag", "bags", "backpack", "handbag", "shoulder bag", "travel bag", "luggage", "tote", "tote bag", "duffle", "crossbody", "bucket bag", "school bag", "makeup bag", "wallet bag"],
      cn: ["包", "背包", "双肩包", "手提包", "单肩包", "斜挎包", "托特包", "水桶包", "旅行包", "书包", "化妆包", "妈咪包"],
    },
    excludedTokenSequences: ["dust bag", "with bag", "shoe bag", "packaging bag"],
  },
  {
    id: "ruha",
    label: "Női ruhák",
    priority: 1,
    contextualKeywords: {
      hu: ["női", "noi", "lány", "lany"],
      en: ["woman", "women", "girl", "girls", "lady", "ladies", "female"],
      cn: ["女", "女士", "女款", "女装", "女生"],
    },
    contextKeywords: {
      hu: ["ruha", "felső", "felso", "szoknya", "póló", "polo", "pulcsi", "pulóver", "pulover", "ing", "kabát", "kabat", "dzseki", "mellény", "melleny"],
      en: ["dress", "shirt", "t shirt", "tee", "hoodie", "sweater", "pullover", "blouse", "jacket", "coat", "skirt"],
      cn: ["连衣裙", "裙子", "上衣", "短袖", "长袖", "卫衣", "毛衣", "衬衫", "外套", "夹克"],
    },
  },
  {
    id: "polo",
    label: "Póló / Ing",
    priority: 1,
    keywords: {
      hu: ["póló", "polo", "rövid ujjú", "rovid ujju", "hosszú ujjú", "hosszu ujju", "ing"],
      en: ["t-shirt", "t-shirts", "tshirt", "t-shir", "t-shir*", "t shirt", "tee", "short sleeve", "short-sleeve", "short-sleeve shirt", "short sleeved", "long sleeve", "shirt", "polo shirt", "polo", "polo&shirt"],
      cn: ["短袖", "长袖", "衬衫", "t恤"],
    },
  },
  {
    id: "pulcsi",
    label: "Pulóver",
    priority: 1,
    keywords: {
      hu: ["pulcsi", "pulóver", "pulover", "kapucnis pulóver", "kapucnis pulover"],
      en: ["hoodie", "hoodies", "sweater", "sweatshirt", "cardigan", "knit", "pullover", "knit hoodie", "hooded sweatshirt"],
      cn: ["卫衣", "毛衣", "帽衫", "开衫"],
    },
  },
  {
    id: "sapka",
    label: "Sapka",
    keywords: {
      hu: ["sapka", "kalap", "baseball sapka"],
      en: ["cap", "hat", "baseball cap", "peaked cap", "beanie", "knit hat"],
      cn: ["帽", "帽子", "棒球帽", "鸭舌帽", "毛线帽", "针织帽"],
    },
  },
  {
    id: "sal",
    label: "Sál",
    keywords: {
      hu: ["sál", "sal", "nyaksál", "nyaksal", "kendő", "kendo", "csősál", "csosal", "körsál", "korsal", "téli sál", "teli sal", "gyapjú sál", "gyapju sal"],
      en: ["scarf", "neck scarf", "neck warmer", "winter scarf", "shawl", "wrap", "loop scarf", "infinity scarf"],
      cn: ["围巾", "围脖", "披肩"],
    },
  },
  {
    id: "nadrag",
    label: "Nadrág",
    keywords: {
      hu: ["nadrág", "nadrag", "farmer", "melegítő nadrág", "melegito nadrag"],
      en: ["pants", "trousers", "jeans", "denim pants", "long pants", "wide leg pants", "cargo pants", "track pants", "sweatpants", "joggers"],
      cn: ["裤", "长裤", "牛仔裤", "阔腿裤", "裤子", "休闲裤", "卫裤", "工装裤"],
    },
  },
  {
    id: "rovidnadrag",
    label: "Rövidnadrág",
    priority: 1,
    keywords: {
      hu: ["rövidnadrág", "rovidnadrag"],
      en: ["shorts", "short pants"],
      cn: ["短裤"],
    },
  },
  {
    id: "kabat",
    label: "Kabát",
    priority: 1,
    keywords: {
      hu: ["kabát", "kabat", "dzseki"],
      en: ["jacket", "coat", "down jacket", "parka", "windbreaker", "puffer"],
      cn: ["外套", "夹克", "羽绒服", "大衣", "棉服"],
    },
  },
  {
    id: "melleny",
    label: "Mellény",
    keywords: {
      hu: ["mellény", "melleny"],
      en: ["vest", "waistcoat", "gilet"],
      cn: ["马甲"],
    },
  },
  {
    id: "furdoruha",
    label: "Fürdőruha",
    keywords: {
      hu: ["fürdőruha", "furdoruha"],
      en: ["swimwear", "swimsuit", "bikini"],
      cn: ["泳衣", "比基尼"],
    },
  },
  {
    id: "fehernemu",
    label: "Fehérnemű",
    keywords: {
      hu: ["fehérnemű", "fehernemu"],
      en: ["underwear", "lingerie", "bra", "panties", "bodysuit"],
      cn: ["内衣", "文胸", "内裤"],
    },
  },
  {
    id: "borond_poggyasz",
    label: "Bőrönd / Poggyász",
    keywords: {
      hu: ["bőrönd", "borond", "poggyász", "poggyasz"],
      en: ["luggage", "suitcase", "travel case"],
      cn: ["行李箱", "箱包"],
    },
  },
  {
    id: "napszemuveg",
    label: "Napszemüveg",
    keywords: {
      hu: ["napszemüveg", "napszemuveg"],
      en: ["sunglasses"],
      cn: ["墨镜", "太阳镜"],
    },
  },
  {
    id: "szemuveg_goggles",
    label: "Szemüveg / Goggles",
    keywords: {
      hu: ["szemüveg", "szemuveg"],
      en: ["glasses", "goggles", "ski goggles"],
      cn: ["眼镜", "护目镜"],
    },
  },
  {
    id: "ekszer",
    label: "Ékszer",
    keywords: {
      hu: ["ékszer", "ekszer"],
      en: ["jewelry", "jewellery", "necklace", "bracelet", "ring", "earrings", "hairpin"],
      cn: ["首饰", "项链", "手链", "戒指", "耳环", "发夹"],
    },
  },
  {
    id: "mez",
    label: "Mez",
    keywords: {
      hu: ["mez"],
      en: ["jersey", "baseball uniform", "uniform"],
      cn: ["球衣"],
    },
  },
  {
    id: "gyerekruha",
    label: "Gyerekruha",
    priority: 1,
    keywords: {
      hu: ["gyerekruha", "gyerek", "gyerekek"],
      en: ["girls' clothing", "girls clothing", "children's short-sleeve shirts", "children's", "children", "child", "kids", "boys", "baby", "childr"],
      cn: ["童装", "儿童", "女童", "男童", "小孩"],
    },
  },
  {
    id: "szett_ruhaszett",
    label: "Szett / Ruhaszett",
    keywords: {
      hu: ["szett", "ruhaszett"],
      en: ["set", "suit", "clothing set", "two-piece set", "three-piece set"],
      cn: ["套装", "两件套", "三件套"],
    },
  },
  {
    id: "ora",
    label: "Óra",
    keywords: {
      hu: ["óra", "ora", "karóra", "karora"],
      en: ["watch", "wrist watch", "wristwatch"],
      cn: ["表", "手表"],
    },
  },
  {
    id: "ov",
    label: "Öv",
    keywords: {
      hu: ["öv", "ov"],
      en: ["belt"],
      cn: ["腰带", "皮带"],
    },
  },
  {
    id: "zokni",
    label: "Zokni",
    keywords: {
      hu: ["zokni"],
      en: ["sock", "socks"],
      cn: ["袜子", "长袜", "短袜"],
    },
  },
  {
    id: "takaro_pled",
    label: "Takaró / Pléd",
    keywords: {
      hu: ["takaró", "takaro", "pléd", "pled"],
      en: ["blanket", "throw"],
      cn: ["毛毯", "毯子"],
    },
  },
  {
    id: "haloruha_pizsama",
    label: "Hálóruha / Pizsama",
    keywords: {
      hu: ["hálóruha", "haloruha", "pizsama"],
      en: ["pajamas", "pajama", "nightdress", "nightgown", "sleepwear", "camisole nightgown"],
      cn: ["睡衣", "吊带睡裙"],
    },
  },
  {
    id: "lego_epitojatek",
    label: "Lego / Építőjáték",
    keywords: {
      hu: ["lego", "építőjáték", "epitojatek", "építőkocka", "epitokocka"],
      en: ["lego", "building blocks"],
      cn: ["乐高", "积木"],
    },
  },
  {
    id: "penztarca",
    label: "Pénztárca",
    keywords: {
      hu: ["pénztárca", "penztarca", "pénztárca szett", "penztarca szett", "kártyatartó", "kartyatarto"],
      en: ["wallet", "card holder", "coin purse", "purse"],
      cn: ["钱包", "卡包", "钱夹", "零钱包"],
    },
  },
  {
    id: "kategorizalatlan",
    label: UNCATEGORIZED_LABEL,
    keywords: {
      hu: [],
      en: [],
      cn: [],
    },
  },
];

export const CATEGORY_BY_ID = Object.fromEntries(CATEGORY_MAP.map((category) => [category.id, category]));

const CATEGORY_ALIAS_BY_KEY = {
  cipo: "cipo",
  cipok: "cipo",
  shoe: "cipo",
  shoes: "cipo",
  taska: "taska",
  bag: "taska",
  bags: "taska",
  ruha: "ruha",
  noi_ruha: "ruha",
  noi_ruhak: "ruha",
  polo: "polo",
  polo_ing: "polo",
  polo_ingek: "polo",
  ing: "polo",
  pulcsi: "pulcsi",
  pulover: "pulcsi",
  sapka: "sapka",
  sal: "sal",
  nadrag: "nadrag",
  pants: "nadrag",
  rovidnadrag: "rovidnadrag",
  shorts: "rovidnadrag",
  kabat: "kabat",
  melleny: "melleny",
  furdoruha: "furdoruha",
  furdo_ruha: "furdoruha",
  fehernemu: "fehernemu",
  underwear: "fehernemu",
  borond: "borond_poggyasz",
  poggyasz: "borond_poggyasz",
  borond_poggyasz: "borond_poggyasz",
  luggage: "borond_poggyasz",
  napszemuveg: "napszemuveg",
  sunglasses: "napszemuveg",
  szemuveg: "szemuveg_goggles",
  goggles: "szemuveg_goggles",
  ekszer: "ekszer",
  jewelry: "ekszer",
  jewellery: "ekszer",
  mez: "mez",
  jersey: "mez",
  gyerekruha: "gyerekruha",
  children: "gyerekruha",
  kids: "gyerekruha",
  szett: "szett_ruhaszett",
  ruhaszett: "szett_ruhaszett",
  szett_ruhaszett: "szett_ruhaszett",
  set: "szett_ruhaszett",
  suit: "szett_ruhaszett",
  ora: "ora",
  watch: "ora",
  ov: "ov",
  belt: "ov",
  zokni: "zokni",
  sock: "zokni",
  socks: "zokni",
  takaro: "takaro_pled",
  takaro_pled: "takaro_pled",
  pled: "takaro_pled",
  blanket: "takaro_pled",
  haloruha: "haloruha_pizsama",
  pizsama: "haloruha_pizsama",
  pajamas: "haloruha_pizsama",
  pajama: "haloruha_pizsama",
  sleepwear: "haloruha_pizsama",
  lego: "lego_epitojatek",
  epitojatek: "lego_epitojatek",
  building_blocks: "lego_epitojatek",
  penztarca: "penztarca",
  wallet: "penztarca",
  card_holder: "penztarca",
  kategorizalatlan: "kategorizalatlan",
};

export function detectCategory(title) {
  return detectCategories(title)[0] || "";
}

export function detectCategories(title) {
  const haystack = normalizeSearchText(title);
  const tokenText = normalizeTokenText(title);
  if (!haystack || !tokenText) return [];

  const tokens = tokenize(tokenText);
  const matches = rankCategoryMatches({ haystack, tokenText, tokens });
  const best = matches[0];
  if (!best) return [];
  if (hasUncategorizedKeyword(haystack) && best.score <= CN_WEIGHT) return [];

  return matches.map((match) => match.category.id);
}

export function getCategoryLabel(categoryId) {
  return CATEGORY_BY_ID[categoryId]?.label || "";
}

export function normalizeCategoryId(value) {
  const key = normalizeCategoryKey(value);
  if (!key) return "";
  if (CATEGORY_BY_ID[key]) return key;
  return CATEGORY_ALIAS_BY_KEY[key] || "";
}

export function normalizeCategoryLabel(value) {
  const categoryId = normalizeCategoryId(value);
  if (categoryId) return getCategoryLabel(categoryId);
  return cleanCategoryLabel(value);
}

export function findCategoryByQuery(query) {
  const normalizedQuery = normalizeSearchText(query);
  const normalizedTokenQuery = normalizeTokenText(query);
  if (!normalizedQuery) return null;

  for (const category of CATEGORY_MAP) {
    if (normalizeSearchText(category.label) === normalizedQuery || category.id === normalizedQuery) {
      return category;
    }

    for (const keyword of categoryKeywords(category)) {
      const normalizedKeyword = normalizeTokenText(keyword);
      if (!normalizedKeyword) continue;
      if (normalizedKeyword === normalizedTokenQuery) return category;
    }
  }

  return null;
}

export function expandSearchQuery(query) {
  const terms = [normalizeTokenText(query)].filter(Boolean);
  const category = findCategoryByQuery(query);
  if (!category) return terms;

  for (const keyword of categoryKeywords(category)) {
    const normalizedKeyword = normalizeTokenText(keyword);
    if (normalizedKeyword) terms.push(normalizedKeyword);
  }

  return unique(terms);
}

export function isManifestCategory(categoryId, manifestCategories = []) {
  const label = getCategoryLabel(categoryId);
  if (!label) return false;
  return manifestCategories.some((category) => normalizeSearchText(category) === normalizeSearchText(label));
}

export function normalizeSearchText(value) {
  return String(value || "")
    .replace(/[“”„]/g, '"')
    .replace(/[‘’`´]/g, "'")
    .replace(/[–—]/g, "-")
    .replace(/[<>]+/g, " ")
    .replace(/\blink\s*\d+\b/gi, " ")
    .replace(/\bsize\s*[:：]?\s*[a-z0-9\-\/]+\b/gi, " ")
    .replace(/α/g, "a")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\*+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function normalizeTitleForMatching(title) {
  return normalizeSearchText(title);
}

function scoreCategory(category, context) {
  let score = 0;
  let longestKeyword = "";

  for (const [language, keywords] of Object.entries(category.keywords || {})) {
    const weight = language === "cn" ? CN_WEIGHT : DEFAULT_WEIGHT;
    for (const keyword of keywords || []) {
      const normalizedKeyword = matchedKeyword(context, keyword, category);
      if (!normalizedKeyword) continue;
      score += weight;
      if (normalizedKeyword.length > longestKeyword.length) longestKeyword = normalizedKeyword;
    }
  }

  for (const keyword of contextualCategoryKeywords(category)) {
    const normalizedKeyword = matchedKeyword(context, keyword, category);
    if (!normalizedKeyword) continue;
    if (!hasContext(context, contextualCategoryContexts(category))) continue;
    score += DEFAULT_WEIGHT;
    if (normalizedKeyword.length > longestKeyword.length) longestKeyword = normalizedKeyword;
  }

  return { score, longestKeyword };
}

function rankCategoryMatches(context) {
  return CATEGORY_MAP.map((category) => ({ category, ...scoreCategory(category, context) }))
    .filter((match) => match.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (b.longestKeyword.length !== a.longestKeyword.length) return b.longestKeyword.length - a.longestKeyword.length;
      return categoryPriority(b.category) - categoryPriority(a.category);
    });
}

function matchedKeyword(context, keyword, category = null) {
  const normalizedKeyword = normalizeTokenText(keyword);
  if (!normalizedKeyword) return "";
  if (matchesKeyword(context, keyword, category)) return normalizedKeyword;
  return "";
}

function matchesKeyword(context, keyword, category = null) {
  const normalizedKeyword = normalizeTokenText(keyword);
  if (!normalizedKeyword) return false;
  if (containsCjk(keyword)) return context.haystack.includes(normalizeSearchText(keyword));
  const matched = normalizedKeyword.includes(" ")
    ? hasTokenSequence(context.tokenText, normalizedKeyword)
    : context.tokens.has(normalizedKeyword);
  if (!matched) return false;
  return !isExcludedCategoryKeyword(context, category, normalizedKeyword);
}

function hasTokenSequence(tokenText, normalizedKeyword) {
  return ` ${tokenText} `.includes(` ${normalizedKeyword} `);
}

function hasContext(context, contextKeywords) {
  return (contextKeywords || []).some((keyword) => matchesKeyword(context, keyword));
}

function isExcludedCategoryKeyword(context, category, normalizedKeyword) {
  if (!category) return false;

  if (category.id === "taska" && ["bag", "bags"].includes(normalizedKeyword)) {
    return (category.excludedTokenSequences || []).some((phrase) => hasTokenSequence(context.tokenText, normalizeTokenText(phrase)));
  }

  if (category.id === "szett_ruhaszett" && normalizedKeyword === "set") {
    return hasTokenSequence(context.tokenText, "data set") || hasTokenSequence(context.tokenText, "tool set");
  }

  return false;
}

function hasUncategorizedKeyword(haystack) {
  return UNCATEGORIZED_KEYWORDS.some((keyword) => haystack.includes(normalizeSearchText(keyword)));
}

function categoryKeywords(category) {
  return [
    ...Object.values(category.keywords || {}).flat(),
    ...contextualCategoryKeywords(category),
  ];
}

function contextualCategoryKeywords(category) {
  return Object.values(category.contextualKeywords || {}).flat();
}

function contextualCategoryContexts(category) {
  return Object.values(category.contextKeywords || {}).flat();
}

function categoryPriority(category) {
  return Number.isFinite(category.priority) ? category.priority : 0;
}

function normalizeCategoryKey(value) {
  return normalizeSearchText(value)
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function normalizeTokenText(value) {
  return normalizeSearchText(value)
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(value) {
  return new Set(normalizeTokenText(value).split(" ").filter(Boolean));
}

function containsCjk(value) {
  return /[\u4e00-\u9fff]/.test(String(value || ""));
}

function cleanCategoryLabel(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function unique(values) {
  return Array.from(new Set(values));
}
