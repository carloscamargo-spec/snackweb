export interface CaseItem {
  id: string;
  title: string;
  client: string;
  slug?: string;
}

export interface TruthCard {
  idx: string;
  stat: string;
  unit: string;
  desc: string;
  src: string;
}

export interface FrameworkItem {
  acr: string;
  name: string;
  desc: string;
  num: string;
}

export interface TweakValues {
  labelGap: number;
  displayWeight: number;
  displayTracking: number;
  displayLeading: number;
  brand: string;
  showMarquee: boolean;
  showHeroMeta: boolean;
}

export interface CaseVideo {
  id: string;
  name: string;
  uploadDate: string;
  durationSec: number;
}

export interface CaseResult {
  value: string;
  label: string;
}

export interface CaseStudy {
  slug: string;
  client: string;
  title: string;
  /** Lowercase display headline in the home's voice: [plain part, highlighted part]. */
  displayTitle: [string, string];
  shortTitle: string;
  market: string;
  years: string;
  category: string;
  summary: string;
  challenge: string;
  idea: string;
  execution: string[];
  results: CaseResult[];
  videos: CaseVideo[];
  awards?: string[];
}

export interface Market {
  slug: string;
  country: string;
  /** ISO 3166-1 alpha-2, used in schema.org areaServed. */
  countryCode: string;
  displayTitle: [string, string];
  summary: string;
  audience: string;
  regulation: string;
  approach: string[];
  caseSlugs: string[];
}
