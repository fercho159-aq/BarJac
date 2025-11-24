"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function Header() {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn(
      "w-full p-4 md:p-6 flex justify-between items-center fixed top-0 left-0 z-50 transition-all duration-300",
      hasScrolled ? "bg-black/80 backdrop-blur-sm" : "bg-transparent"
    )}>
      <h1 className="text-4xl md:text-5xl font-headline text-glow-primary tracking-widest cursor-pointer">
        SAMBUCA
      </h1>
      <Button variant="ghost" className="text-primary border-2 border-primary rounded-none hover:bg-primary hover:text-primary-foreground text-lg font-headline tracking-wider transition-all duration-300 hover:box-glow-primary px-6 py-2 h-auto">
        Reservar
      </Button>
    </header>
  );
}
