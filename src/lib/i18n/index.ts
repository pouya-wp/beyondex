import { en, type Dictionary } from "./dictionaries/en";
import { fa } from "./dictionaries/fa";
import type { Locale } from "./config";

const dictionaries: Record<Locale, Dictionary> = { en, fa };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.fa;
}

export type { Dictionary };
export * from "./config";
