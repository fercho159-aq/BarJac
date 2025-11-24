import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

export function AboutSection() {
  return (
    <section id="about" className="container mx-auto px-4">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
           <h2 className="text-5xl md:text-7xl font-headline tracking-widest text-glow-primary mb-6">
            La Pre-Fiesta
          </h2>
          <div className="space-y-4 text-lg text-foreground/80">
            <p>
              Sambuca no es solo un bar, es una experiencia. Nacimos con la misión de revolucionar las noches, creando un espacio donde la energía del neón se encuentra con los sabores más audaces.
            </p>
            <p>
              Nuestro concepto se basa en la fusión de un ambiente vibrante, iluminado por luces de neón, y una coctelería de autor que desafía lo convencional.
            </p>
          </div>
           <Button
            asChild
            variant="link"
            className="text-primary hover:text-primary/80 text-lg px-0 mt-4"
          >
            <Link href="/nosotros">Conoce nuestra historia</Link>
          </Button>
        </div>
        <div className="relative aspect-video rounded-lg overflow-hidden box-glow-primary">
            <Image
            src="https://images.unsplash.com/photo-1579487784821-dfb349f4c0ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxuZW9uJTIwYmFyfGVufDB8fHx8MTc2NDA4MzAyOXww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Interior del bar Sambuca con luces de neón"
            fill
            className="object-cover"
            data-ai-hint="neon bar"
            />
        </div>
      </div>
    </section>
  );
}
