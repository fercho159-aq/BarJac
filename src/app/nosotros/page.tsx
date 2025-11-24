import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import Image from "next/image";

export default function NosotrosPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-24 md:pt-32">
        <section className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-headline tracking-widest text-glow-primary">
              Nuestra Historia
            </h1>
            <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
              Nacimos con la misión de revolucionar las noches, creando un espacio donde la energía del neón se encuentra con los sabores más audaces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-square rounded-lg overflow-hidden box-glow-primary">
               <Image
                src="https://images.unsplash.com/photo-1579487784821-dfb349f4c0ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxuZW9uJTIwYmFyfGVufDB8fHx8MTc2NDA4MzAyOXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Interior del bar Sambuca"
                fill
                className="object-cover"
                data-ai-hint="neon bar"
              />
            </div>
            <div className="space-y-6 text-lg text-foreground/80">
              <p>
                Sambuca no es solo un bar, es una experiencia. Desde nuestra fundación en el corazón de la ciudad, hemos buscado ser el epicentro de la vida nocturna, el punto de partida para noches inolvidables. Nuestro concepto se basa en la fusión de un ambiente vibrante, iluminado por luces de neón, y una coctelería de autor que desafía lo convencional.
              </p>
              <p>
                Cada rincón de Sambuca está diseñado para estimular tus sentidos. Creemos que una gran noche comienza con un gran ambiente, buena música y, por supuesto, bebidas excepcionales. Nuestro equipo de mixólogos expertos trabaja incansablemente para innovar y sorprender, creando tragos que son tan visualmente impactantes como deliciosos.
              </p>
              <p>
                Te invitamos a ser parte de nuestra historia. Ven a vivir la experiencia Sambuca, donde cada noche es una celebración y la pre-fiesta nunca termina.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
