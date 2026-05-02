"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import {
  Sun,
  Moon,
  Terminal,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { locales, type Locale } from "@/types/i18n";
import { HireMeButton } from "@/components/ui/hire-me-button";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

/** Navigation anchor links — order matches navbar display. */
const NAV_LINKS = ["services", "process", "background"] as const;

/* ------------------------------------------------------------------ */
/*  Sub-components                                                    */
/* ------------------------------------------------------------------ */

/** Icon map for theme options. */
const themeIcon: Record<string, React.ReactNode> = {
  dark: <Moon className="h-4 w-4" />,
  light: <Sun className="h-4 w-4" />,
  terminal: <Terminal className="h-4 w-4" />,
};

/**
 * Dropdown for switching between dark / light / terminal themes.
 * Accessible via keyboard: opens on Enter/Space, closes on Escape.
 */
function ThemeDropdown() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true); }, []);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) return <div className="h-8 w-8" />;

  const themes = ["dark", "light", "terminal"] as const;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
        aria-label="Toggle theme"
        aria-expanded={open}
        className={cn(
          "flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5",
          "text-sm text-muted-foreground transition-colors duration-200",
          "hover:text-foreground hover:border-foreground/20",
          "cursor-pointer"
        )}
      >
        {themeIcon[theme ?? "dark"]}
        <ChevronDown
          className={cn(
            "h-3 w-3 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {/* Dropdown panel */}
      <div
        className={cn(
          "absolute right-0 top-full mt-2 z-50",
          "min-w-[140px] rounded-lg border border-border bg-card p-1",
          "shadow-lg shadow-black/10",
          "transition-all duration-200 origin-top-right",
          open
            ? "scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        )}
      >
        {themes.map((th) => (
          <button
            key={th}
            onClick={() => {
              setTheme(th);
              setOpen(false);
            }}
            className={cn(
              "flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm",
              "transition-colors duration-150 cursor-pointer",
              theme === th
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            {themeIcon[th]}
            {t.theme[th]}
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * Compact language toggle: EN | UA pill.
 */
function LanguageSwitcher() {
  const { locale, setLocale, t } = useTranslation();

  return (
    <div className="flex items-center rounded-lg border border-border overflow-hidden text-xs font-medium">
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => setLocale(loc as Locale)}
          className={cn(
            "px-2.5 py-1.5 transition-colors duration-200 cursor-pointer",
            locale === loc
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          )}
        >
          {t.language[loc]}
        </button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Navbar                                                            */
/* ------------------------------------------------------------------ */

/**
 * Sticky top navigation bar.
 * Design: Varko-inspired — minimal, clean borders, backdrop blur,
 * high-contrast text. Collapses into a hamburger on mobile.
 */
export function Navbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Track scroll position for sticky header visual effect
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 16);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/80 backdrop-blur-xl shadow-sm shadow-black/5"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 lg:px-8">
        {/* --- Logo / Name ------------------------------------------ */}
        <a
          href="#"
          className="text-lg font-bold tracking-tight text-foreground transition-opacity hover:opacity-80"
        >
          Truton<span className="text-primary">.</span>
        </a>

        {/* --- Desktop nav links ------------------------------------ */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((key) => (
            <li key={key}>
              <a
                href={`#${key}`}
                className={cn(
                  "rounded-lg px-3.5 py-2 text-sm font-medium",
                  "text-muted-foreground transition-colors duration-200",
                  "hover:text-foreground hover:bg-muted/60"
                )}
              >
                {t.nav[key]}
              </a>
            </li>
          ))}
        </ul>

        {/* --- Desktop right actions -------------------------------- */}
        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          <ThemeDropdown />

          <HireMeButton size="sm" variant="primary" />
        </div>

        {/* --- Mobile hamburger ------------------------------------- */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="flex items-center justify-center rounded-lg p-2 text-foreground transition-colors hover:bg-muted md:hidden cursor-pointer"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </nav>

      {/* --- Mobile menu overlay ------------------------------------ */}
      <div
        className={cn(
          "fixed inset-x-0 top-16 bottom-0 z-40 md:hidden",
          "bg-background/95 backdrop-blur-xl",
          "transition-all duration-300 ease-out",
          mobileOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        )}
      >
        <div className="flex flex-col gap-2 border-t border-border px-5 py-6">
          {NAV_LINKS.map((key) => (
            <a
              key={key}
              href={`#${key}`}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "rounded-lg px-4 py-3 text-base font-medium",
                "text-muted-foreground transition-colors duration-200",
                "hover:text-foreground hover:bg-muted/60"
              )}
            >
              {t.nav[key]}
            </a>
          ))}

          {/* Divider */}
          <div className="my-3 h-px bg-border" />

          {/* Mobile actions */}
          <div className="flex items-center gap-3 px-4">
            <LanguageSwitcher />
            <ThemeDropdown />
          </div>

          <div className="px-4 pt-3">
            <HireMeButton variant="primary" fullWidth />
          </div>
        </div>
      </div>
    </header>
  );
}
