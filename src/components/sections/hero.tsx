"use client";

import { useTranslation } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { HireMeButton } from "@/components/ui/hire-me-button";
import { ArrowDown } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

/** Tech stack for the infinite marquee */
const TECH_STACK = [
  "React",
  "Node.js",
  "TypeScript",
  "PostgreSQL",
  "Tailwind CSS",
  "Linux",
];

/**
 * Hero Section
 * Features a pulsing availability badge, high-contrast typography,
 * clear CTAs, and an infinite scrolling tech stack marquee.
 */
export function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden min-h-[90vh]">
      {/* Background subtle radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--color-primary)_0%,transparent_50%)] opacity-[0.04] dark:opacity-[0.06] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center z-10 relative mt-10 sm:mt-16">
        
        {/* --- Pulsing Availability Badge --- */}
        <ScrollReveal delay={0.1}>
          <div className="inline-flex items-center rounded-full border border-border bg-muted/50 px-3.5 py-1.5 text-sm font-medium mb-8 backdrop-blur-sm">
            <span className="relative me-2.5 flex h-2 w-2 rounded-full bg-green-500">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping"></span>
            </span>
            {t.hero.badge}
          </div>
        </ScrollReveal>

        {/* --- Headline --- */}
        <ScrollReveal delay={0.2}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl leading-tight text-foreground">
            {t.hero.headline}
          </h1>
        </ScrollReveal>

        {/* --- Subheadline --- */}
        <ScrollReveal delay={0.3}>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
            {t.hero.subheadline}
          </p>
        </ScrollReveal>

        {/* --- CTAs --- */}
        <ScrollReveal delay={0.4}>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <HireMeButton
              size="lg"
              fullWidth
              buttonClassName="w-full sm:w-auto text-base h-14 px-8 shadow-lg shadow-primary/20"
            />
            <a href="#tech-stack" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" fullWidth className="gap-2 text-base h-14 px-8">
                {t.hero.cta_secondary}
                <ArrowDown className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </ScrollReveal>
      </div>

      {/* --- Infinite Scrolling Marquee --- */}
      <div className="w-full mt-24 md:mt-32 flex overflow-hidden border-y border-border/40 bg-muted/10 py-6 relative">
        {/* Fade gradients for smooth scrolling effect on edges */}
        <div className="absolute inset-y-0 start-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="absolute inset-y-0 end-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        
        <div className="flex animate-marquee whitespace-nowrap group">
          {/* We duplicate the stack array a couple of times to ensure smooth infinite scroll */}
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex shrink-0 items-center justify-around w-max">
              {TECH_STACK.map((tech) => (
                <span
                  key={`${i}-${tech}`}
                  className="mx-8 md:mx-12 text-xl md:text-2xl font-bold tracking-wider text-muted-foreground/30 uppercase transition-colors duration-300 hover:text-muted-foreground/60"
                >
                  {tech}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
