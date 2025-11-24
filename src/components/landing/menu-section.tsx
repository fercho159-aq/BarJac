import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bomb, GlassWater } from "lucide-react";
import { DuckIcon } from "../icons/duck-icon";

const menuCategories = [
  {
    title: "Pink On",
    color: "primary",
    drinks: [
      { name: "Cosmo Pato", price: "$120", icon: DuckIcon },
      { name: "Pink Bomb", price: "$90", icon: Bomb },
      { name: "Fresita", price: "$100", icon: GlassWater },
    ],
  },
  {
    title: "Blue On",
    color: "blue-400", // Using tailwind color for variety
    drinks: [
      { name: "Blue Duck", price: "$120", icon: DuckIcon },
      { name: "Kamikaze Azul", price: "$90", icon: Bomb },
      { name: "Tritón", price: "$800", icon: GlassWater },
    ],
  },
  {
    title: "Green On",
    color: "green-400",
    drinks: [
      { name: "Perico Pato", price: "$120", icon: DuckIcon },
      { name: "Absinthe Bomb", price: "$150", icon: Bomb },
      { name: "Hierbabuena", price: "$100", icon: GlassWater },
    ],
  },
];

export function MenuSection() {
  return (
    <section id="menu" className="container mx-auto px-4">
      <h2 className="text-5xl md:text-7xl font-headline text-center mb-12 tracking-widest text-glow-primary">
        Nuestro Menú
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {menuCategories.map((category) => (
          <Card key={category.title} className="bg-card border-2 border-transparent hover:border-primary transition-all duration-300 group hover:box-glow-primary">
            <CardHeader>
              <CardTitle className="text-4xl font-headline tracking-wider text-primary group-hover:text-glow-primary transition-all duration-300">
                {category.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {category.drinks.map((drink) => (
                  <li key={drink.name} className="flex justify-between items-center border-b border-border/50 pb-2 text-lg">
                    <div className="flex items-center gap-3">
                      <drink.icon className="w-6 h-6 text-primary" />
                      <span className="font-headline tracking-wider">{drink.name}</span>
                    </div>
                    <span className="font-mono text-primary/80">{drink.price}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
