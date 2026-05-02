"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from "@/lib/i18n";

/**
 * Bundles all client-side providers into a single wrapper.
 * This keeps the root layout as a Server Component while
 * isolating the "use client" boundary to this file.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <I18nProvider>{children}</I18nProvider>
    </ThemeProvider>
  );
}
