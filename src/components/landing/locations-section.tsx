import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

const locations = [
  {
    name: "Sambuca Condesa",
    address: "Av. Amsterdam 24, Hipódromo, Cuauhtémoc, CDMX",
  },
  {
    name: "Sambuca Roma",
    address: "Orizaba 160, Roma Nte., Cuauhtémoc, CDMX",
  },
  {
    name: "Sambuca Polanco",
    address: "Av. Presidente Masaryk 299, Polanco, Miguel Hidalgo, CDMX",
  },
];

export function LocationsSection() {
  return (
    <section id="locations" className="container mx-auto px-4">
      <h2 className="text-5xl md:text-7xl font-headline text-center mb-12 tracking-widest text-glow-primary">
        Sucursales
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {locations.map((location) => (
          <Card key={location.name} className="bg-transparent border-2 border-border/50 text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <MapPin className="w-10 h-10 text-primary" />
              </div>
              <CardTitle className="text-3xl font-headline tracking-wider text-primary">
                {location.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{location.address}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
