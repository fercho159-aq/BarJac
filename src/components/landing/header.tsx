"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/nosotros", label: "Nosotros" },
  { href: "/menu", label: "Menú" },
  { href: "/sucursales", label: "Sucursales" },
];

export function Header() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const pathname = usePathname();

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
        "w-full p-4 md:px-6 flex justify-between items-center fixed top-0 left-0 z-50 transition-all duration-300",
        hasScrolled ? "bg-black/80 backdrop-blur-sm" : "bg-transparent"
      )}
    >
      <Link href="/">
        <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 animate-pulse cursor-pointer">
          SAMBUCA
        </h1>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "font-headline text-lg tracking-wider transition-colors px-3 py-1 rounded-md",
              pathname === link.href
                ? "text-primary-foreground bg-primary"
                : "text-primary hover:text-primary-foreground hover:bg-primary/80"
            )}
          >
            {link.label}
          </Link>
        ))}
        <Button
          asChild
          variant="ghost"
          className="text-accent border-2 border-accent rounded-none hover:bg-accent hover:text-accent-foreground text-lg font-headline tracking-wider transition-all duration-300 hover:box-glow-accent px-6 py-2 h-auto"
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
                  className={cn(
                    "font-headline text-2xl tracking-wider transition-colors px-3 py-1 rounded-md",
                    pathname === link.href
                      ? "text-primary-foreground bg-primary"
                      : "text-primary hover:text-primary-foreground hover:bg-primary/80"
                  )}
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
