/**
 * Supported locale codes for the portfolio.
 * - 'en': English (default)
 * - 'uk': Ukrainian
 */
export type Locale = "en" | "uk";

/** All available locales for iteration / validation. */
export const locales: Locale[] = ["en", "uk"];

/** The default locale used when none is specified. */
export const defaultLocale: Locale = "en";
