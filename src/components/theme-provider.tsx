"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

/**
 * Theme provider wrapper around next-themes.
 * Supports three themes: 'dark' (default), 'light', and 'terminal'.
 *
 * The 'terminal' theme applies a custom data-theme="terminal" attribute
 * which is styled via CSS variables in globals.css.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="dark"
      themes={["dark", "light", "terminal"]}
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
