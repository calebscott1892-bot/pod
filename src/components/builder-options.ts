export type ShedStyle = "studio-shed" | "garden-pod" | "utility-shed";
export type ShedShape = "classic" | "corner" | "glass-front";
export type ShedColour =
  | "sage"
  | "blush"
  | "cream"
  | "mist-blue"
  | "charcoal-trim";
export type ShedUpgrade =
  | "sliding-glass-doors"
  | "extra-window"
  | "interior-lining"
  | "storage-wall"
  | "power-provision"
  | "deck-step"
  | "skylight"
  | "air-conditioning-provision";

export type ShedConcept = {
  style: ShedStyle;
  shape: ShedShape;
  colour: ShedColour;
  upgrades: ShedUpgrade[];
};

export type BuilderOption<T extends string> = {
  id: T;
  label: string;
  description: string;
};

export const styleOptions: BuilderOption<ShedStyle>[] = [
  {
    id: "studio-shed",
    label: "Studio Shed",
    description: "A calm base for work, beauty, creative projects or focus.",
  },
  {
    id: "garden-pod",
    label: "Garden Pod",
    description: "A softer room for garden outlook, clients or quiet time.",
  },
  {
    id: "utility-shed",
    label: "Utility Shed",
    description: "Practical storage and overflow with a more considered finish.",
  },
];

export const shapeOptions: BuilderOption<ShedShape>[] = [
  {
    id: "classic",
    label: "Classic",
    description: "A clean front-facing shape for a simple backyard placement.",
  },
  {
    id: "corner",
    label: "Corner",
    description: "An angled shape for side gardens, corners or tighter spaces.",
  },
  {
    id: "glass-front",
    label: "Glass-front",
    description: "A brighter frontage for outlook, light and studio-style use.",
  },
];

export const colourOptions: (BuilderOption<ShedColour> & {
  swatch: string;
})[] = [
  {
    id: "sage",
    label: "Sage",
    description: "Soft green",
    swatch: "#b8c7a3",
  },
  {
    id: "blush",
    label: "Blush",
    description: "Muted pink",
    swatch: "#edc3c0",
  },
  {
    id: "cream",
    label: "Cream",
    description: "Warm off-white",
    swatch: "#fffaf2",
  },
  {
    id: "mist-blue",
    label: "Mist Blue",
    description: "Pale blue-grey",
    swatch: "#cbdce0",
  },
  {
    id: "charcoal-trim",
    label: "Charcoal Trim",
    description: "Soft black trim",
    swatch: "#24231f",
  },
];

export const upgradeOptions: BuilderOption<ShedUpgrade>[] = [
  {
    id: "sliding-glass-doors",
    label: "Sliding glass doors",
    description: "Open the front to the garden.",
  },
  {
    id: "extra-window",
    label: "Extra window",
    description: "Bring in more natural light.",
  },
  {
    id: "interior-lining",
    label: "Interior lining",
    description: "A tidier internal finish for work or studio use.",
  },
  {
    id: "storage-wall",
    label: "Storage wall",
    description: "Add shelves or tall storage into the plan.",
  },
  {
    id: "power-provision",
    label: "Power provision",
    description: "Plan for lighting, charging or equipment.",
  },
  {
    id: "deck-step",
    label: "Deck step",
    description: "Create a softer entry from the garden.",
  },
  {
    id: "skylight",
    label: "Skylight",
    description: "Bring daylight in from above.",
  },
  {
    id: "air-conditioning-provision",
    label: "Air-conditioning provision",
    description: "Allow for comfort on warmer days.",
  },
];

export function optionLabel<T extends string>(
  options: BuilderOption<T>[],
  id: T,
) {
  return options.find((option) => option.id === id)?.label ?? id;
}

export function conceptLabels(concept: ShedConcept) {
  return {
    style: optionLabel(styleOptions, concept.style),
    shape: optionLabel(shapeOptions, concept.shape),
    colour: optionLabel(colourOptions, concept.colour),
    upgrades: concept.upgrades.map((upgrade) =>
      optionLabel(upgradeOptions, upgrade),
    ),
  };
}
