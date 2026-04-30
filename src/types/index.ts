export interface CaseItem {
  id: string;
  title: string;
  client: string;
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
