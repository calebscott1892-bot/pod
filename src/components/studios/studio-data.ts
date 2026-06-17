/**
 * Product catalogue for Spare Space Studios.
 * All prices are placeholders in whole AUD — Paul to confirm; update here
 * and every card, summary and Stripe line item follows.
 */

export type StudioStyle = {
  id: string;
  name: string;
  line: string;
  basePrice: number;
  gradient: string;
  icon: "gym" | "office" | "creative" | "craft" | "wellness" | "cabana" | "business";
  /** Signature finish shown on the card and pre-selected on "Customise & buy". */
  signature: { windowId: string; doorId: string; claddingId: string };
};

export const studioStyles: StudioStyle[] = [
  {
    id: "gym",
    name: "The Gym Studio",
    line: "Train harder at home.",
    basePrice: 18500,
    gradient: "linear-gradient(150deg, #f8e7da 8%, #eec3a8 56%, #e2a583 100%)",
    icon: "gym",
    signature: { windowId: "feature", doorId: "sliding", claddingId: "charcoal" },
  },
  {
    id: "office",
    name: "The Home Office",
    line: "Your best work, done here.",
    basePrice: 17500,
    gradient: "linear-gradient(155deg, #f9eee2 6%, #ecd2b8 55%, #d9b894 100%)",
    icon: "office",
    signature: { windowId: "standard", doorId: "french", claddingId: "warm-white" },
  },
  {
    id: "creative",
    name: "Creative Studio",
    line: "Make, record, create.",
    basePrice: 18000,
    gradient: "linear-gradient(145deg, #fae9e0 8%, #f2c9b6 54%, #e6a98e 100%)",
    icon: "creative",
    signature: { windowId: "feature", doorId: "sliding", claddingId: "coastal" },
  },
  {
    id: "craft",
    name: "Craft Studio",
    line: "Every tool in its place.",
    basePrice: 17000,
    gradient: "linear-gradient(150deg, #f7eadf 6%, #e9cdb4 55%, #d8af90 100%)",
    icon: "craft",
    signature: { windowId: "standard", doorId: "barn", claddingId: "cream" },
  },
  {
    id: "wellness",
    name: "Wellness Retreat",
    line: "Restore. Breathe. Reset.",
    basePrice: 19500,
    gradient: "linear-gradient(155deg, #fbeee6 8%, #f3d3c0 52%, #e8b29a 100%)",
    icon: "wellness",
    signature: { windowId: "feature", doorId: "french", claddingId: "sage" },
  },
  {
    id: "cabana",
    name: "Pool Cabana",
    line: "Entertaining, elevated.",
    basePrice: 19000,
    gradient: "linear-gradient(150deg, #f7e9da 6%, #eccdb0 55%, #dfae8c 100%)",
    icon: "cabana",
    signature: { windowId: "feature", doorId: "sliding", claddingId: "coastal" },
  },
  {
    id: "business",
    name: "Home Business",
    line: "Professional. Private. Yours.",
    basePrice: 17500,
    gradient: "linear-gradient(160deg, #f6ecdf 6%, #e7d0ba 55%, #d3b394 100%)",
    icon: "business",
    signature: { windowId: "standard", doorId: "french", claddingId: "charcoal" },
  },
];

export type ComponentOption = {
  id: string;
  name: string;
  detail: string;
  price: number;
};

export const windowOptions: ComponentOption[] = [
  {
    id: "standard",
    name: "Standard windows",
    detail: "Double-hung, white frame",
    price: 0,
  },
  {
    id: "feature",
    name: "Feature window",
    detail: "Large picture window, black frame",
    price: 800,
  },
];

export const doorOptions: ComponentOption[] = [
  {
    id: "sliding",
    name: "Sliding glass door",
    detail: "Smooth glide, full-height glass",
    price: 0,
  },
  {
    id: "french",
    name: "French doors",
    detail: "Double doors, classic profile",
    price: 600,
  },
  {
    id: "barn",
    name: "Barn-style door",
    detail: "Statement slider on a track",
    price: 400,
  },
];

export type CladdingOption = ComponentOption & { swatch: string };

export const claddingOptions: CladdingOption[] = [
  { id: "cream", name: "Cream", detail: "Standard", price: 0, swatch: "#f0e3db" },
  { id: "sage", name: "Sage Green", detail: "Standard", price: 0, swatch: "#8faf8a" },
  { id: "charcoal", name: "Charcoal", detail: "Standard", price: 0, swatch: "#4a4a4a" },
  { id: "coastal", name: "Coastal Blue", detail: "Standard", price: 0, swatch: "#7eb4c4" },
  { id: "warm-white", name: "Warm White", detail: "Standard", price: 0, swatch: "#f5f0ea" },
];

export type StudioConfig = {
  styleId: string;
  windowId: string;
  doorId: string;
  claddingId: string;
};

export const defaultConfig: StudioConfig = {
  styleId: studioStyles[0].id,
  windowId: windowOptions[0].id,
  doorId: doorOptions[0].id,
  claddingId: claddingOptions[0].id,
};

export function resolveConfig(config: StudioConfig) {
  const style = studioStyles.find((item) => item.id === config.styleId);
  const windows = windowOptions.find((item) => item.id === config.windowId);
  const doors = doorOptions.find((item) => item.id === config.doorId);
  const cladding = claddingOptions.find((item) => item.id === config.claddingId);
  if (!style || !windows || !doors || !cladding) return null;
  return { style, windows, doors, cladding };
}

export function configTotal(config: StudioConfig): number {
  const resolved = resolveConfig(config);
  if (!resolved) return 0;
  return (
    resolved.style.basePrice +
    resolved.windows.price +
    resolved.doors.price +
    resolved.cladding.price
  );
}

const audFormatter = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  maximumFractionDigits: 0,
});

export function formatAud(amount: number): string {
  return audFormatter.format(amount);
}
