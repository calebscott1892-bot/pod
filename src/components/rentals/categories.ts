export type LifestyleCategory = {
  id: string;
  name: string;
  line: string;
  /** CSS gradient used as the image placeholder until photography arrives. */
  gradient: string;
  shape: "shape-arch" | "shape-soft" | "shape-oblong";
  icon: "gym" | "office" | "creative" | "craft" | "wellness" | "cabana";
};

export const lifestyleCategories: LifestyleCategory[] = [
  {
    id: "home-gym",
    name: "Home Gym",
    line: "Train on your schedule, in your space.",
    gradient: "linear-gradient(150deg, #f7e6da 8%, #ecc9b2 60%, #e3b89e 100%)",
    shape: "shape-arch",
    icon: "gym",
  },
  {
    id: "home-office",
    name: "Home Office",
    line: "Focus without the commute.",
    gradient: "linear-gradient(160deg, #f8eee4 5%, #e9d3bf 58%, #d9bda5 100%)",
    shape: "shape-soft",
    icon: "office",
  },
  {
    id: "creative-studio",
    name: "Creative Studio",
    line: "A dedicated space to make things.",
    gradient: "linear-gradient(145deg, #f9ece1 10%, #f1cfb8 55%, #e7b394 100%)",
    shape: "shape-arch",
    icon: "creative",
  },
  {
    id: "craft-hobby",
    name: "Craft & Hobby",
    line: "Room for every project.",
    gradient: "linear-gradient(155deg, #f7e9dd 6%, #ead0c0 52%, #ddbaa6 100%)",
    shape: "shape-soft",
    icon: "craft",
  },
  {
    id: "wellness-retreat",
    name: "Wellness Retreat",
    line: "Your sanctuary, steps away.",
    gradient: "linear-gradient(150deg, #f9efe6 8%, #efd2bb 56%, #e2ae8d 100%)",
    shape: "shape-arch",
    icon: "wellness",
  },
  {
    id: "pool-cabana",
    name: "Pool Cabana",
    line: "Extend your outdoor living.",
    gradient: "linear-gradient(160deg, #f6e8dc 5%, #e9cdb9 50%, #ddb49c 100%)",
    shape: "shape-soft",
    icon: "cabana",
  },
];
