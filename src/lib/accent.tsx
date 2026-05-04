"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Accent = "purple" | "blue" | "teal" | "pink" | "orange";

interface AccentPalette {
  primary: string;
  primaryForeground: string;
  accent: string;
}

const ACCENT_STORAGE_KEY = "portfolio_accent";

const accentPalettes: Record<Accent, AccentPalette> = {
  purple: { primary: "#8b5cf6", primaryForeground: "#ffffff", accent: "#a78bfa" },
  blue: { primary: "#3b82f6", primaryForeground: "#ffffff", accent: "#60a5fa" },
  teal: { primary: "#2dd4bf", primaryForeground: "#042f2e", accent: "#5eead4" },
  pink: { primary: "#ec4899", primaryForeground: "#ffffff", accent: "#f472b6" },
  orange: { primary: "#fb923c", primaryForeground: "#1f1300", accent: "#fdba74" },
};

interface AccentContextValue {
  accent: Accent;
  setAccent: (accent: Accent) => void;
  accentPalettes: Record<Accent, AccentPalette>;
}

const AccentContext = createContext<AccentContextValue | null>(null);

function isAccent(value: string | null): value is Accent {
  return value === "purple" || value === "blue" || value === "teal" || value === "pink" || value === "orange";
}

function applyAccent(accent: Accent) {
  const palette = accentPalettes[accent];
  const root = document.documentElement;
  root.style.setProperty("--primary", palette.primary);
  root.style.setProperty("--primary-foreground", palette.primaryForeground);
  root.style.setProperty("--accent", palette.accent);
  root.style.setProperty("--color-primary", palette.primary);
}

export function AccentProvider({ children }: { children: ReactNode }) {
  const [accent, setAccentState] = useState<Accent>(() => {
    if (typeof window === "undefined") return "purple";
    const storedAccent = localStorage.getItem(ACCENT_STORAGE_KEY);
    return isAccent(storedAccent) ? storedAccent : "purple";
  });

  useEffect(() => {
    applyAccent(accent);
  }, [accent]);

  const setAccent = useCallback((nextAccent: Accent) => {
    setAccentState(nextAccent);
    localStorage.setItem(ACCENT_STORAGE_KEY, nextAccent);
    applyAccent(nextAccent);
  }, []);

  const value = useMemo(
    () => ({
      accent,
      setAccent,
      accentPalettes,
    }),
    [accent, setAccent]
  );

  return <AccentContext.Provider value={value}>{children}</AccentContext.Provider>;
}

export function useAccent(): AccentContextValue {
  const ctx = useContext(AccentContext);
  if (!ctx) {
    throw new Error(
      "useAccent must be used within an <AccentProvider>. Wrap your app with <AccentProvider>."
    );
  }
  return ctx;
}
