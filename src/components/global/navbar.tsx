"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor, Menu, X, Settings } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { locales, type Locale } from "@/types/i18n";
import { HireMeButton } from "@/components/ui/hire-me-button";
import { cn } from "@/lib/utils";
import { useAccent, type Accent } from "@/lib/accent";
import { useFocusTrap } from "@/lib/use-focus-trap";

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

/** Navigation anchor links — order matches navbar display. */
const NAV_LINKS = ["services", "process", "background"] as const;

/* ------------------------------------------------------------------ */
/*  Sub-components                                                    */
/* ------------------------------------------------------------------ */

const languageNames: Record<Locale, string> = {
  en: "English",
  ru: "Русский",
  de: "Deutsch",
  fr: "Français",
  es: "Español",
  ar: "العربية",
  pl: "Polski",
  pt: "Português (BR)",
  ua: "Українська",
};

const accentOptions: Accent[] = ["purple", "blue", "teal", "pink", "orange"];

/* ------------------------------------------------------------------ */
/*  Navbar                                                            */
/* ------------------------------------------------------------------ */

/**
 * Sticky top navigation bar.
 * Design: Varko-inspired — minimal, clean borders, backdrop blur,
 * high-contrast text. Collapses into a hamburger on mobile.
 */
export function Navbar() {
  const { t, locale, setLocale, direction } = useTranslation();
  const { setTheme, theme } = useTheme();
  const { accent, setAccent, previewAccent, resetAccentPreview, accentPalettes } = useAccent();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [scrollbarWidth, setScrollbarWidth] = useState(0);
  const wasSettingsOpenRef = useRef(false);
  const desktopSettingsButtonRef = useRef<HTMLButtonElement>(null);
  const mobileSettingsButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  useFocusTrap(panelRef, settingsOpen);

  const focusVisibleSettingsTrigger = useCallback(() => {
    const desktopButton = desktopSettingsButtonRef.current;
    const mobileButton = mobileSettingsButtonRef.current;
    if (desktopButton && desktopButton.offsetParent !== null) {
      desktopButton.focus();
      return;
    }
    mobileButton?.focus();
  }, []);

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
    if (mobileOpen || settingsOpen) {
      const width = window.innerWidth - document.documentElement.clientWidth;
      setScrollbarWidth(width);
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${width}px`;
    } else {
      setScrollbarWidth(0);
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [mobileOpen, settingsOpen]);

  useEffect(() => {
    function onEsc(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSettingsOpen(false);
        focusVisibleSettingsTrigger();
      }
    }
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [focusVisibleSettingsTrigger]);

  useEffect(() => {
    if (!settingsOpen && wasSettingsOpenRef.current) {
      focusVisibleSettingsTrigger();
    }
    wasSettingsOpenRef.current = settingsOpen;
  }, [focusVisibleSettingsTrigger, settingsOpen]);

  const themeOptions = [
    { key: "dark" as const, icon: Moon },
    { key: "light" as const, icon: Sun },
    { key: "system" as const, icon: Monitor },
  ];

  const currentTheme = theme ?? "system";

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-border/60 bg-background/80 backdrop-blur-xl shadow-sm shadow-black/5"
            : "bg-transparent"
        )}
        style={{ paddingRight: scrollbarWidth ? `${scrollbarWidth}px` : undefined }}
      >
        <nav className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-5 lg:px-8">
        {/* --- Logo / Name ------------------------------------------ */}
        <a
          href="#"
          className="text-lg font-bold tracking-tight text-foreground transition-opacity hover:opacity-80"
        >
          Truton<span className="text-primary">.</span>
        </a>

        {/* --- Desktop nav links ------------------------------------ */}
        <ul className="hidden items-center justify-center gap-1 md:absolute md:start-1/2 md:flex md:-translate-x-1/2">
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
          <button
            ref={desktopSettingsButtonRef}
            onClick={() => setSettingsOpen(true)}
            aria-label="Open settings"
            aria-haspopup="dialog"
            aria-expanded={settingsOpen}
            aria-controls="settings-sidebar"
            className="inline-flex items-center justify-center rounded-lg border border-border p-2.5 text-muted-foreground transition-colors hover:text-foreground hover:bg-muted cursor-pointer"
          >
            <Settings className="h-4 w-4" />
          </button>

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
              <button
                onClick={() => setSettingsOpen(true)}
                ref={mobileSettingsButtonRef}
                aria-label="Open settings"
                aria-haspopup="dialog"
                aria-expanded={settingsOpen}
                aria-controls="settings-sidebar"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer"
              >
                <Settings className="h-4 w-4" />
              </button>
            </div>

            <div className="px-4 pt-3">
              <HireMeButton variant="primary" fullWidth />
            </div>
          </div>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-[60] bg-background/55 backdrop-blur-sm transition-opacity",
          settingsOpen ? "opacity-100 duration-300" : "pointer-events-none opacity-0 duration-200"
        )}
        onClick={() => {
          setSettingsOpen(false);
          focusVisibleSettingsTrigger();
        }}
      />

      <aside
        id="settings-sidebar"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
        aria-hidden={!settingsOpen}
        className={cn(
          "fixed inset-y-0 end-0 z-[70] w-full max-w-sm border-border bg-card/95 p-5 shadow-2xl backdrop-blur-xl transition-transform sm:p-6",
          direction === "rtl" ? "border-e" : "border-s",
          settingsOpen
            ? "translate-x-0 duration-300 ease-out"
            : direction === "rtl"
              ? "-translate-x-full duration-200 ease-in"
              : "translate-x-full duration-200 ease-in"
        )}
      >
        <div className="mb-6 flex items-center justify-between">
          <h3 id="settings-title" className="text-xl font-semibold tracking-tight text-foreground">{t.settings.title}</h3>
          <button
            onClick={() => setSettingsOpen(false)}
            aria-label="Close settings"
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <p className="mb-3 text-sm font-medium text-foreground">{t.settings.appearance}</p>
            <div className="grid grid-cols-3 gap-2">
              {themeOptions.map((option) => {
                const Icon = option.icon;
                const isActive = currentTheme === option.key;
                return (
                  <button
                    key={option.key}
                    onClick={() => setTheme(option.key)}
                    aria-label={`Set ${t.theme[option.key]} theme`}
                    className={cn(
                      "inline-flex items-center justify-center gap-2 rounded-lg border px-2 py-2 text-xs transition-colors cursor-pointer",
                      isActive
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {t.theme[option.key]}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="mb-3 text-sm font-medium text-foreground">{t.settings.accent}</p>
            <div className="flex items-center gap-3">
              {accentOptions.map((item) => {
                const isActive = accent === item;
                return (
                  <button
                    key={item}
                    onClick={() => setAccent(item)}
                    onMouseEnter={() => previewAccent(item)}
                    onMouseLeave={resetAccentPreview}
                    onFocus={() => previewAccent(item)}
                    onBlur={resetAccentPreview}
                    aria-label={`Accent ${item}`}
                    className={cn(
                      "h-9 w-9 rounded-full border-2 transition-transform cursor-pointer ring-offset-2 ring-offset-card",
                      isActive
                        ? "scale-105 border-card ring-2 ring-primary shadow-md shadow-black/20"
                        : "border-transparent hover:scale-105"
                    )}
                    style={{ backgroundColor: accentPalettes[item].primary }}
                  />
                );
              })}
            </div>
          </div>

          <div>
            <p className="mb-3 text-sm font-medium text-foreground">{t.settings.language}</p>
            <div className="flex max-h-[44vh] flex-col gap-1 overflow-y-auto pe-1">
              {locales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => setLocale(loc as Locale)}
                  aria-label={`Set language ${languageNames[loc]}`}
                  className={cn(
                    "flex items-center gap-3 rounded-lg border border-transparent px-3 py-2 text-sm transition-colors cursor-pointer text-start",
                    locale === loc
                      ? "border-border bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <span
                    className={cn(
                      "inline-flex min-w-8 items-center justify-center rounded-md px-1.5 py-0.5 text-[11px] font-semibold tracking-wide",
                      locale === loc
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {loc.toUpperCase()}
                  </span>
                  <span className="text-start">{languageNames[loc]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
