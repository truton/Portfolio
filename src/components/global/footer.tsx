"use client";

import { useTranslation } from "@/lib/i18n";

/** Replace these with actual URLs */
const GITHUB_URL = "https://github.com/truton";

/**
 * Global Footer
 * Minimalist design featuring brand, copyright, and platform links.
 */
export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background py-12 px-4 sm:px-6 lg:px-8 mt-12">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-8">
        {/* --- Branding & Copyright --- */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="text-2xl font-bold tracking-tight">
            Truton<span className="text-primary">.</span>
          </span>
          <p className="text-sm text-muted-foreground mt-1 text-center md:text-left">
            © {currentYear} Truton {t.footer.copyright}
          </p>
        </div>

        {/* --- Social Links --- */}
        <div className="flex items-center gap-8">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-bold tracking-wide text-muted-foreground hover:text-foreground transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>

      {/* --- Built With Note --- */}
      <div className="container mx-auto max-w-6xl mt-10 pt-8 border-t border-border/50 text-center flex justify-center">
        <p className="text-xs text-muted-foreground/60 max-w-xs">
          {t.footer.built_with}
        </p>
      </div>
    </footer>
  );
}
