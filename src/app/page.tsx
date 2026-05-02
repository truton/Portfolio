import { HeroSection } from "@/components/sections/hero";
import { ServicesSection } from "@/components/sections/services";
import { ProcessSection } from "@/components/sections/process";
import { BackgroundSection } from "@/components/sections/background";
import { CTASection } from "@/components/sections/cta";
import { Footer } from "@/components/global/footer";

export default function Home() {
  return (
    <>
      <main className="flex flex-col flex-1">
        <HeroSection />
        <ServicesSection />
        <ProcessSection />
        <BackgroundSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
