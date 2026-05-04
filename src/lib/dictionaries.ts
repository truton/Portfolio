import type { Locale } from "@/types/i18n";

import en from "@/dictionaries/en.json";
import ru from "@/dictionaries/ru.json";
import de from "@/dictionaries/de.json";
import fr from "@/dictionaries/fr.json";
import es from "@/dictionaries/es.json";
import ar from "@/dictionaries/ar.json";
import pl from "@/dictionaries/pl.json";
import pt from "@/dictionaries/pt.json";
import ua from "@/dictionaries/ua.json";

/** Type derived from the English dictionary structure (source of truth). */
export type Dictionary = typeof en;

/** Map of all available dictionaries keyed by locale code. */
const dictionaries: Record<Locale, Dictionary> = {
  en,
  ru,
  de,
  fr,
  es,
  ar,
  pl,
  pt,
  ua,
};

/**
 * Returns the dictionary for a given locale.
 * Falls back to English if the locale is not found.
 */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}
