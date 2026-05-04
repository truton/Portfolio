/**
 * Supported locale codes for the portfolio.
 * - 'en': English (default)
 * - 'ru': Russian
 * - 'de': German
 * - 'fr': French
 * - 'es': Spanish
 * - 'ar': Arabic
 * - 'pl': Polish
 * - 'pt': Portuguese
 * - 'ua': Ukrainian
 */
export type Locale = "en" | "ru" | "de" | "fr" | "es" | "ar" | "pl" | "pt" | "ua";

/** All available locales for iteration / validation. */
export const locales: Locale[] = ["en", "ru", "de", "fr", "es", "ar", "pl", "pt", "ua"];

/** The default locale used when none is specified. */
export const defaultLocale: Locale = "en";
