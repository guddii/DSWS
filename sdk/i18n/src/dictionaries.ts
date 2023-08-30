// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
export const dictionaries = {
  en: () => import("./dictionaries/en").then((module) => module.default),
  de: () => import("./dictionaries/de").then((module) => module.default),
};
