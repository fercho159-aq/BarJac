"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const navLinks = [
  { href: "/nosotros", label: "Nosotros" },
  { href: "/menu", label: "Menú" },
  { href: "/sucursales", label: "Sucursales" },
];

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
    <header
      className={cn(
        "w-full p-4 md:p-6 flex justify-between items-center fixed top-0 left-0 z-50 transition-all duration-300",
        hasScrolled ? "bg-black/80 backdrop-blur-sm" : "bg-transparent"
      )}
    >
      <Link href="/">
        <h1 className="text-4xl md:text-5xl font-headline text-glow-primary tracking-widest cursor-pointer">
          SAMBUCA
        </h1>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="font-headline text-lg tracking-wider text-primary hover:text-primary-foreground hover:bg-primary rounded-md px-3 py-1 transition-colors"
          >
            {link.label}
          </Link>
        ))}
        <Button
          asChild
          variant="ghost"
          className="text-primary border-2 border-primary rounded-none hover:bg-primary hover:text-primary-foreground text-lg font-headline tracking-wider transition-all duration-300 hover:box-glow-primary px-6 py-2 h-auto"
        >
          <Link href="/reservar">Reservar</Link>
        </Button>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-8 w-8 text-primary" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-card border-l-border/50">
            <SheetHeader>
              <SheetTitle className="sr-only">Menú de Navegación</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col items-center justify-center h-full gap-8">
              <Link href="/">
                <h1 className="text-4xl font-headline text-glow-primary tracking-widest cursor-pointer mb-8">
                  SAMBUCA
                </h1>
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-headline text-2xl tracking-wider text-primary hover:text-primary-foreground hover:bg-primary rounded-md px-3 py-1 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Button
                asChild
                variant="outline"
                className="text-accent border-2 border-accent rounded-none hover:bg-accent hover:text-accent-foreground text-2xl font-headline tracking-wider transition-all duration-300 hover:box-glow-accent px-10 py-3 h-auto mt-8"
              >
                <Link href="/reservar">Reservar</Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
