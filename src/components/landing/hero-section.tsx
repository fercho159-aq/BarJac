"use client";

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import Link from "next/link";

export function HeroSection() {
  const heroImages = PlaceHolderImages.filter((img) => img.id.startsWith("hero"));
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  return (
    <section className="relative h-screen w-full">
      <Carousel
        className="w-full h-full"
        opts={{ loop: true }}
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {heroImages.map((image, index) => (
            <CarouselItem key={image.id}>
              <div className="relative h-screen w-full">
                <Image
                  src={image.imageUrl}
                  alt={image.description}
                  fill
                  className="object-cover"
                  data-ai-hint={image.imageHint}
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
                  <h2 className="text-5xl md:text-7xl lg:text-9xl font-headline tracking-[0.2em] text-glow-primary">
                    NOCHE DE NEÓN
                  </h2>
                  <p className="mt-4 text-xl md:text-2xl font-headline tracking-widest text-primary-foreground/80">
                    LA PRE-FIESTA EMPIEZA AQUÍ
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="mt-8 bg-transparent border-2 border-accent text-accent rounded-none hover:bg-accent hover:text-accent-foreground text-xl font-headline tracking-wider transition-all duration-300 hover:box-glow-accent px-10 py-3 h-auto"
                  >
                    <Link href="/menu">Ver Menú</Link>
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 text-primary hover:bg-primary/20 hover:text-white border-primary" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 text-primary hover:bg-primary/20 hover:text-white border-primary" />
      </Carousel>
    </section>
  );
}
