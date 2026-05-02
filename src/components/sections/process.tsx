"use client";

import { useTranslation } from "@/lib/i18n";
import { PROCESS_DATA } from "@/data/content";

/**
 * Process Section
 * Varko-style minimal vertical timeline. Alternates sides on desktop.
 */
export function ProcessSection() {
  const { t } = useTranslation();

  return (
    <section id="process" className="py-24 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            {t.process.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.process.subtitle}
          </p>
        </div>

        <div className="relative">
          {/* Vertical connecting line for desktop */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-px bg-border -translate-x-1/2" />

          <div className="space-y-12 md:space-y-0">
            {PROCESS_DATA.map((step, index) => {
              const Icon = step.icon;
              const content = t.process_items[step.id as keyof typeof t.process_items];
              const isEven = index % 2 === 0;

              return (
                <div
                  key={step.id}
                  className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 md:py-12 ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Content Box */}
                  <div className={`w-full md:w-1/2 flex ${isEven ? "md:justify-start" : "md:justify-end"}`}>
                    <div className="w-full max-w-md p-8 bg-card rounded-2xl border border-border transition-all duration-300 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-white/5 hover:border-primary/30">
                      <h3 className="text-xl font-bold mb-3 tracking-tight text-foreground">
                        {content.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {content.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Icon (Desktop only) */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16 items-center justify-center rounded-full border-4 border-background bg-muted text-muted-foreground shadow-sm z-10 transition-colors duration-300 hover:bg-primary/10 hover:text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
