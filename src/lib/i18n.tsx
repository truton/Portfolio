"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { getDictionary, type Dictionary } from "@/lib/dictionaries";
import { defaultLocale, type Locale } from "@/types/i18n";

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

/**
 * Provides i18n context to the component tree.
 * Wrap this around your app to enable `useTranslation()` everywhere.
 */
export function I18nProvider({
  children,
  initialLocale = defaultLocale,
}: I18nProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const t = getDictionary(locale);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
  }, []);

  return (
    <I18nContext.Provider value={{ locale, t, setLocale }}>
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
 * <button onClick={() => setLocale("uk")}>UA</button>
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
