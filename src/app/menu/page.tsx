import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { MenuSection } from "@/components/landing/menu-section";

export default function MenuPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-24 md:pt-32">
        <MenuSection />
      </main>
      <Footer />
    </div>
  );
}
