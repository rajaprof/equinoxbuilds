export type RegionCode = 'IN' | 'US' | 'EU' | 'UK' | 'GLOBAL';

export const REGION_MULTIPLIERS: Record<RegionCode, { currency: string, symbol: string, rate: number, pppMultiplier: number }> = {
  IN: { currency: 'INR', symbol: '₹', rate: 1, pppMultiplier: 1.0 },
  US: { currency: 'USD', symbol: '$', rate: 0.012, pppMultiplier: 2.5 },
  EU: { currency: 'EUR', symbol: '€', rate: 0.011, pppMultiplier: 2.0 },
  UK: { currency: 'GBP', symbol: '£', rate: 0.0095, pppMultiplier: 2.2 },
  GLOBAL: { currency: 'USD', symbol: '$', rate: 0.012, pppMultiplier: 1.5 }
};

export const SERVICES = [
  { id: 'web_app', title: 'Web Application', category: 'Dev', basePriceINR: 40000, iconName: 'monitor' },
  { id: 'vibe_coding', title: 'Vibe Coding', category: 'Dev', basePriceINR: 60000, iconName: 'sparkles', desc: 'Creative, AI-assisted rapid prototyping' },
  { id: 'ui_ux', title: 'UI / UX Design', category: 'Design', basePriceINR: 25000, iconName: 'layout-template' },
  { id: 'redesign', title: 'Website Redesign', category: 'Design', basePriceINR: 35000, iconName: 'refresh-ccw' },
  { id: 'human_centric', title: 'Human-Centric Works', category: 'Design', basePriceINR: 30000, iconName: 'users', desc: 'Accessibility & User Research' },
  { id: 'decision_making', title: 'Decision Making', category: 'Consulting', basePriceINR: 20000, iconName: 'git-merge', desc: 'Tech Strategy & Architecture' },
  { id: 'content_rewrite', title: 'Content Rewriting', category: 'Content', basePriceINR: 15000, iconName: 'pen-tool' },
];

export const SCOPE_MULTIPLIERS = {
  mvp: { title: 'Essential (MVP)', multiplier: 1.0 },
  standard: { title: 'Standard', multiplier: 1.5 },
  advanced: { title: 'Complex / Advanced', multiplier: 2.5 },
};

export const TIMELINE_MULTIPLIERS = {
  relaxed: { title: 'Relaxed (3+ Months)', multiplier: 0.85 },
  standard: { title: 'Standard (1-2 Months)', multiplier: 1.0 },
  rush: { title: 'Rush (ASAP)', multiplier: 1.5 },
};

export const COMMUNICATION_LANGUAGES = [
  'English', 'Hindi', 'Tamil', 'Telugu', 'Spanish', 'French', 'Other'
];

export function calculatePriceRange(
  serviceId: string,
  scopeId: keyof typeof SCOPE_MULTIPLIERS,
  timelineId: keyof typeof TIMELINE_MULTIPLIERS,
  region: RegionCode
) {
  const service = SERVICES.find(s => s.id === serviceId);
  if (!service) return { low: 0, high: 0, formattedString: '' };

  let price = service.basePriceINR;
  price = price * SCOPE_MULTIPLIERS[scopeId].multiplier;
  price = price * TIMELINE_MULTIPLIERS[timelineId].multiplier;

  const regionConfig = REGION_MULTIPLIERS[region];
  price = price * regionConfig.pppMultiplier;
  price = price * regionConfig.rate;

  const lowEnd = Math.round((price * 0.85) / 10) * 10;
  const highEnd = Math.round((price * 1.20) / 10) * 10;

  return {
    low: lowEnd,
    high: highEnd,
    currency: regionConfig.currency,
    symbol: regionConfig.symbol,
    formattedString: `${regionConfig.symbol}${lowEnd.toLocaleString()} - ${regionConfig.symbol}${highEnd.toLocaleString()} ${regionConfig.currency}`
  };
}
