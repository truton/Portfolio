"use client";

import { useTranslation } from "@/lib/i18n";
import { BACKGROUND_DATA } from "@/data/content";
import { cn } from "@/lib/utils";

/**
 * Background Section
 * Bento-box grid layout for non-web engineering skills.
 * Features a tech-heavy, high-contrast minimal style inspired by Varko.
 */
export function BackgroundSection() {
  const { t } = useTranslation();

  return (
    <section id="background" className="py-24 md:py-32 bg-muted/10 relative overflow-hidden">
      {/* Subtle background tech texture/gradient */}
      <div className="pointer-events-none absolute top-0 end-0 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/2 rounded-full bg-primary/5 blur-[100px]" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            {t.background.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.background.subtitle}
          </p>
        </div>

        {/* Bento Box Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {BACKGROUND_DATA.map((item, index) => {
            const Icon = item.icon;
            const content = t.background_items[item.id as keyof typeof t.background_items];
            
            // Make the first item span 2 columns on large screens to create the bento box feel
            const isFeatured = index === 0;

            return (
              <div
                key={item.id}
                className={cn(
                  "group relative overflow-hidden flex flex-col p-8 bg-card rounded-3xl border border-border transition-all duration-500 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-white/5 hover:border-primary/40",
                  isFeatured ? "lg:col-span-2 lg:flex-row lg:items-center lg:p-12 gap-8 lg:gap-12" : "col-span-1 gap-6"
                )}
              >
                {/* Techy abstract highlight on hover */}
                <div className="pointer-events-none absolute -top-20 -end-20 h-48 w-48 rounded-full bg-primary/10 blur-3xl transition-transform duration-700 group-hover:scale-[2]" />

                <div className={cn(
                  "flex shrink-0 items-center justify-center rounded-2xl bg-muted/50 border border-border text-foreground transition-transform duration-500 group-hover:-translate-y-2 group-hover:bg-primary/10",
                  isFeatured ? "h-20 w-20" : "h-16 w-16"
                )}>
                  <Icon className={cn("text-primary transition-transform duration-500 group-hover:scale-110", isFeatured ? "h-10 w-10" : "h-8 w-8")} />
                </div>
                
                <div className="flex flex-col z-10 relative">
                  <h3 className={cn("font-bold mb-3 tracking-tight text-foreground", isFeatured ? "text-2xl md:text-3xl" : "text-xl md:text-2xl")}>
                    {content.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-base">
                    {content.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
