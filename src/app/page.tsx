import { Header } from "@/components/landing/header";
import { HeroSection } from "@/components/landing/hero-section";
import { MenuSection } from "@/components/landing/menu-section";
import { PromotionsSection } from "@/components/landing/promotions-section";
import { LocationsSection } from "@/components/landing/locations-section";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <div className="space-y-24 md:space-y-32 my-24 md:my-32">
          <MenuSection />
          <PromotionsSection />
          <LocationsSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
