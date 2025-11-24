import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { LocationsSection } from "@/components/landing/locations-section";

export default function SucursalesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-24 md:pt-32">
        <LocationsSection />
      </main>
      <Footer />
    </div>
  );
}
