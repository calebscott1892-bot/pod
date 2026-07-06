/**
 * Product catalogue for Spare Space Studios — the real product model from
 * Paul (Jul 2026): one base build plus individually-priced options, with
 * named presets that pre-fill the configurator.
 *
 * ⚠️ PRICING PENDING CONFIRMATION. Paul's two documents disagree on a few
 * items (windows, black single door, black wall-light). These numbers come
 * from the "Product & Pricing" sheet; confirm with Paul before go-live.
 * Change a price here and every card, summary and order line follows.
 */

export const BASE_PRICE = 21900;

export type Option = {
  id: string;
  name: string;
  detail?: string;
  price: number;
  /** Colour swatch for trim/wall/door groups. */
  swatch?: string;
  /** Structural hint for the preview (roof shape / door type). */
  kind?: string;
};

export type GroupId =
  | "roof"
  | "door"
  | "hardware"
  | "window"
  | "trim"
  | "wall"
  | "electrics"
  | "wallLight"
  | "hookup"
  | "balcony"
  | "gardenShed";

export type OptionGroup = {
  id: GroupId;
  name: string;
  detail?: string;
  /** Group the options into labelled bands (e.g. door types) in the UI. */
  bandBy?: "kind";
  layout: "cards" | "swatches";
  options: Option[];
};

const swatches = {
  white: "#eee9dd",
  vividWhite: "#f3f0e9",
  black: "#2c2c2c",
  pink: "#d3a99b",
  blue: "#7f9aa6",
  green: "#8b997c",
  timberGrey: "#9c968c",
  jarrah: "#7a4636",
  charcoal: "#3b3b3b",
  merbau: "#8c5a3c",
};

export const optionGroups: OptionGroup[] = [
  {
    id: "roof",
    name: "Roof",
    detail: "A style to match your own — an A-frame or a skillion angle.",
    layout: "cards",
    options: [
      { id: "a-frame", name: "A-Frame", detail: "Classic gable", price: 0, kind: "a-frame" },
      { id: "skillion-right", name: "Skillion — right high", detail: "Angled, high on the right", price: 0, kind: "skillion-right" },
      { id: "skillion-left", name: "Skillion — left high", detail: "Angled, high on the left", price: 0, kind: "skillion-left" },
    ],
  },
  {
    id: "door",
    name: "Doors",
    detail: "Traditional single, sliding or French doors to suit your home.",
    bandBy: "kind",
    layout: "cards",
    options: [
      { id: "slider-white", name: "Sliding — white", detail: "1510 × 2100", price: 0, swatch: swatches.white, kind: "Sliding door" },
      { id: "slider-black", name: "Sliding — black", detail: "1510 × 2100", price: 445, swatch: swatches.black, kind: "Sliding door" },
      { id: "single-vivid-white", name: "Single — Vivid White", detail: "820 × 2040", price: 2595, swatch: swatches.vividWhite, kind: "Single door" },
      { id: "single-satin-black", name: "Single — Satin Black", detail: "820 × 2040", price: 2695, swatch: swatches.black, kind: "Single door" },
      { id: "single-pink-sand", name: "Single — Pink Sand", detail: "820 × 2040", price: 2795, swatch: swatches.pink, kind: "Single door" },
      { id: "single-blue", name: "Single — Blue New Life", detail: "820 × 2040", price: 2795, swatch: swatches.blue, kind: "Single door" },
      { id: "single-green", name: "Single — Wedgewood Green", detail: "820 × 2040", price: 2795, swatch: swatches.green, kind: "Single door" },
      { id: "french-vivid-white", name: "French — Vivid White", detail: "2 × 720 × 2040", price: 3995, swatch: swatches.vividWhite, kind: "French doors" },
      { id: "french-satin-black", name: "French — Satin Black", detail: "2 × 720 × 2040", price: 4095, swatch: swatches.black, kind: "French doors" },
      { id: "french-pink-sand", name: "French — Pink Sand", detail: "2 × 720 × 2040", price: 4195, swatch: swatches.pink, kind: "French doors" },
      { id: "french-blue", name: "French — Blue New Life", detail: "2 × 720 × 2040", price: 4195, swatch: swatches.blue, kind: "French doors" },
      { id: "french-green", name: "French — Wedgewood Green", detail: "2 × 720 × 2040", price: 4195, swatch: swatches.green, kind: "French doors" },
    ],
  },
  {
    id: "hardware",
    name: "Door hardware",
    detail: "Finish for handles and fittings.",
    layout: "cards",
    options: [
      { id: "matt-black", name: "Matt Black", price: 0 },
      { id: "brushed-chrome", name: "Brushed Chrome", price: 0 },
    ],
  },
  {
    id: "window",
    name: "Windows",
    detail: "Push-out windows with a built-in blind and fly-screen.",
    layout: "cards",
    options: [
      { id: "none", name: "No window", price: 0 },
      { id: "small", name: "Small window", detail: "450 × 500", price: 385 },
      { id: "large", name: "Large window", detail: "450 × 1100", price: 645 },
    ],
  },
  {
    id: "trim",
    name: "Trim colour",
    layout: "swatches",
    options: [
      { id: "white", name: "White / Surfmist", price: 0, swatch: swatches.white },
      { id: "black", name: "Satin Black", price: 495, swatch: swatches.black },
      { id: "pink", name: "Pink Sand", price: 595, swatch: swatches.pink },
      { id: "blue", name: "Blue New Life", price: 595, swatch: swatches.blue },
      { id: "green", name: "Wedgewood Green", price: 595, swatch: swatches.green },
    ],
  },
  {
    id: "wall",
    name: "Front wall colour",
    detail: "The colour of the front wall.",
    layout: "swatches",
    options: [
      { id: "white", name: "White", price: 0, swatch: swatches.vividWhite },
      { id: "black", name: "All Black", price: 295, swatch: swatches.black },
      { id: "pink", name: "Pink Sand", price: 395, swatch: swatches.pink },
      { id: "blue", name: "Blue New Life", price: 395, swatch: swatches.blue },
      { id: "green", name: "Wedgewood Green", price: 395, swatch: swatches.green },
    ],
  },
  {
    id: "electrics",
    name: "Electrics",
    detail: "Lights, GPOs, switch, meter box and external inlet.",
    layout: "cards",
    options: [
      { id: "white", name: "White fittings", price: 0 },
      { id: "black", name: "Matt Black pack", price: 495 },
    ],
  },
  {
    id: "wallLight",
    name: "Wall-light upgrade",
    detail: "Traditional and contemporary outdoor wall lights.",
    layout: "cards",
    options: [
      { id: "standard", name: "Standard", price: 0 },
      { id: "white", name: "Upgrade — White", price: 95 },
      { id: "black", name: "Upgrade — Matt Black", price: 145 },
    ],
  },
  {
    id: "hookup",
    name: "Electrical hookup side",
    layout: "cards",
    options: [
      { id: "left", name: "Left", price: 0 },
      { id: "right", name: "Right", price: 0 },
    ],
  },
  {
    id: "balcony",
    name: "Balcony",
    detail: "1200L × 3000W timber balcony (optional).",
    layout: "cards",
    options: [
      { id: "none", name: "No balcony", price: 0 },
      { id: "antique-grey", name: "Antique Grey", price: 4950, swatch: swatches.timberGrey },
      { id: "helena-jarrah", name: "Helena River Jarrah", price: 4950, swatch: swatches.jarrah },
      { id: "charcoal-deluxe", name: "Charcoal Deluxe", price: 4950, swatch: swatches.charcoal },
      { id: "nq-merbau", name: "North QLD Merbau", price: 4950, swatch: swatches.merbau },
    ],
  },
  {
    id: "gardenShed",
    name: "Garden shed / basement storage",
    detail: "2200 × 1200 × 2000H add-on (optional).",
    layout: "cards",
    options: [
      { id: "none", name: "No shed", price: 0 },
      { id: "surfmist", name: "Surfmist", price: 4795, swatch: swatches.white },
      { id: "satin-black", name: "Satin Black", price: 4895, swatch: swatches.black },
      { id: "pink-sand", name: "Pink Sand", price: 4995, swatch: swatches.pink },
      { id: "blue", name: "Blue New Life", price: 4995, swatch: swatches.blue },
      { id: "green", name: "Wedgewood Green", price: 4995, swatch: swatches.green },
    ],
  },
];

export type StudioConfig = Record<GroupId, string>;

export const defaultConfig: StudioConfig = Object.fromEntries(
  optionGroups.map((group) => [group.id, group.options[0].id]),
) as StudioConfig;

export type ResolvedConfig = Record<GroupId, Option>;

export function resolveConfig(config: StudioConfig): ResolvedConfig | null {
  const resolved = {} as ResolvedConfig;
  for (const group of optionGroups) {
    const option = group.options.find((o) => o.id === config[group.id]);
    if (!option) return null;
    resolved[group.id] = option;
  }
  return resolved;
}

export function configTotal(config: StudioConfig): number {
  const resolved = resolveConfig(config);
  if (!resolved) return BASE_PRICE;
  return optionGroups.reduce(
    (sum, group) => sum + resolved[group.id].price,
    BASE_PRICE,
  );
}

/** A named starting point that pre-fills the configurator. */
export type Preset = {
  id: string;
  name: string;
  line: string;
  icon:
    | "gym"
    | "office"
    | "creative"
    | "craft"
    | "wellness"
    | "cabana"
    | "business"
    | "games"
    | "her"
    | "him";
  config: Partial<StudioConfig>;
};

export const presets: Preset[] = [
  {
    id: "games",
    name: "Games Studio",
    line: "Games, playroom, teen retreat.",
    icon: "games",
    config: { roof: "a-frame", door: "single-blue", hardware: "brushed-chrome", trim: "pink", window: "large", wall: "white" },
  },
  {
    id: "gym",
    name: "Gym Studio",
    line: "Train harder at home.",
    icon: "gym",
    config: { roof: "a-frame", door: "french-satin-black", hardware: "matt-black", trim: "black", window: "large", electrics: "black" },
  },
  {
    id: "office",
    name: "Home Office",
    line: "Office, hairdresser, consulting.",
    icon: "office",
    config: { roof: "a-frame", door: "slider-black", trim: "black", window: "large", electrics: "black" },
  },
  {
    id: "wellness",
    name: "Wellness Studio",
    line: "Massage, make-up, yoga.",
    icon: "wellness",
    config: { roof: "a-frame", door: "french-satin-black", hardware: "matt-black", wallLight: "white" },
  },
  {
    id: "she-space",
    name: "She Space Studio",
    line: "Her space to create and unwind.",
    icon: "her",
    config: { roof: "skillion-left", door: "french-pink-sand", hardware: "brushed-chrome", trim: "pink", window: "small", wallLight: "white" },
  },
  {
    id: "craft",
    name: "Craft Studio",
    line: "Art, sewing, reading.",
    icon: "craft",
    config: { roof: "skillion-right", door: "single-blue", hardware: "brushed-chrome", trim: "pink" },
  },
  {
    id: "creative",
    name: "Creative Studio",
    line: "Music, art, content, relax.",
    icon: "creative",
    config: { roof: "a-frame", door: "french-blue", hardware: "brushed-chrome", trim: "blue", window: "large", wallLight: "white" },
  },
  {
    id: "he-space",
    name: "He Space Studio",
    line: "His space — workshop or studio.",
    icon: "him",
    config: { roof: "skillion-right", door: "single-satin-black", hardware: "matt-black", trim: "black", wall: "black", window: "small", electrics: "black" },
  },
  {
    id: "cabana",
    name: "Pool Cabana Studio",
    line: "Cabana, cocktail bar, entertaining.",
    icon: "cabana",
    config: { roof: "a-frame", door: "french-blue", hardware: "matt-black", trim: "blue", window: "large", electrics: "black", wallLight: "black" },
  },
  {
    id: "home-business",
    name: "Home Business",
    line: "E-commerce, freelancing, print-on-demand.",
    icon: "business",
    config: { roof: "skillion-right", wall: "black", window: "small" },
  },
  {
    id: "smb",
    name: "Small / Medium Business",
    line: "Warehouse office, retail, site office.",
    icon: "business",
    config: { roof: "a-frame" },
  },
  {
    id: "investment",
    name: "Investment",
    line: "Landlord investment, consulting, healthcare.",
    icon: "business",
    config: { roof: "skillion-right", window: "small" },
  },
];

export function presetConfig(preset: Preset): StudioConfig {
  return { ...defaultConfig, ...preset.config };
}

const audFormatter = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  maximumFractionDigits: 0,
});

export function formatAud(amount: number): string {
  return audFormatter.format(amount);
}

/** Human-readable one-line description of a build (for order requests). */
export function describeConfig(config: StudioConfig): string {
  const resolved = resolveConfig(config);
  if (!resolved) return "";
  const parts = [
    `Roof: ${resolved.roof.name}`,
    `Door: ${resolved.door.name} (${resolved.hardware.name})`,
    `Window: ${resolved.window.name}`,
    `Trim: ${resolved.trim.name}`,
    `Wall: ${resolved.wall.name}`,
    `Electrics: ${resolved.electrics.name}`,
    `Wall light: ${resolved.wallLight.name}`,
    `Hookup: ${resolved.hookup.name}`,
  ];
  if (resolved.balcony.id !== "none") parts.push(`Balcony: ${resolved.balcony.name}`);
  if (resolved.gardenShed.id !== "none") parts.push(`Garden shed: ${resolved.gardenShed.name}`);
  return parts.join(" · ");
}
