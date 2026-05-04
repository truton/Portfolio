"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { getDictionary, type Dictionary } from "@/lib/dictionaries";
import { defaultLocale, locales, type Locale } from "@/types/i18n";

/* ------------------------------------------------------------------ */
/*  Context                                                           */
/* ------------------------------------------------------------------ */

interface I18nContextValue {
  /** The current locale code. */
  locale: Locale;
  /** The full dictionary for the current locale. */
  t: Dictionary;
  /** Switch to a different locale. */
  setLocale: (locale: Locale) => void;
  /** Current writing direction based on locale. */
  direction: "ltr" | "rtl";
}

const I18nContext = createContext<I18nContextValue | null>(null);

/* ------------------------------------------------------------------ */
/*  Provider                                                          */
/* ------------------------------------------------------------------ */

interface I18nProviderProps {
  children: ReactNode;
  /** Optional initial locale override. Defaults to 'en'. */
  initialLocale?: Locale;
}

const LOCALE_STORAGE_KEY = "portfolio_locale";

function normalizeLocale(locale: string | null | undefined): Locale {
  if (!locale) return defaultLocale;
  const normalized = locale.toLowerCase();
  if (normalized.startsWith("uk")) return "ua";
  const short = normalized.split("-")[0];
  return (locales as string[]).includes(short) ? (short as Locale) : defaultLocale;
}

/**
 * Provides i18n context to the component tree.
 * Wrap this around your app to enable `useTranslation()` everywhere.
 */
export function I18nProvider({
  children,
  initialLocale = defaultLocale,
}: I18nProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === "undefined") return initialLocale;
    const storedLocale = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (storedLocale) return normalizeLocale(storedLocale);
    const browserLocale = normalizeLocale(navigator.language);
    localStorage.setItem(LOCALE_STORAGE_KEY, browserLocale);
    return browserLocale;
  });
  const t = getDictionary(locale);
  const direction = locale === "ar" ? "rtl" : "ltr";

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "ua" ? "uk" : locale;
    document.documentElement.dir = direction;
  }, [direction, locale]);

  return (
    <I18nContext.Provider value={{ locale, t, setLocale, direction }}>
      {children}
    </I18nContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/*  Hook                                                              */
/* ------------------------------------------------------------------ */

/**
 * Returns the current locale, the full dictionary (`t`),
 * and a `setLocale` function to switch languages.
 *
 * @example
 * const { t, locale, setLocale } = useTranslation();
 * <h1>{t.hero.greeting} {t.hero.name}</h1>
 * <button onClick={() => setLocale("ua")}>UA</button>
 */
export function useTranslation(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error(
      "useTranslation must be used within an <I18nProvider>. " +
        "Wrap your root layout with <I18nProvider>."
    );
  }
  return ctx;
}
