import { appendVersion } from "./cache-utils.js";

const { normalizeSearchText } = await import(appendVersion("./category-mapping.js"));

const CONTEXT_WEIGHT = 2;
const DEFAULT_WEIGHT = 1;

export const BRAND_MAP = [
  {
    id: "nike",
    label: "Nike",
    aliases: ["nike", "nik*", "nik", "耐克", "air force", "vomero", "pegasus", "kobe", "ja"],
    strictTokens: ["nk"],
    contextualKeywords: ["nocta"],
    contextKeywords: ["nike", "shoe", "shoes", "sneaker", "sneakers", "basketball", "running", "air force", "kobe", "pegasus"],
  },
  {
    id: "jordan",
    label: "Jordan",
    aliases: ["jordan", "air jordan", "乔丹", "aj1", "aj3", "aj4", "aj11", "aj12", "aj14"],
  },
  {
    id: "balenciaga",
    label: "Balenciaga",
    aliases: ["balenciaga", "balenciag*", "balenciaga*", "baiencia*ga", "bale*ciaga", "巴黎世家", "triple s", "3xl", "radar"],
    strictTokens: ["blcg"],
    compactKeywords: ["balenciag"],
    contextualKeywords: ["speedcat", "paris"],
    contextKeywords: ["balenciaga", "巴黎世家", "3xl", "shoe", "shoes", "sneaker", "sneakers"],
  },
  {
    id: "on_cloud",
    label: "On / On Running",
    aliases: ["on running", "on cloud", "cloudswift", "cloudtilt", "cloudventure", "cloudmonster", "cloud x", "昂跑", "kith x on"],
    contextualKeywords: ["on", "cloud"],
    contextKeywords: ["昂跑", "running", "runner", "shoe", "shoes", "sneaker", "run", "kith", "paf", "shirt", "t shirt", "hoodie", "jacket", "pants", "shorts", "hat", "cap"],
  },
  {
    id: "hoka",
    label: "Hoka",
    aliases: ["hoka", "one one", "mafate", "speedgoat"],
  },
  {
    id: "adidas",
    label: "Adidas",
    aliases: ["adidas", "adida*", "adida", "ad1das", "ad originals", "originals", "gazelle", "superstar", "adizero", "campus", "阿迪"],
    strictTokens: ["ad"],
  },
  {
    id: "ralph_lauren",
    label: "Ralph Lauren",
    aliases: ["ralph lauren", "ralph lau*ren", "raiph*lauren", "raiph lauren", "ralp* laure*", "ralp laure", "拉夫劳伦"],
    strictTokens: ["rl"],
    contextualKeywords: ["pony"],
    contextKeywords: ["ralph", "lauren", "polo", "shirt", "hoodie", "sweater"],
  },
  {
    id: "gucci",
    label: "Gucci",
    aliases: ["gucci", "gucc*", "guccl", "古驰", "screener"],
    compactKeywords: ["gucci"],
    contextualKeywords: ["gg"],
    contextKeywords: ["gucci", "古驰", "bag", "wallet", "belt", "monogram"],
  },
  {
    id: "iphone",
    label: "iPhone",
    keywords: ["iphone", "apple iphone", "苹果手机"],
    contextualKeywords: ["apple", "苹果"],
    contextKeywords: ["iphone", "phone", "case", "手机", "手机壳"],
  },
  {
    id: "fear_of_god_essentials",
    label: "Fear of God / Essentials",
    aliases: ["fear of god", "essentials", "essentia*ls"],
    strictTokens: ["fog", "ess"],
    compactKeywords: ["fearofgod", "essentialszone"],
  },
  {
    id: "travis_scott",
    label: "Travis Scott",
    keywords: ["travis scott"],
  },
  {
    id: "syna_world",
    label: "Syna World",
    keywords: ["syna world", "synaworld"],
    compactKeywords: ["syna"],
  },
  {
    id: "corteiz",
    label: "Corteiz",
    keywords: ["corteiz", "corte*iz", "corte1z"],
    compactKeywords: ["corteiz"],
  },
  {
    id: "trapstar",
    label: "Trapstar",
    keywords: ["trapstar", "trapsta*", "trapsta", "trap*star", "trao*star"],
    compactKeywords: ["trapstar", "trapsta"],
  },
  {
    id: "asics",
    label: "Asics",
    aliases: ["asics", "gel-kayano", "gel-cumulus", "superblast", "亚瑟士", "onitsuka", "mexico 66"],
  },
  {
    id: "chanel",
    label: "Chanel",
    keywords: ["chanel", "chan*el", "香奈儿"],
    compactKeywords: ["chanel"],
  },
  {
    id: "dior",
    label: "Dior",
    keywords: ["dior", "di*or", "di#or", "迪奥"],
    compactKeywords: ["dior"],
  },
  {
    id: "new_balance",
    label: "New Balance",
    aliases: ["new balance", "新百伦"],
    strictTokens: ["nb"],
  },
  {
    id: "converse",
    label: "Converse",
    aliases: ["converse", "chuck", "all star", "one star", "匡威"],
  },
  {
    id: "north_face",
    label: "The North Face",
    aliases: ["the north face", "the n*orth face", "the no*rth face", "the north fac*", "north face", "north fac*", "北面", "乐斯菲斯"],
  },
  {
    id: "norda",
    label: "Norda",
    aliases: ["norda", "诺达"],
  },
  {
    id: "supreme",
    label: "Supreme",
    keywords: ["supreme", "suprem*", "suprem"],
  },
  {
    id: "louis_vuitton",
    label: "Louis Vuitton",
    aliases: ["louis vuitton", "loui* vuitto*", "loui* vui*to*", "loui vuitto", "loui vuito", "vuitton", "路易威登"],
    strictTokens: ["lv", "1v"],
    patterns: ["\\bl v\\b", "\\b1 v\\b"],
    contextualKeywords: [],
    contextKeywords: ["watch", "scarf", "bag", "wallet", "belt", "monogram", "louis", "vuitton", "手表", "围巾", "包", "钱包", "腰带"],
  },
  {
    id: "burberry",
    label: "Burberry",
    aliases: ["burberry", "bur*berry", "burbe*rry", "burberr*"],
    compactKeywords: ["burberr"],
  },
  {
    id: "tommy_hilfiger",
    label: "Tommy Hilfiger",
    keywords: ["tommy hilfiger", "tomm* hilfiger", "tomm hilfiger"],
  },
  {
    id: "arcteryx",
    label: "Arc'teryx",
    aliases: ["arcteryx", "arc'teryx", "arc'tery*", "arctery", "始祖鸟"],
    compactKeywords: ["arcteryx", "arctery"],
  },
  {
    id: "prada",
    label: "Prada",
    keywords: ["prada", "pra*da", "pr*da"],
    compactKeywords: ["prada"],
  },
  {
    id: "cartier",
    label: "Cartier",
    keywords: ["cartier", "cartie*", "car*tier"],
  },
  {
    id: "canada_goose",
    label: "Canada Goose",
    keywords: ["canada goose", "canad* goos*", "canad goos"],
  },
  {
    id: "casablanca",
    label: "Casablanca",
    keywords: ["casablanca", "casablanc*"],
  },
  {
    id: "palm_angels",
    label: "Palm Angels",
    aliases: ["palm angels", "palm angel*", "palm ang*els", "paim angeis"],
  },
  {
    id: "bape",
    label: "BAPE / A Bathing Ape",
    keywords: ["bape", "a bathing ape"],
    tokenKeywords: ["ape"],
  },
  {
    id: "rhude",
    label: "Rhude",
    aliases: ["rhude", "rhu*de"],
  },
  {
    id: "celine",
    label: "Celine",
    keywords: ["celine", "cel1ne", "celin*"],
  },
  {
    id: "maison_margiela",
    label: "Maison Margiela",
    keywords: ["maison margiela", "maiso* margiel*", "margiela"],
  },
  {
    id: "stussy",
    label: "Stussy",
    aliases: ["stussy", "stüssy", "stuss*", "s1ussy"],
  },
  {
    id: "human_made",
    label: "Human Made",
    keywords: ["human made", "hum@de", "humade"],
    compactKeywords: ["humade"],
  },
  {
    id: "dolce_gabbana",
    label: "Dolce & Gabbana",
    keywords: ["dolce gabbana", "d&g", "d*g"],
  },
  {
    id: "boss",
    label: "Boss",
    keywords: ["boss", "b*ss"],
  },
  {
    id: "hellstar",
    label: "Hellstar",
    keywords: ["hellstar", "hellsta*r", "he*lsta*", "h-star"],
  },
  {
    id: "sp5der",
    label: "Sp5der",
    keywords: ["sp5der", "sp5de*"],
  },
  {
    id: "off_white",
    label: "Off-White",
    keywords: ["off white", "off-white", "o white"],
    tokenKeywords: ["ow"],
    regexKeywords: ["\\bo w\\b", "\\bo f\\b"],
  },
  {
    id: "longchamp",
    label: "Longchamp",
    keywords: ["longchamp"],
  },
  {
    id: "stone_island",
    label: "Stone Island",
    aliases: ["stone island", "stone#island", "stone isla*nd"],
    strictTokens: ["stx"],
  },
  {
    id: "loro_piana",
    label: "Loro Piana",
    keywords: ["loro piana", "loro pi*ana"],
  },
  {
    id: "vivienne_westwood",
    label: "Vivienne Westwood",
    keywords: ["vivienne westwood", "vivie*nne west*wood"],
  },
  {
    id: "gallery_dept",
    label: "Gallery Dept",
    keywords: ["gallery dept", "galler*y dept"],
  },
  {
    id: "balmain",
    label: "Balmain",
    keywords: ["balmain", "balma*in"],
  },
  {
    id: "chrome_hearts",
    label: "Chrome Hearts",
    keywords: ["chrome hearts", "chrome*hearts"],
  },
  {
    id: "rolex",
    label: "Rolex",
    keywords: ["rolex", "role*x"],
  },
  {
    id: "goyard",
    label: "Goyard",
    keywords: ["goyard", "goya*rd"],
  },
  {
    id: "loewe",
    label: "Loewe",
    aliases: ["loewe", "loe*we", "罗意威"],
  },
  {
    id: "puma",
    label: "Puma",
    aliases: ["puma", "彪马"],
    contextualKeywords: ["speedcat"],
    contextKeywords: ["puma", "彪马", "shoe", "shoes", "sneaker", "sneakers"],
  },
  {
    id: "vans",
    label: "Vans",
    aliases: ["vans", "old skool", "knu skool"],
  },
  {
    id: "ecco",
    label: "Ecco",
    aliases: ["ecco", "ecco/", "爱步", "biom"],
  },
  {
    id: "timberland",
    label: "Timberland",
    aliases: ["timberland", "天伯伦", "添柏岚"],
  },
  {
    id: "altra",
    label: "Altra",
    aliases: ["altra", "olympus", "lone peak"],
  },
  {
    id: "kailas",
    label: "Kailas",
    aliases: ["kailas", "凯乐石", "fuga"],
  },
  {
    id: "salomon",
    label: "Salomon",
    aliases: ["salomon", "xt-6", "xt quest", "xa pro"],
  },
  {
    id: "lacoste",
    label: "Lacoste",
    aliases: ["lacoste", "lacost*"],
  },
  {
    id: "amiri",
    label: "Amiri",
    aliases: ["amiri", "amir*"],
  },
  {
    id: "lululemon",
    label: "Lululemon",
    aliases: ["lululemon", "lululemo*"],
  },
  {
    id: "alo_yoga",
    label: "Alo Yoga",
    aliases: ["alo yoga"],
    strictTokens: ["alo"],
  },
  {
    id: "valentino",
    label: "Valentino",
    aliases: ["valentino", "vα11tin0", "vl7n"],
  },
  {
    id: "mihara_yasuhiro",
    label: "Mihara Yasuhiro",
    aliases: ["mihara yasuhiro", "maison miharayasuhiro"],
    strictTokens: ["mmy"],
  },
  {
    id: "raf_simons",
    label: "Raf Simons",
    aliases: ["raf simons"],
  },
  {
    id: "zegna",
    label: "Zegna",
    aliases: ["zegna"],
  },
  {
    id: "cat",
    label: "CAT",
    aliases: ["cat/", "caterpillar", "卡特"],
  },
  {
    id: "cdg",
    label: "CDG / Comme des Garcons",
    aliases: ["comme des garcons", "comme des garçons"],
    strictTokens: ["cdg"],
  },
  {
    id: "undefeated",
    label: "Undefeated",
    aliases: ["undefeated"],
  },
  {
    id: "kith",
    label: "Kith",
    aliases: ["kith"],
  },
  {
    id: "jacquemus",
    label: "Jacquemus",
    aliases: ["jacquemus"],
  },
  {
    id: "nocta",
    label: "Nocta",
    aliases: ["nocta"],
  },
];

export const BRAND_BY_ID = Object.fromEntries(BRAND_MAP.map((brand) => [brand.id, brand]));

export function detectBrands(title) {
  const haystack = normalizeSearchText(title);
  const tokenText = normalizeTokenText(title);
  const compactText = normalizeCompactText(title);
  if (!haystack || !tokenText) return [];

  const tokens = tokenize(tokenText);
  const matches = BRAND_MAP.map((brand) => ({ brand, ...scoreBrand(brand, { haystack, tokenText, compactText, tokens }) }))
    .filter((match) => match.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (b.longestKeyword.length !== a.longestKeyword.length) return b.longestKeyword.length - a.longestKeyword.length;
      return 0;
    });

  return uniqueLabels(matches.map((match) => match.brand.label));
}

export function normalizeBrandLabel(value) {
  const normalized = normalizeSearchText(value);
  if (!normalized) return "";

  for (const brand of BRAND_MAP) {
    if (normalizeSearchText(brand.label) === normalized || brand.id === normalized.replace(/[^a-z0-9]+/g, "_")) {
      return brand.label;
    }
  }

  return String(value || "").replace(/\s+/g, " ").trim();
}

function scoreBrand(brand, context) {
  let score = 0;
  let longestKeyword = "";

  for (const keyword of brandKeywords(brand)) {
    const normalizedKeyword = matchKeyword(context, keyword);
    if (!normalizedKeyword) continue;
    score += DEFAULT_WEIGHT;
    if (normalizedKeyword.length > longestKeyword.length) longestKeyword = normalizedKeyword;
  }

  for (const keyword of brandStrictTokens(brand)) {
    const normalizedKeyword = normalizeTokenText(keyword);
    if (!normalizedKeyword || !context.tokens.has(normalizedKeyword)) continue;
    score += DEFAULT_WEIGHT;
    if (normalizedKeyword.length > longestKeyword.length) longestKeyword = normalizedKeyword;
  }

  for (const keyword of brand.compactKeywords || []) {
    const normalizedKeyword = normalizeCompactText(keyword);
    if (!normalizedKeyword || !context.compactText.includes(normalizedKeyword)) continue;
    score += DEFAULT_WEIGHT;
    if (normalizedKeyword.length > longestKeyword.length) longestKeyword = normalizedKeyword;
  }

  for (const pattern of brandPatterns(brand)) {
    const normalizedKeyword = matchRegexKeyword(context, pattern);
    if (!normalizedKeyword) continue;
    score += DEFAULT_WEIGHT;
    if (normalizedKeyword.length > longestKeyword.length) longestKeyword = normalizedKeyword;
  }

  for (const keyword of brand.contextualKeywords || []) {
    const normalizedKeyword = matchKeyword(context, keyword);
    if (!normalizedKeyword) continue;
    if (!hasContext(context, brand.contextKeywords || [])) continue;
    score += CONTEXT_WEIGHT;
    if (normalizedKeyword.length > longestKeyword.length) longestKeyword = normalizedKeyword;
  }

  return { score, longestKeyword };
}

function matchKeyword(context, keyword) {
  const normalizedKeyword = normalizeTokenText(keyword);
  if (!normalizedKeyword) return "";
  if (matchesKeyword(context, keyword)) return normalizedKeyword;
  return "";
}

function brandKeywords(brand) {
  return [...(brand.keywords || []), ...(brand.aliases || [])];
}

function brandStrictTokens(brand) {
  return [...(brand.tokenKeywords || []), ...(brand.strictTokens || [])];
}

function brandPatterns(brand) {
  return [...(brand.regexKeywords || []), ...(brand.patterns || [])];
}

function matchRegexKeyword(context, pattern) {
  if (!pattern) return "";
  try {
    const match = context.tokenText.match(new RegExp(pattern, "u"));
    return match ? match[0] : "";
  } catch (error) {
    console.warn("[Brand mapping] Hibás regex alias", pattern, error);
    return "";
  }
}

function matchesKeyword(context, keyword) {
  const normalizedKeyword = normalizeTokenText(keyword);
  if (!normalizedKeyword) return false;
  if (containsCjk(keyword)) return context.haystack.includes(normalizeSearchText(keyword));
  if (normalizedKeyword.includes(" ")) return hasTokenSequence(context.tokenText, normalizedKeyword);
  return context.tokens.has(normalizedKeyword);
}

function hasTokenSequence(tokenText, normalizedKeyword) {
  return ` ${tokenText} `.includes(` ${normalizedKeyword} `);
}

function hasContext(context, contextKeywords) {
  return (contextKeywords || []).some((keyword) => matchesKeyword(context, keyword));
}

function normalizeTokenText(value) {
  return normalizeSearchText(value)
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeCompactText(value) {
  return normalizeSearchText(value).replace(/[^a-z0-9\u4e00-\u9fff]+/g, "");
}

function tokenize(value) {
  return new Set(normalizeTokenText(value).split(" ").filter(Boolean));
}

function containsCjk(value) {
  return /[\u4e00-\u9fff]/.test(String(value || ""));
}

function uniqueLabels(values) {
  const labels = [];
  const seen = new Set();

  for (const value of values || []) {
    const label = normalizeBrandLabel(value);
    const key = normalizeSearchText(label);
    if (!label || seen.has(key)) continue;
    seen.add(key);
    labels.push(label);
  }

  return labels;
}
