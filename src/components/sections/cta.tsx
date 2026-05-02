"use client";

import { useTranslation } from "@/lib/i18n";
import { HireMeButton } from "@/components/ui/hire-me-button";

/**
 * CTA Section
 * A large, high-contrast block designed to stand out and convert
 * visitors into leads at the bottom of the funnel.
 */
export function CTASection() {
  const { t } = useTranslation();

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-primary px-6 py-16 text-primary-foreground sm:px-12 sm:py-24 md:px-16 text-center shadow-2xl shadow-primary/20">
          {/* Subtle background glow/pattern for depth */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,white_0%,transparent_100%)] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="mb-6 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl max-w-2xl leading-tight">
              {t.cta.title}
            </h2>
            <p className="mb-10 text-lg sm:text-xl text-primary-foreground/90 max-w-xl leading-relaxed">
              {t.cta.description}
            </p>
            {/* Overriding the default primary button styles to be high-contrast inverse */}
            <HireMeButton
              size="lg"
              buttonClassName="bg-background text-foreground hover:bg-background/90 h-14 px-10 text-base shadow-xl transition-transform hover:scale-105 active:scale-95"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
