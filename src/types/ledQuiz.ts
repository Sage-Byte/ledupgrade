export type BillRangeOption = "Under $150" | "$150–$250" | "$250–$400" | "$400–$600" | "$600+" | "";

export type LightingTypeOption = "Traditional incandescent" | "CFL bulbs" | "Some LED" | "Mostly LED" | "All LED" | "";

export type UpgradeAreaOption = "Living room" | "Kitchen" | "Bedrooms" | "Bathrooms" | "Outdoor/landscape" | "Garage/basement" | "Whole house" | "Commercial space";

export type HomeSizeOption = "<1500" | "1500-2500" | "2500-4000" | "4000+" | "";

export interface LEDQuizAnswers {
  billRange: BillRangeOption;
  currentLighting: LightingTypeOption;
  upgradeAreas: UpgradeAreaOption[];
  homeSize: HomeSizeOption;
  sqFtDetail?: string;
  currentPhoto?: string; // base64 or url
  zip?: string;
  timeline?: "ASAP" | "1-2 months" | "Exploring options" | "";
}

export type Tier = 1 | 2 | 3;

export interface LeadInfo {
  name: string;
  email: string;
  phone: string;
  zip?: string;
  consent: boolean;
}