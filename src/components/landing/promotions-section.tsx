import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const promotions = [
  {
    title: "Charola de Patos",
    description: "10 Patos de tu sabor preferido.",
    price: "$900",
  },
  {
    title: "Tritón de Cerveza",
    description: "5 Litros de cerveza de barril para compartir.",
    price: "$750",
  },
  {
    title: "Combo Bombas",
    description: "5 bombas de sabores variados.",
    price: "$400",
  },
];

export function PromotionsSection() {
  return (
    <section id="promotions" className="container mx-auto px-4">
      <h2 className="text-5xl md:text-7xl font-headline text-center mb-12 tracking-widest text-glow-accent">
        Promociones
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {promotions.map((promo) => (
          <Card key={promo.title} className="bg-card border-2 border-transparent hover:border-accent transition-all duration-300 group hover:box-glow-accent flex flex-col">
            <CardHeader className="flex-grow">
              <CardTitle className="text-4xl font-headline tracking-wider text-accent group-hover:text-glow-accent transition-all duration-300">
                {promo.title}
              </CardTitle>
              <CardDescription className="text-muted-foreground pt-2 text-base">
                {promo.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center">
              <p className="text-5xl font-mono text-foreground mb-4">{promo.price}</p>
              <Button variant="outline" className="w-full bg-transparent border-2 border-accent text-accent rounded-none hover:bg-accent hover:text-accent-foreground text-lg font-headline tracking-wider transition-all duration-300">
                Ordenar
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
