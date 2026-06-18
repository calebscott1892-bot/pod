export type LifestyleCategory = {
  id: string;
  name: string;
  line: string;
  shape: "shape-arch" | "shape-soft" | "shape-oblong";
  icon: "gym" | "office" | "creative" | "craft" | "wellness" | "cabana";
  /** Interior-vignette wall tint and soft accent (illustration placeholders
   *  until photography arrives). */
  wall: string;
  accent: string;
};

export const lifestyleCategories: LifestyleCategory[] = [
  {
    id: "home-gym",
    name: "Home Gym",
    line: "Train on your schedule, in your space.",
    shape: "shape-arch",
    icon: "gym",
    wall: "#f1ddce",
    accent: "var(--ss-eucalyptus)",
  },
  {
    id: "home-office",
    name: "Home Office",
    line: "Focus without the commute.",
    shape: "shape-soft",
    icon: "office",
    wall: "#efe6d5",
    accent: "var(--ss-olive)",
  },
  {
    id: "creative-studio",
    name: "Creative Studio",
    line: "A dedicated space to make things.",
    shape: "shape-arch",
    icon: "creative",
    wall: "#f5dcc8",
    accent: "var(--ss-blush)",
  },
  {
    id: "craft-hobby",
    name: "Craft & Hobby",
    line: "Room for every project.",
    shape: "shape-soft",
    icon: "craft",
    wall: "#efe1cd",
    accent: "var(--ss-clay)",
  },
  {
    id: "wellness-retreat",
    name: "Wellness Retreat",
    line: "Your sanctuary, steps away.",
    shape: "shape-arch",
    icon: "wellness",
    wall: "#e6ecdc",
    accent: "var(--ss-sage)",
  },
  {
    id: "pool-cabana",
    name: "Pool Cabana",
    line: "Extend your outdoor living.",
    shape: "shape-soft",
    icon: "cabana",
    wall: "#dde7ea",
    accent: "#7eb4c4",
  },
];
