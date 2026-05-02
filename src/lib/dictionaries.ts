import type { Locale } from "@/types/i18n";

import en from "@/dictionaries/en.json";
import uk from "@/dictionaries/uk.json";

/** Type derived from the English dictionary structure (source of truth). */
export type Dictionary = typeof en;

/** Map of all available dictionaries keyed by locale code. */
const dictionaries: Record<Locale, Dictionary> = {
  en,
  uk,
};

/**
 * Returns the dictionary for a given locale.
 * Falls back to English if the locale is not found.
 */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}
