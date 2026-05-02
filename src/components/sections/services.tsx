"use client";

import { useTranslation } from "@/lib/i18n";
import { SERVICES_DATA } from "@/data/content";

/**
 * Services Section
 * Varko-style minimal grid layout showing key offerings.
 */
export function ServicesSection() {
  const { t } = useTranslation();

  return (
    <section id="services" className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            {t.services.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.services.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {SERVICES_DATA.map((service) => {
            const Icon = service.icon;
            // The dictionary is guaranteed to have these keys since we enforce it
            const content = t.services_items[service.id as keyof typeof t.services_items];

            return (
              <div
                key={service.id}
                className="group flex flex-col items-start p-8 bg-card rounded-2xl border border-border transition-all duration-300 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-white/5 hover:border-primary/30"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary mb-8 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 tracking-tight text-foreground">
                  {content.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {content.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
