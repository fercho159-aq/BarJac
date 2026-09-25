"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Facebook, Instagram, Phone, Star, MapPin, Menu as MenuIcon, Briefcase, Copy, UtensilsCrossed, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect, useRef } from "react";
import type { SiteContent, MenuCategory, MenuItem } from "@/lib/content/types";

import { TiktokIcon } from "@/components/icons/tiktok-icon";
import { BottleIcon } from "@/components/icons/bottle-icon";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

function ScrollReveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(el); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "text-[hsl(var(--gold))] fill-[hsl(var(--gold))]" : "text-gray-300"}`} />
    ))}
  </div>
);

const foodImages = [
  "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=600&fit=crop",
];

function t(localized: { es: string; en: string }, lang: string): string {
  const val = lang === "en" ? localized.en : localized.es;
  return val || localized.es || "";
}

function ItemCard({
  item, lang, expandedCard, setExpandedCard,
}: {
  item: MenuItem; lang: string; expandedCard: string | null; setExpandedCard: (id: string | null) => void;
}) {
  const name = t(item.name, lang);
  const description = t(item.description, lang);
  const quantity = t(item.quantity, lang);
  const isExpanded = expandedCard === item.id;

  const hasLabeledPrices = item.prices.length > 1 && item.prices[0].label.es;
  const isSpirit = hasLabeledPrices && item.prices.some(p =>
    /copeo|copa|glass/i.test(p.label.es) || /copeo|copa|glass/i.test(p.label.en)
  );

  if (isSpirit) {
    const glassP = item.prices.find(p => /copeo|copa|glass/i.test(p.label.es + p.label.en));
    const bottleP = item.prices.find(p => /botella|bottle/i.test(p.label.es + p.label.en));
    return (
      <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 p-4">
        <h4 className="font-display font-bold text-lg text-[#2A3A1A]">{name}</h4>
        <div className="flex justify-between items-center mt-3">
          <div>
            <p className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wide">{lang === "es" ? "Copa" : "Glass"}</p>
            <p className="font-bold text-xl text-[hsl(var(--primary))]">${glassP?.price}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wide">{lang === "es" ? "Botella" : "Bottle"}</p>
            {bottleP?.price ? (
              <p className="font-bold text-xl text-[hsl(var(--primary))]">${bottleP.price}</p>
            ) : (
              <p className="text-sm text-[hsl(var(--muted-foreground))] italic">&mdash;</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (hasLabeledPrices) {
    return (
      <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 p-4">
        <h4 className="font-display font-bold text-lg text-[#2A3A1A] uppercase leading-tight">{name}</h4>
        {quantity && <p className="text-sm text-[hsl(var(--muted-foreground))]">{quantity}</p>}
        <div className="flex justify-between items-center mt-3">
          {item.prices.map((p, i) => (
            <div key={i} className={i > 0 ? "text-right" : ""}>
              <p className="text-xs text-[hsl(var(--muted-foreground))] uppercase">{t(p.label, lang)}</p>
              <p className="font-bold text-lg text-[hsl(var(--primary))]">${p.price}</p>
            </div>
          ))}
        </div>
        {description && (
          <>
            <button onClick={() => setExpandedCard(isExpanded ? null : item.id)} className="text-[hsl(var(--primary))] text-sm font-semibold hover:underline mt-2">
              {isExpanded ? (lang === "es" ? "Cerrar" : "Close") : (lang === "es" ? "Ver →" : "View →")}
            </button>
            {isExpanded && (
              <p className="text-[hsl(var(--muted-foreground))] text-sm mt-2 pt-2 border-t border-gray-100 animate-fade-up">{description}</p>
            )}
          </>
        )}
      </div>
    );
  }

  const price = item.prices[0]?.price;

  if (item.image) {
    return (
      <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
        <div className="relative aspect-[3/2] overflow-hidden bg-[#F5F0E8] flex items-center justify-center">
          <img
            src={item.image}
            alt={name}
            className={`transition-transform duration-500 ${item.image.includes("barjac-icon") ? "w-16 h-16 object-contain opacity-30" : "w-full h-full object-cover group-hover:scale-105"}`}
            loading="lazy"
          />
        </div>
        <div className="p-4">
          <h4 className="font-display font-bold text-lg text-[#2A3A1A] uppercase leading-tight">{name}</h4>
          <div className="flex items-center justify-between mt-2">
            <p className="text-[hsl(var(--primary))] font-bold text-xl">${price}</p>
            <button
              onClick={() => setExpandedCard(isExpanded ? null : item.id)}
              className="text-[hsl(var(--primary))] text-sm font-semibold hover:underline"
            >
              {isExpanded ? (lang === "es" ? "Cerrar" : "Close") : (lang === "es" ? "Ver →" : "View →")}
            </button>
          </div>
          {isExpanded && (
            <div className="mt-3 pt-3 border-t border-gray-100 animate-fade-up">
              {quantity && <p className="text-sm text-[hsl(var(--muted-foreground))] font-medium">{quantity}</p>}
              {description && <p className="text-[hsl(var(--muted-foreground))] text-sm mt-1">{description}</p>}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4">
      <h4 className="font-display font-bold text-lg text-[#2A3A1A]">{name}</h4>
      {quantity && <p className="text-sm text-[hsl(var(--muted-foreground))]">{quantity}</p>}
      {description && <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">{description}</p>}
      <p className="font-bold text-xl text-[hsl(var(--primary))] mt-2">${price}</p>
    </div>
  );
}

function CategoryContent({
  category, allCategories, allItems, lang, expandedCard, setExpandedCard,
}: {
  category: MenuCategory; allCategories: MenuCategory[]; allItems: MenuItem[];
  lang: string; expandedCard: string | null; setExpandedCard: (id: string | null) => void;
}) {
  const children = allCategories
    .filter(c => c.visible && c.parentId === category.id)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const items = allItems
    .filter(i => i.visible && i.categoryId === category.id)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  if (children.length === 0) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(item => (
          <ItemCard key={item.id} item={item} lang={lang} expandedCard={expandedCard} setExpandedCard={setExpandedCard} />
        ))}
      </div>
    );
  }

  if (category.childrenDisplay === "sections") {
    return (
      <>
        {items.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {items.map(item => (
              <ItemCard key={item.id} item={item} lang={lang} expandedCard={expandedCard} setExpandedCard={setExpandedCard} />
            ))}
          </div>
        )}
        {children.map(child => {
          const childItems = allItems.filter(i => i.visible && i.categoryId === child.id).sort((a, b) => a.sortOrder - b.sortOrder);
          if (childItems.length === 0) return null;
          return (
            <div key={child.id} className="mt-10">
              <h4 className="font-display text-2xl font-bold text-[hsl(var(--warm-brown))] text-center mb-6">
                {t(child.name, lang)}
              </h4>
              {child.description.es && (
                <p className="text-[hsl(var(--muted-foreground))] text-center mb-4 max-w-lg mx-auto">{t(child.description, lang)}</p>
              )}
              <CategoryContent
                category={child} allCategories={allCategories} allItems={allItems}
                lang={lang} expandedCard={expandedCard} setExpandedCard={setExpandedCard}
              />
            </div>
          );
        })}
      </>
    );
  }

  return (
    <Tabs defaultValue={children[0]?.id} className="w-full">
      <div className="overflow-x-auto pb-4 -mx-4 px-4">
        <TabsList className="inline-flex p-1 h-auto bg-white rounded-full shadow-sm border border-[hsl(var(--border))] mb-8 gap-1 min-w-max">
          {children.map(child => (
            <TabsTrigger
              key={child.id}
              value={child.id}
              className="text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 data-[state=active]:bg-[hsl(var(--primary))] data-[state=active]:text-white text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
            >
              {t(child.name, lang)}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {items.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {items.map(item => (
            <ItemCard key={item.id} item={item} lang={lang} expandedCard={expandedCard} setExpandedCard={setExpandedCard} />
          ))}
        </div>
      )}
      {children.map(child => (
        <TabsContent key={child.id} value={child.id}>
          <ScrollReveal>
            <div className="text-center mb-6">
              <h3 className="font-display text-3xl font-bold text-[hsl(var(--primary))]">{t(child.name, lang)}</h3>
              {child.description.es && (
                <p className="text-[hsl(var(--muted-foreground))] mt-2 max-w-lg mx-auto">{t(child.description, lang)}</p>
              )}
              {child.note.es && (
                <div className="mt-4 mb-4 max-w-md mx-auto p-4 rounded-xl border-2 border-[hsl(var(--gold))] bg-[hsl(var(--gold))]/10">
                  <p className="text-sm font-semibold text-[hsl(var(--gold))]">{t(child.note, lang)}</p>
                </div>
              )}
            </div>
          </ScrollReveal>
          <CategoryContent
            category={child} allCategories={allCategories} allItems={allItems}
            lang={lang} expandedCard={expandedCard} setExpandedCard={setExpandedCard}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
}

export default function HomeClient({ content }: { content: SiteContent }) {
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [language, setLanguage] = useState("es");
  const [scrolled, setScrolled] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const lang = language;

  const topCategories = content.categories
    .filter(c => c.visible && !c.parentId)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const testimonials: Record<string, Array<{ name: string; rating: number; comment: string; avatar: string }>> = {
    es: [
      { name: "Mariana L.", rating: 5, comment: "Excelente lugar para pasar un buen rato, la comida es deliciosa (recomiendo los tacos de rib eye) y los tragos muy bien preparados. El ambiente es muy agradable.", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026705d" },
      { name: "Fernando S.", rating: 5, comment: "Las promociones son lo mejor, sobre todo los jueves de coctelería doble. El ambiente es relajado y perfecto para ir después de la oficina.", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026705e" },
      { name: "Valeria R.", rating: 5, comment: "Un lugar increíble en la Roma. La terraza es perfecta para una tarde con amigos. La comida tiene muy buen sazón y la carta de bebidas es muy amplia.", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026705f" },
    ],
    en: [
      { name: "Mariana L.", rating: 5, comment: "Excellent place to have a good time, the food is delicious (I recommend the rib eye tacos) and the drinks are very well prepared. Great atmosphere.", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026705d" },
      { name: "Fernando S.", rating: 5, comment: "The promotions are the best, especially the double cocktail Thursdays. The atmosphere is relaxed and perfect to go after the office.", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026705e" },
      { name: "Valeria R.", rating: 5, comment: "An incredible place in Roma. The terrace is perfect for an afternoon with friends. The food is very well seasoned and the drink menu is very extensive.", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026705f" },
    ]
  };

  const navLinks: Record<string, Array<{ href: string; label: string }>> = {
    es: [
      { href: "#galeria", label: "Galería" },
      { href: "#menu", label: "Menú" },
      { href: "#promociones", label: "Promociones" },
      { href: "#reservaciones", label: "Reservaciones" },
      { href: "#ubicacion", label: "Ubicación" },
      { href: "#opiniones", label: "Opiniones" },
    ],
    en: [
      { href: "#galeria", label: "Gallery" },
      { href: "#menu", label: "Menu" },
      { href: "#promociones", label: "Promotions" },
      { href: "#reservaciones", label: "Reservations" },
      { href: "#ubicacion", label: "Location" },
      { href: "#opiniones", label: "Reviews" },
    ]
  };

  const promotions: Record<string, Array<{ title: string; description: string; icon: any; image: string }>> = {
    es: [
      { title: "Cervezas 3x$100", description: "Aprovecha nuestra promoción en cervezas embotelladas de 355ml, 3 por $100. ¡Todos los días!", icon: BottleIcon, image: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=400&h=300&fit=crop" },
      { title: "Happy Hour Godín", description: "Los martes y viernes, muestra tu credencial de trabajo y obtén un 20% de descuento.", icon: Briefcase, image: "https://images.unsplash.com/photo-1575037614876-c38a4c44f5b8?w=400&h=300&fit=crop" },
      { title: "Jueves de Coctelería Doble", description: "Todos los jueves, tu coctel favorito se sirve doble. ¡Aprovecha!", icon: Copy, image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop" },
      { title: "Tríos Bar Jac por $199", description: "De lunes a viernes: Sopa o crema + Hamburguesa o Tacos de Arrachera o Pescadillas con Cóctel Chico + Bebida sin alcohol.", icon: UtensilsCrossed, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop" },
    ],
    en: [
      { title: "Beers 3 for $100", description: "Take advantage of our promotion on 355ml bottled beers, 3 for $100. Every day!", icon: BottleIcon, image: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=400&h=300&fit=crop" },
      { title: "Godín Happy Hour", description: "On Tuesdays and Fridays, show your work ID and get a 20% discount.", icon: Briefcase, image: "https://images.unsplash.com/photo-1575037614876-c38a4c44f5b8?w=400&h=300&fit=crop" },
      { title: "Double Cocktails Thursdays", description: "Every Thursday, your favorite cocktail is served double. Enjoy!", icon: Copy, image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop" },
      { title: "Bar Jac Trios for $199", description: "Monday to Friday: Soup or cream + Burger or Arrachera Tacos or Pescadillas with Small Cocktail + Non-alcoholic drink.", icon: UtensilsCrossed, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop" },
    ]
  };

  return (
    <div className="flex flex-col min-h-screen bg-[hsl(var(--cream))]">
      {/* Header */}
      <header className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "bg-white/95 backdrop-blur shadow-md" : "bg-transparent"
      )}>
        <div className="container flex h-16 md:h-20 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/images/Imagen de WhatsApp 2025-11-25 a las 10.21.55_ff8ad4cb.jpg" alt="BarJac Logo" width={44} height={44} className="rounded-full border-2 border-[hsl(var(--olive))]" />
            <span className="font-display font-bold text-2xl text-[hsl(var(--warm-brown))]">BarJac</span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium">
            {navLinks[lang].map(link => (
              <Link key={link.href} href={link.href} className="text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[hsl(var(--primary))] hover:after:w-full after:transition-all">{link.label}</Link>
            ))}
            <div className="flex gap-2 ml-4">
              <button onClick={() => setLanguage("es")} className={cn("px-3 py-1 rounded-full text-xs font-semibold transition-all", lang === "es" ? "bg-[hsl(var(--primary))] text-white" : "bg-[hsl(var(--muted))] hover:bg-[hsl(var(--border))]")}>ES</button>
              <button onClick={() => setLanguage("en")} className={cn("px-3 py-1 rounded-full text-xs font-semibold transition-all", lang === "en" ? "bg-[hsl(var(--primary))] text-white" : "bg-[hsl(var(--muted))] hover:bg-[hsl(var(--border))]")}>EN</button>
            </div>
          </nav>

          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden text-[hsl(var(--foreground))]">
                <MenuIcon className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-white border-l-[hsl(var(--border))]">
              <div className="flex flex-col space-y-6 p-4 mt-8">
                <Link href="/" className="flex items-center gap-3 mb-4">
                  <Image src="/images/Imagen de WhatsApp 2025-11-25 a las 10.21.55_ff8ad4cb.jpg" alt="BarJac Logo" width={40} height={40} className="rounded-full" />
                  <span className="font-display font-bold text-xl text-[hsl(var(--warm-brown))]">BarJac</span>
                </Link>
                {navLinks[lang].map(link => (
                  <Link key={link.href} href={link.href} onClick={() => setSheetOpen(false)} className="text-lg font-medium text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors">{link.label}</Link>
                ))}
                <div className="flex gap-3 pt-4">
                  <button onClick={() => setLanguage("es")} className={cn("px-4 py-2 rounded-full text-sm font-semibold transition-all", lang === "es" ? "bg-[hsl(var(--primary))] text-white" : "bg-[hsl(var(--muted))]")}>Español</button>
                  <button onClick={() => setLanguage("en")} className={cn("px-4 py-2 rounded-full text-sm font-semibold transition-all", lang === "en" ? "bg-[hsl(var(--primary))] text-white" : "bg-[hsl(var(--muted))]")}>English</button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[100svh] w-full overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=1080&fit=crop"
            alt={lang === "es" ? "Interior de BarJac" : "BarJac Interior"}
            fill
            className="object-cover scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70 flex flex-col items-center justify-center text-center text-white p-6">
            <div className="w-full max-w-lg md:max-w-2xl animate-fade-up">
              <Image src="/images/barjacbien.png" alt="BarJac Logo" width={600} height={96} className="object-contain mx-auto drop-shadow-2xl" />
            </div>
            <p className="mt-4 text-lg md:text-2xl max-w-2xl font-light tracking-wide animate-fade-up stagger-2">{lang === "es" ? "Música, amigos y el mejor ambiente de la ciudad." : "Music, friends and the best atmosphere in the city."}</p>
            <div className="mt-8 flex gap-4 animate-fade-up stagger-3">
              <Button asChild size="lg" className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--olive-light))] text-white font-semibold px-8 rounded-full hover:scale-105 transition-all shadow-lg">
                <Link href="#menu">{lang === "es" ? "Ver Menú" : "View Menu"}</Link>
              </Button>
              <Button asChild size="lg" className="bg-white text-[hsl(var(--warm-brown))] hover:bg-white/90 font-semibold px-8 rounded-full hover:scale-105 transition-all shadow-lg">
                <a href="https://wa.me/525636363018" target="_blank" rel="noopener noreferrer">{lang === "es" ? "Reservar" : "Book"}</a>
              </Button>
            </div>
            <div className="absolute bottom-8 animate-bounce">
              <ChevronDown className="h-8 w-8 text-white/70" />
            </div>
          </div>
        </section>

        {/* Instagram-Style Gallery */}
        <section id="galeria" className="py-16 md:py-24 bg-white">
          <div className="container px-4">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="font-display text-4xl md:text-5xl font-bold text-[hsl(var(--warm-brown))]">{lang === "es" ? "Nuestra Experiencia" : "Our Experience"}</h2>
                <p className="mt-3 text-[hsl(var(--muted-foreground))] max-w-lg mx-auto">{lang === "es" ? "Cada platillo, cada momento, una experiencia única." : "Every dish, every moment, a unique experience."}</p>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 max-w-5xl mx-auto">
              {foodImages.map((src, i) => (
                <ScrollReveal key={i} delay={i * 80}>
                  <div className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer">
                    <Image src={src} alt={`BarJac platillo ${i + 1}`} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                      <Instagram className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal delay={600}>
              <div className="text-center mt-8">
                <Button asChild variant="outline" className="rounded-full border-[hsl(var(--primary))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-white transition-all">
                  <a href="https://www.instagram.com/barjac_cdmx/" target="_blank" rel="noopener noreferrer">
                    <Instagram className="mr-2 h-4 w-4" />
                    @barjac_cdmx
                  </a>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Menu Section — Dynamic from Database */}
        <section id="menu" className="py-16 md:py-24 bg-[hsl(var(--cream))]">
          <div className="container px-4">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="font-display text-4xl md:text-5xl font-bold text-[hsl(var(--warm-brown))]">{lang === "es" ? "Nuestro Menú" : "Our Menu"}</h2>
                <div className="w-24 h-1 bg-[hsl(var(--primary))] mx-auto mt-4 rounded-full"></div>
              </div>
            </ScrollReveal>

            {topCategories.length > 0 && (
              <Tabs defaultValue={topCategories[0].id} className="w-full">
                <div className="overflow-x-auto pb-4 -mx-4 px-4">
                  <TabsList className="inline-flex p-1 h-auto bg-white rounded-full shadow-sm border border-[hsl(var(--border))] mb-8 gap-1 min-w-max">
                    {topCategories.map(cat => (
                      <TabsTrigger
                        key={cat.id}
                        value={cat.id}
                        className={cn(
                          "text-sm md:text-base font-medium px-4 py-2 rounded-full transition-all duration-300",
                          "data-[state=active]:bg-[hsl(var(--primary))] data-[state=active]:text-white data-[state=active]:shadow-sm",
                          "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                        )}
                      >
                        {t(cat.name, lang)}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
                {topCategories.map(cat => (
                  <TabsContent key={cat.id} value={cat.id}>
                    <ScrollReveal>
                      <div className="text-center mb-8">
                        <h3 className="font-display text-3xl md:text-4xl font-bold text-[hsl(var(--primary))]">{t(cat.name, lang)}</h3>
                        {cat.description.es && (
                          <p className="text-[hsl(var(--muted-foreground))] mt-2 max-w-lg mx-auto">{t(cat.description, lang)}</p>
                        )}
                        {cat.note.es && (
                          <div className="mt-4 max-w-md mx-auto p-4 rounded-xl border-2 border-[hsl(var(--gold))] bg-[hsl(var(--gold))]/10">
                            <p className="text-sm font-semibold text-[hsl(var(--gold))]">{t(cat.note, lang)}</p>
                          </div>
                        )}
                      </div>
                    </ScrollReveal>
                    <CategoryContent
                      category={cat}
                      allCategories={content.categories}
                      allItems={content.items}
                      lang={lang}
                      expandedCard={expandedCard}
                      setExpandedCard={setExpandedCard}
                    />
                  </TabsContent>
                ))}
              </Tabs>
            )}
          </div>
        </section>

        {/* Promociones Section */}
        <section id="promociones" className="py-16 md:py-24 bg-[hsl(var(--primary))]">
          <div className="container px-4">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="font-display text-4xl md:text-5xl font-bold text-white">{lang === "es" ? "Promociones" : "Promotions"}</h2>
                <div className="w-24 h-1 bg-white/50 mx-auto mt-4 rounded-full"></div>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {promotions[lang].map((promo, index) => (
                <ScrollReveal key={index} delay={index * 150}>
                  <Card className="overflow-hidden bg-white/10 backdrop-blur border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:-translate-y-1">
                    <div className="relative h-48 overflow-hidden">
                      <Image src={promo.image} alt={promo.title} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <h3 className="absolute bottom-4 left-4 right-4 font-display text-xl font-bold drop-shadow-lg">{promo.title}</h3>
                    </div>
                    <CardContent className="pt-4">
                      <p className="text-sm text-white/80">{promo.description}</p>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Reservaciones */}
        <section id="reservaciones" className="py-16 md:py-24 bg-white">
          <div className="container px-4">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="font-display text-4xl md:text-5xl font-bold text-[hsl(var(--warm-brown))]">{lang === "es" ? "Reservaciones" : "Reservations"}</h2>
                <div className="w-24 h-1 bg-[hsl(var(--primary))] mx-auto mt-4 rounded-full"></div>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <ScrollReveal delay={100}>
                <Card className="p-8 bg-[hsl(var(--cream))] border-[hsl(var(--border))] hover:shadow-lg transition-shadow">
                  <h3 className="font-display text-2xl font-bold text-[hsl(var(--warm-brown))] mb-4">{lang === "es" ? "Reserva tu mesa" : "Reserve your table"}</h3>
                  <p className="text-[hsl(var(--muted-foreground))] mb-6">{lang === "es" ? "Asegura tu lugar y vive la experiencia BarJac. Contáctanos para grupos y eventos especiales." : "Secure your spot and live the BarJac experience. Contact us for groups and special events."}</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold hover:scale-105 transition-all">
                      <a href="https://wa.me/525636363018" target="_blank" rel="noopener noreferrer">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mr-2 h-5 w-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.613.613l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.387 0-4.607-.798-6.378-2.143l-.446-.35-3.155 1.058 1.058-3.155-.35-.446A9.96 9.96 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
                        WhatsApp
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="rounded-full border-[hsl(var(--primary))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-white transition-all">
                      <a href="tel:+525636363018"><Phone className="mr-2 h-5 w-5" />{lang === "es" ? "Llamar" : "Call"}</a>
                    </Button>
                  </div>
                </Card>
              </ScrollReveal>
              <ScrollReveal delay={250}>
                <Card className="p-8 bg-[hsl(var(--cream))] border-[hsl(var(--border))] hover:shadow-lg transition-shadow">
                  <h3 className="font-display text-2xl font-bold text-[hsl(var(--warm-brown))] mb-4">{lang === "es" ? "Próximamente a domicilio" : "Delivery coming soon"}</h3>
                  <p className="text-[hsl(var(--muted-foreground))] mb-6">{lang === "es" ? "Disfruta de nuestros platillos y bebidas en la comodidad de tu casa." : "Enjoy our dishes and drinks in the comfort of your home."}</p>
                  <div className="flex justify-center items-center gap-6">
                    <Image src="/images/DIDI.jpg" alt="Didi Food" width={60} height={60} className="rounded-lg shadow-sm" />
                    <Image src="/images/UBER.jpg" alt="Uber Eats" width={60} height={60} className="rounded-lg shadow-sm" />
                  </div>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Opiniones */}
        <section id="opiniones" className="py-16 md:py-24 bg-[hsl(var(--cream))]">
          <div className="container px-4">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="font-display text-4xl md:text-5xl font-bold text-[hsl(var(--warm-brown))]">{lang === "es" ? "Lo que dicen nuestros clientes" : "What our customers say"}</h2>
                <div className="w-24 h-1 bg-[hsl(var(--primary))] mx-auto mt-4 rounded-full"></div>
              </div>
            </ScrollReveal>
            <Carousel opts={{ align: "start", loop: true }} plugins={[Autoplay({ delay: 5000 })]} className="w-full max-w-4xl mx-auto">
              <CarouselContent>
                {testimonials[lang].map((testimonial, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-2">
                      <Card className="bg-white border-[hsl(var(--border))] hover:shadow-lg transition-shadow">
                        <CardContent className="flex flex-col items-center text-center p-6">
                          <Avatar className="mb-4 h-16 w-16 border-2 border-[hsl(var(--primary))]">
                            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                            <AvatarFallback className="bg-[hsl(var(--primary))] text-white">{testimonial.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <h4 className="font-semibold text-[hsl(var(--warm-brown))]">{testimonial.name}</h4>
                          <div className="my-2"><StarRating rating={testimonial.rating} /></div>
                          <p className="text-sm text-[hsl(var(--muted-foreground))]">&quot;{testimonial.comment}&quot;</p>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <ScrollReveal>
              <div className="mt-8 text-center">
                <Button asChild variant="outline" className="rounded-full border-[hsl(var(--primary))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-white transition-all">
                  <a href="https://maps.app.goo.gl/oRUrpHz1dkJy52SWA?g_st=aw" target="_blank" rel="noopener noreferrer">
                    <Star className="mr-2 h-4 w-4" />{lang === "es" ? "Escribe una reseña" : "Write a review"}
                  </a>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Ubicación */}
        <section id="ubicacion" className="py-16 md:py-24 bg-white">
          <div className="container px-4">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="font-display text-4xl md:text-5xl font-bold text-[hsl(var(--warm-brown))]">{lang === "es" ? "Encuéntranos" : "Find Us"}</h2>
                <div className="w-24 h-1 bg-[hsl(var(--primary))] mx-auto mt-4 rounded-full"></div>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-center">
              <ScrollReveal>
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.900451683412!2d-99.1659298!3d19.4168177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff001e0dc5b9%3A0xfdcd63bfe41952d9!2sBarJac!5e0!3m2!1ses-419!2smx!4v1700000000000!5m2!1ses-419!2smx"
                    width="100%" height="100%" style={{ border: 0 }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 w-full h-full"
                  ></iframe>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[hsl(var(--primary))]/10 rounded-full"><MapPin className="h-6 w-6 text-[hsl(var(--primary))]" /></div>
                    <div>
                      <h3 className="text-lg font-semibold text-[hsl(var(--warm-brown))]">{lang === "es" ? "Dirección" : "Address"}</h3>
                      <p className="text-[hsl(var(--muted-foreground))]">Álvaro Obregón 234, Cuauhtémoc, C.P 06700, Esq. Medellín y Av. Yucatán, CDMX</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[hsl(var(--primary))]/10 rounded-full"><Phone className="h-6 w-6 text-[hsl(var(--primary))]" /></div>
                    <div>
                      <h3 className="text-lg font-semibold text-[hsl(var(--warm-brown))]">{lang === "es" ? "Teléfono" : "Phone"}</h3>
                      <p className="text-[hsl(var(--muted-foreground))]">56 3636 3018</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[hsl(var(--primary))]/10 rounded-full"><Instagram className="h-6 w-6 text-[hsl(var(--primary))]" /></div>
                    <div>
                      <h3 className="text-lg font-semibold text-[hsl(var(--warm-brown))]">Instagram</h3>
                      <a href="https://www.instagram.com/barjac_cdmx/" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--primary))] hover:underline">@barjac_cdmx</a>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Contacto */}
        <section id="contacto" className="py-16 md:py-24 bg-gradient-to-b from-[#3D4F27] to-[#2A3A1A]">
          <div className="container px-4">
            <ScrollReveal>
              <div className="text-center mb-10">
                <h2 className="font-display text-4xl md:text-5xl font-bold text-white">{lang === "es" ? "Contacto" : "Contact"}</h2>
                <div className="w-24 h-1 bg-[hsl(var(--gold))] mx-auto mt-4 rounded-full"></div>
                <p className="mt-4 text-white/70 max-w-lg mx-auto">{lang === "es" ? "Escríbenos, síguenos o visítanos. ¡Te esperamos!" : "Write us, follow us or visit us. We're waiting for you!"}</p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto items-center">
              <ScrollReveal>
                <div className="space-y-3">
                  {[
                    { label: lang === "es" ? "Ver Menú" : "View Menu", href: "#menu", icon: <UtensilsCrossed className="h-6 w-6 flex-shrink-0" />, color: "bg-[#5C6B3C]", hover: "hover:bg-[#4A5D23]" },
                    { label: "WhatsApp", href: "https://wa.me/525636363018", icon: <Phone className="h-6 w-6 flex-shrink-0" />, color: "bg-[#25D366]", hover: "hover:bg-[#1DA851]" },
                    { label: "Instagram", href: "https://www.instagram.com/barjac_cdmx/", icon: <Instagram className="h-6 w-6 flex-shrink-0" />, color: "bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737]", hover: "hover:opacity-90" },
                    { label: "TikTok", href: "https://www.tiktok.com/@barjacmexico", icon: <TiktokIcon className="h-6 w-6 flex-shrink-0" />, color: "bg-black", hover: "hover:bg-gray-900" },
                    { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61584743632789&locale=es_LA", icon: <Facebook className="h-6 w-6 flex-shrink-0" />, color: "bg-[#1877F2]", hover: "hover:bg-[#166FE5]" },
                    { label: "Google Maps", href: "https://maps.app.goo.gl/oRUrpHz1dkJy52SWA?g_st=aw", icon: <MapPin className="h-6 w-6 flex-shrink-0" />, color: "bg-[#EA4335]", hover: "hover:bg-[#D33426]" },
                    { label: lang === "es" ? "Llamar" : "Call", href: "tel:+525636363018", icon: <Phone className="h-6 w-6 flex-shrink-0" />, color: "bg-[#5C6B3C]", hover: "hover:bg-[#4A5D23]" },
                  ].map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      target={link.href.startsWith("http") || link.href.startsWith("tel:") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-white font-semibold text-lg ${link.color} ${link.hover} transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl`}
                    >
                      {link.icon}
                      <span className="flex-1 text-center">{link.label}</span>
                    </a>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <div className="flex flex-col items-center">
                  <div className="bg-white rounded-3xl p-6 shadow-2xl">
                    <h3 className="font-display text-2xl font-bold text-[#2A3A1A] text-center mb-2">{lang === "es" ? "ESCANÉAME" : "SCAN ME"}</h3>
                    <p className="text-[#6B7B5C] text-sm mb-4 text-center">
                      {lang === "es" ? "Menú · WhatsApp · Redes · Ubicación" : "Menu · WhatsApp · Social · Location"}
                    </p>
                    <div className="bg-[#FAF7F2] p-4 rounded-2xl shadow-inner">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=${encodeURIComponent("https://barjac.web.app/links")}&bgcolor=FAF7F2&color=2A3A1A&margin=20`}
                        alt="QR Code - BarJac Links"
                        width={240}
                        height={240}
                        className="rounded-xl"
                      />
                    </div>
                    <p className="text-[#6B7B5C] text-xs mt-3 text-center">barjac.web.app/links</p>
                  </div>
                  <p className="text-white/50 text-xs mt-4 text-center">Álvaro Obregón 234, Roma Norte, CDMX</p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[hsl(var(--warm-brown))] text-white">
        <div className="container py-10 px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="flex items-center gap-3">
              <Image src="/images/Imagen de WhatsApp 2025-11-25 a las 10.21.55_ff8ad4cb.jpg" alt="BarJac Logo" width={48} height={48} className="rounded-full border-2 border-white/30" />
              <span className="font-display font-bold text-2xl">BarJac</span>
            </div>
            <div className="text-center text-sm text-white/70">
              <p>Álvaro Obregón 234, Roma Norte, CDMX</p>
              <p className="mt-1">56 3636 3018</p>
            </div>
            <div className="flex justify-center md:justify-end space-x-3">
              <Button variant="ghost" size="icon" asChild className="text-white/80 hover:text-white hover:bg-white/10 rounded-full">
                <a href="https://www.facebook.com/profile.php?id=61584743632789&locale=es_LA" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><Facebook className="h-5 w-5" /></a>
              </Button>
              <Button variant="ghost" size="icon" asChild className="text-white/80 hover:text-white hover:bg-white/10 rounded-full">
                <a href="https://www.instagram.com/barjac_cdmx/" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><Instagram className="h-5 w-5" /></a>
              </Button>
              <Button variant="ghost" size="icon" asChild className="text-white/80 hover:text-white hover:bg-white/10 rounded-full">
                <a href="https://www.tiktok.com/@barjacmexico" aria-label="TikTok" target="_blank" rel="noopener noreferrer"><TiktokIcon className="h-5 w-5" /></a>
              </Button>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-6 text-center text-xs text-white/50">
            <p>&copy; {new Date().getFullYear()} BarJac. {lang === "es" ? "Todos los derechos reservados." : "All rights reserved."}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
