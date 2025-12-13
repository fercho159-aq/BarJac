
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Facebook, Instagram, Phone, Star, MapPin, Menu as MenuIcon, Briefcase, Copy, UtensilsCrossed, PartyPopper } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { 
    breakfastItems, entranceItems,
    cutsItems, saladItems, seafoodItems, tacoItems, burgerItems,
    snackItems, sodaItems, beerItems, preparadosItems,
    ginebraItems, vodkaItems, tequilaItems, mezcalItems, ronItems, whiskyItems, cognacItems, brandyItems, licorItems 
} from "@/lib/menu-data";
import { 
    breakfastItemsEn, entranceItemsEn,
    cutsItemsEn, saladItemsEn, seafoodItemsEn, tacoItemsEn, burgerItemsEn,
    snackItemsEn, sodaItemsEn, beerItemsEn, preparadosItemsEn,
    ginebraItemsEn, vodkaItemsEn, tequilaItemsEn, mezcalItemsEn, ronItemsEn, whiskyItemsEn, cognacItemsEn, brandyItemsEn, licorItemsEn
} from "@/lib/menu-data-en";

import { TiktokIcon } from "@/components/icons/tiktok-icon";
import { BottleIcon } from "@/components/icons/bottle-icon";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className={`h-5 w-5 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-500"}`} />
    ))}
  </div>
);


export default function Home() {
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("desayunos");
  const [language, setLanguage] = useState("es");

  const menuColors: { [key: string]: string } = {
    desayunos: "text-[hsl(var(--neon-blue))] shadow-[0_0_10px_hsl(var(--neon-blue))] border-[hsl(var(--neon-blue))] data-[state=active]:bg-[hsl(var(--neon-blue))]/10 data-[state=active]:border-[hsl(var(--neon-blue))]",
    entradas: "text-[hsl(var(--neon-green))] shadow-[0_0_10px_hsl(var(--neon-green))] border-[hsl(var(--neon-green))] data-[state=active]:bg-[hsl(var(--neon-green))]/10 data-[state=active]:border-[hsl(var(--neon-green))]",
    cortes: "text-[hsl(var(--neon-yellow))] shadow-[0_0_10px_hsl(var(--neon-yellow))] border-[hsl(var(--neon-yellow))] data-[state=active]:bg-[hsl(var(--neon-yellow))]/10 data-[state=active]:border-[hsl(var(--neon-yellow))]",
    ensaladas: "text-[hsl(var(--neon-orange))] shadow-[0_0_10px_hsl(var(--neon-orange))] border-[hsl(var(--neon-orange))] data-[state=active]:bg-[hsl(var(--neon-orange))]/10 data-[state=active]:border-[hsl(var(--neon-orange))]",
    mariscos: "text-[hsl(var(--neon-magenta))] shadow-[0_0_10px_hsl(var(--neon-magenta))] border-[hsl(var(--neon-magenta))] data-[state=active]:bg-[hsl(var(--neon-magenta))]/10 data-[state=active]:border-[hsl(var(--neon-magenta))]",
    taco: "text-[hsl(var(--neon-red))] shadow-[0_0_10px_hsl(var(--neon-red))] border-[hsl(var(--neon-red))] data-[state=active]:bg-[hsl(var(--neon-red))]/10 data-[state=active]:border-[hsl(var(--neon-red))]",
    hamburguesas: "text-[hsl(var(--neon-cyan))] shadow-[0_0_10px_hsl(var(--neon-cyan))] border-[hsl(var(--neon-cyan))] data-[state=active]:bg-[hsl(var(--neon-cyan))]/10 data-[state=active]:border-[hsl(var(--neon-cyan))]",
    snacks: "text-[hsl(var(--neon-orange))] shadow-[0_0_10px_hsl(var(--neon-orange))] border-[hsl(var(--neon-orange))] data-[state=active]:bg-[hsl(var(--neon-orange))]/10 data-[state=active]:border-[hsl(var(--neon-orange))]",
    
    // Bebidas main category
    bebidas: "text-[hsl(var(--neon-gray))] shadow-[0_0_10px_hsl(var(--neon-gray))] border-[hsl(var(--neon-gray))] data-[state=active]:bg-[hsl(var(--neon-gray))]/10 data-[state=active]:border-[hsl(var(--neon-gray))]",
    // Sub-bebidas
    refrescos: "text-[hsl(var(--neon-magenta))] shadow-[0_0_10px_hsl(var(--neon-magenta))] border-[hsl(var(--neon-magenta))] data-[state=active]:bg-[hsl(var(--neon-magenta))]/10 data-[state=active]:border-[hsl(var(--neon-magenta))]",
    cerveza: "text-[hsl(var(--neon-red))] shadow-[0_0_10px_hsl(var(--neon-red))] border-[hsl(var(--neon-red))] data-[state=active]:bg-[hsl(var(--neon-red))]/10 data-[state=active]:border-[hsl(var(--neon-red))]",
    preparados: "text-[hsl(var(--neon-violet))] shadow-[0_0_10px_hsl(var(--neon-violet))] border-[hsl(var(--neon-violet))] data-[state=active]:bg-[hsl(var(--neon-violet))]/10 data-[state=active]:border-[hsl(var(--neon-violet))]",
    cocteleria: "text-[hsl(var(--neon-blue))] shadow-[0_0_10px_hsl(var(--neon-blue))] border-[hsl(var(--neon-blue))] data-[state=active]:bg-[hsl(var(--neon-blue))]/10 data-[state=active]:border-[hsl(var(--neon-blue))]",
    
    // Cocteleria tabs
    ginebra: "text-blue-400 shadow-[0_0_10px_#60a5fa] border-blue-400 data-[state=active]:bg-blue-400/10 data-[state=active]:border-blue-400",
    vodka: "text-purple-400 shadow-[0_0_10px_#c084fc] border-purple-400 data-[state=active]:bg-purple-400/10 data-[state=active]:border-purple-400",
    tequila: "text-amber-400 shadow-[0_0_10px_#fbbf24] border-amber-400 data-[state=active]:bg-amber-400/10 data-[state=active]:border-amber-400",
    mezcal: "text-lime-400 shadow-[0_0_10px_#a3e635] border-lime-400 data-[state=active]:bg-lime-400/10 data-[state=active]:border-lime-400",
    ron: "text-orange-400 shadow-[0_0_10px_#fb923c] border-orange-400 data-[state=active]:bg-orange-400/10 data-[state=active]:border-orange-400",
    whisky: "text-yellow-600 shadow-[0_0_10px_#d97706] border-yellow-600 data-[state=active]:bg-yellow-600/10 data-[state=active]:border-yellow-600",
    cognac: "text-red-500 shadow-[0_0_10px_#ef4444] border-red-500 data-[state=active]:bg-red-500/10 data-[state=active]:border-red-500",
    brandy: "text-rose-500 shadow-[0_0_10px_#f43f5e] border-rose-500 data-[state=active]:bg-rose-500/10 data-[state=active]:border-rose-500",
    licor: "text-pink-500 shadow-[0_0_10px_#ec4899] border-pink-500 data-[state=active]:bg-pink-500/10 data-[state=active]:border-pink-500"
  };
  
  const menuCategories: { [key: string]: string } = {
    es: {
      desayunos: "Desayunos",
      entradas: "Entradas",
      cortes: "Cortes",
      ensaladas: "Ensaladas",
      mariscos: "Mariscos",
      taco: "Taco",
      hamburguesas: "Hamburguesas",
      snacks: "Snacks",
      bebidas: "Bebidas",
    },
    en: {
      desayunos: "Breakfast",
      entradas: "Appetizers",
      cortes: "Cuts",
      ensaladas: "Salads",
      mariscos: "Seafood",
      taco: "Taco",
      hamburguesas: "Burgers",
      snacks: "Snacks",
      bebidas: "Drinks",
    }
  };

  const bebidasSubCategories = {
    es: {
      refrescos: "Refrescos",
      cerveza: "Cerveza",
      preparados: "Preparados",
      cocteleria: "Coctelería"
    },
    en: {
      refrescos: "Sodas",
      cerveza: "Beer",
      preparados: "Preparados",
      cocteleria: "Cocktails"
    }
  };

  const drinkCategories = {
    es: {
      ginebra: "Ginebra",
      vodka: "Vodka",
      tequila: "Tequila",
      mezcal: "Mezcal",
      ron: "Ron",
      whisky: "Whisky",
      coñac: "Coñac",
      brandy: "Brandy",
      licor: "Licor",
    },
    en: {
      ginebra: "Gin",
      vodka: "Vodka",
      tequila: "Tequila",
      mezcal: "Mezcal",
      ron: "Rum",
      whisky: "Whisky",
      cognac: "Cognac",
      brandy: "Brandy",
      licor: "Liqueur",
    }
  }


  const getPriceClassName = (tab: string) => {
    switch (tab) {
      case 'desayunos': return 'text-[hsl(var(--neon-blue))]';
      case 'entradas': return 'text-[hsl(var(--neon-green))]';
      case 'cortes': return 'text-[hsl(var(--neon-yellow))]';
      case 'ensaladas': return 'text-[hsl(var(--neon-orange))]';
      case 'mariscos': return 'text-[hsl(var(--neon-magenta))]';
      case 'taco': return 'text-[hsl(var(--neon-red))]';
      case 'hamburguesas': return 'text-[hsl(var(--neon-cyan))]';
      case 'snacks': return 'text-[hsl(var(--neon-orange))]';
      case 'bebidas': return 'text-[hsl(var(--neon-gray))]';
      case 'refrescos': return 'text-[hsl(var(--neon-magenta))]';
      case 'cerveza': return 'text-[hsl(var(--neon-red))]';
      case 'preparados': return 'text-[hsl(var(--neon-violet))]';
      case 'cocteleria': return 'text-[hsl(var(--neon-blue))]';
      case 'ginebra': return 'text-blue-400';
      case 'vodka': return 'text-purple-400';
      case 'tequila': return 'text-amber-400';
      case 'mezcal': return 'text-lime-400';
      case 'ron': return 'text-orange-400';
      case 'whisky': return 'text-yellow-600';
      case 'coñac': return 'text-red-500';
      case 'brandy': return 'text-rose-500';
      case 'licor': return 'text-pink-500';
      default: return 'text-primary';
    }
  };
  
  const testimonials = {
    es: [
      { name: "Carlos M.", rating: 5, comment: "¡El ambiente es increíble y la comida deliciosa! Los chilaquiles son los mejores que he probado.", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },
      { name: "Ana P.", rating: 4, comment: "Muy buen lugar para ir con amigos. La música en vivo le da un toque especial. Las micheladas son un must.", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704e" },
      { name: "Javier G.", rating: 5, comment: "Excelente servicio y la coctelería es de primer nivel. Recomiendo el 'Old Fashioned'. Volveré pronto.", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704f" },
      { name: "Sofia R.", rating: 5, comment: "Me encantó la terraza. Es el lugar perfecto para una tarde de sábado. ¡Las promos están geniales!", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704g" },
    ],
    en: [
      { name: "Carlos M.", rating: 5, comment: "The atmosphere is incredible and the food is delicious! The chilaquiles are the best I've ever had.", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },
      { name: "Ana P.", rating: 4, comment: "Very good place to go with friends. The live music gives it a special touch. The micheladas are a must.", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704e" },
      { name: "Javier G.", rating: 5, comment: "Excellent service and the cocktails are top-notch. I recommend the 'Old Fashioned'. I'll be back soon.", avatar: "https://i.pravatar.cc/150?u=a_042581f4e29026704f" },
      { name: "Sofia R.", rating: 5, comment: "I loved the terrace. It's the perfect place for a Saturday afternoon. The promos are great!", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704g" },
    ]
  };

  const navLinks = {
    es: [
      { href: "#menu", label: "Menú" },
      { href: "#promociones", label: "Promociones" },
      { href: "#reservaciones", label: "Reservaciones" },
      { href: "#ubicacion", label: "Ubicación" },
      { href: "#opiniones", label: "Opiniones" },
    ],
    en: [
      { href: "#menu", label: "Menu" },
      { href: "#promociones", label: "Promotions" },
      { href: "#reservaciones", label: "Reservations" },
      { href: "#ubicacion", label: "Location" },
      { href: "#opiniones", label: "Reviews" },
    ]
  };

  const promotions = {
    es: [
      { 
        title: "Lunes y Miércoles de “Embotellados”", 
        description: "Todas nuestras cervezas embotelladas 3 x $100.", 
        icon: BottleIcon,
        color: "blue"
      },
      { 
        title: "Martes y Viernes “Happy Hour Godin”", 
        description: "Para oficinistas de la zona, si nos muestran su credencial de trabajo obtienen un 20% de consumo en su siguiente visita, siempre y cuando regresen en “Happy Hour Godin” del mismo mes de su consumo.", 
        icon: Briefcase,
        color: "green"
      },
      { 
        title: "Jueves “Veo doble”", 
        description: "Toda nuestra coctelería se sirve doble.", 
        icon: Copy,
        color: "yellow"
      },
      { 
        title: "Trios Bar Jac de Lunes a Viernes", 
        description: "$199.00: Sopa o crema del día, Hamburguesa Clásica o 3 tacos (arrachera, pechuga, aguja o combinados) o pescadilla y Bebida sin alcohol (naranjada, limonada o refresco).", 
        icon: UtensilsCrossed,
        color: "orange"
      }
    ],
    en: [
      { 
        title: "Monday & Wednesday \"Bottled\" Days", 
        description: "All our bottled beers 3 for $100.", 
        icon: BottleIcon,
        color: "blue"
      },
      { 
        title: "Tuesday & Friday \"Godin Happy Hour\"", 
        description: "For office workers in the area, if you show us your work ID, you get a 20% discount on your next visit, as long as you return during \"Godin Happy Hour\" in the same month.", 
        icon: Briefcase,
        color: "green"
      },
      { 
        title: "Thursday \"Seeing Double\"", 
        description: "All our cocktails are served double.", 
        icon: Copy,
        color: "yellow"
      },
      { 
        title: "Bar Jac Trios Monday to Friday", 
        description: "$199.00: Soup or cream of the day, Classic Burger or 3 tacos (arrachera, chicken, aguja or combined) or pescadilla and a non-alcoholic drink (orangeade, lemonade or soda).", 
        icon: UtensilsCrossed,
        color: "orange"
      }
    ]
  };

  const currentBreakfastItems = language === 'es' ? breakfastItems : breakfastItemsEn;
  const currentEntranceItems = language === 'es' ? entranceItems : entranceItemsEn;
  const currentSnackItems = language === 'es' ? snackItems : snackItemsEn;
  const currentSodaItems = language === 'es' ? sodaItems : sodaItemsEn;
  const currentBeerItems = language === 'es' ? beerItems : beerItemsEn;
  const currentPreparadosItems = language === 'es' ? preparadosItems : preparadosItemsEn;

  const currentCutsItems = language === 'es' ? cutsItems : cutsItemsEn;
  const currentSaladItems = language === 'es' ? saladItems : saladItemsEn;
  const currentSeafoodItems = language === 'es' ? seafoodItems : seafoodItemsEn;
  const currentTacoItems = language === 'es' ? tacoItems : tacoItemsEn;
  const currentBurgerItems = language === 'es' ? burgerItems : burgerItemsEn;

  const currentGinebraItems = language === 'es' ? ginebraItems : ginebraItemsEn;
  const currentVodkaItems = language === 'es' ? vodkaItems : vodkaItemsEn;
  const currentTequilaItems = language === 'es' ? tequilaItems : tequilaItemsEn;
  const currentMezcalItems = language === 'es' ? mezcalItems : mezcalItemsEn;
  const currentRonItems = language === 'es' ? ronItems : ronItemsEn;
  const currentWhiskyItems = language === 'es' ? whiskyItems : whiskyItemsEn;
  const currentCognacItems = language === 'es' ? cognacItems : cognacItemsEn;
  const currentBrandyItems = language === 'es' ? brandyItems : brandyItemsEn;
  const currentLicorItems = language === 'es' ? licorItems : licorItemsEn;


  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-[hsl(var(--neon-yellow))]/30 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
             <Image src="/images/Imagen de WhatsApp 2025-11-25 a las 10.21.55_ff8ad4cb.jpg" alt="BarJac Logo" width={40} height={40} className="rounded-full neon-border" data-ai-hint="bar logo" />
            <span className="font-orbitron font-bold text-xl neon-text" style={{ textShadow: '0 0 5px hsl(var(--primary)), 0 0 10px hsl(var(--primary)), 0 0 20px #000' }}>BarJac</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navLinks[language as keyof typeof navLinks].map(link => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-primary font-bold">{link.label}</Link>
            ))}
          </nav>
          
          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-primary hover:bg-primary/20">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">{language === 'es' ? 'Abrir menú' : 'Open menu'}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background">
              <div className="flex flex-col space-y-4 p-4">
                 <Link href="/" className="flex items-center gap-3 mb-4">
                    <Image src="/images/Imagen de WhatsApp 2025-11-25 a las 10.21.55_ff8ad4cb.jpg" alt="BarJac Logo" width={40} height={40} className="rounded-full neon-border" data-ai-hint="bar logo"/>
                    <span className="font-orbitron font-bold text-xl neon-text">BarJac</span>
                </Link>
                {navLinks[language as keyof typeof navLinks].map(link => (
                  <Link key={link.href} href={link.href} onClick={() => setSheetOpen(false)} className="text-lg transition-colors hover:text-primary">{link.label}</Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[70vh] w-full">
          <Image
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2000&auto=format&fit=crop"
            alt={language === 'es' ? "Interior de BarJac" : "BarJac Interior"}
            fill
            className="object-cover"
            data-ai-hint="bar interior"
            priority
          />
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-center text-white p-4">
            <div className="w-full max-w-lg md:max-w-2xl lg:max-w-4xl">
              <Image src="/images/barjacbien.png" alt="BarJac Logo" width={800} height={127} className="neon-text object-contain mx-auto"/>
            </div>
            <p className="mt-0 text-lg md:text-xl max-w-2xl" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>{language === 'es' ? 'Música, amigos y el mejor ambiente de la ciudad.' : 'Music, friends and the best atmosphere in the city.'}</p>
            <div className="mt-8 flex gap-4">
              <Button asChild className="font-bold neon-border hover:bg-primary/90 hover:scale-105 transition-all">
                  <Link href="#menu" onClick={() => setLanguage('es')}>Ver Menú</Link>
              </Button>
              <Button asChild className="font-bold neon-border hover:bg-primary/90 hover:scale-105 transition-all">
                  <Link href="#menu" onClick={() => setLanguage('en')}>View Menu</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Menu Section */}
        <section id="menu" className="py-16 md:py-24">
          <div className="container">
            <h2 className="text-5xl font-bold text-center mb-12 font-orbitron neon-text">{language === 'es' ? 'Nuestro Menú' : 'Our Menu'}</h2>
            <Tabs defaultValue="desayunos" className="w-full" onValueChange={setActiveTab} value={activeTab}>
            <TabsList className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 p-1 h-auto bg-transparent justify-center mb-8 gap-3">
              {Object.keys(menuCategories[language as keyof typeof menuCategories]).map((tab) => (
                <TabsTrigger 
                  key={tab} 
                  value={tab} 
                  className={cn(
                    "text-base md:text-lg font-bold px-3 py-2 border-2 rounded-full transition-all duration-300",
                    activeTab === tab 
                      ? menuColors[tab] + ' bg-opacity-10'
                      : 'border-transparent text-muted-foreground hover:text-white'
                  )}
                >
                  {menuCategories[language as keyof typeof menuCategories][tab as keyof typeof menuCategories.es]}
                </TabsTrigger>
              ))}
              </TabsList>
              
              <TabsContent value="desayunos">
                <div className="text-center mb-6">
                  <h3 className={cn("text-4xl font-bold font-orbitron", getPriceClassName('desayunos'))}>{menuCategories[language as keyof typeof menuCategories].desayunos}</h3>
                  <p className="text-muted-foreground">{language === 'es' ? 'En paquete te incluimos café, fruta o jugo.' : 'In a package we include coffee, fruit or juice.'}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentBreakfastItems.map((item, index) => (
                    <Card key={index} className="bg-secondary border-primary/20">
                      <CardHeader>
                        <CardTitle>{item.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{item.quantity}</p>
                        <p className="text-muted-foreground mb-2 text-sm">{item.accompaniment}</p>
                        <div className="flex justify-between items-center mt-4">
                          <div>
                            <p className="font-semibold">{language === 'es' ? 'Normal:' : 'Normal:'}</p>
                            <p className={cn("font-bold text-lg", getPriceClassName('desayunos'))}>${item.priceNormal}</p>
                          </div>
                          <div>
                            <p className="font-semibold">{language === 'es' ? 'Paquete:' : 'Package:'}</p>
                            <p className={cn("font-bold text-lg", getPriceClassName('desayunos'))}>${item.pricePackage}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="entradas">
                 <div className="text-center mb-6">
                  <h3 className={cn("text-4xl font-bold font-orbitron", getPriceClassName('entradas'))}>{menuCategories[language as keyof typeof menuCategories].entradas}</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentEntranceItems.map((item, index) => (
                    <Card key={index} className="bg-secondary border-primary/20">
                      <CardHeader><CardTitle>{item.name}</CardTitle></CardHeader>
                      <CardContent>
                        {item.quantity && <p className="text-sm text-muted-foreground">{item.quantity}</p>}
                        <p className="text-muted-foreground mb-2 text-sm">{item.accompaniment}</p>
                        <p className={cn("font-semibold text-lg", getPriceClassName('entradas'))}>${item.price}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              {/* CORTES */}
              <TabsContent value="cortes">
                <div className="text-center mb-6">
                  <h3 className={cn("text-4xl font-bold font-orbitron", getPriceClassName('cortes'))}>{menuCategories[language as keyof typeof menuCategories].cortes}</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentCutsItems.map((item, index) => (
                     <Card key={index} className="bg-secondary border-primary/20">
                      <CardHeader><CardTitle>{item.name}</CardTitle></CardHeader>
                      <CardContent>
                        {item.quantity && <p className="text-sm text-muted-foreground">{item.quantity}</p>}
                        <p className="text-muted-foreground mb-2 text-sm">{item.accompaniment}</p>
                        <p className={cn("font-semibold text-lg", getPriceClassName('cortes'))}>${item.price}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              {/* ENSALADAS */}
              <TabsContent value="ensaladas">
                <div className="text-center mb-6">
                  <h3 className={cn("text-4xl font-bold font-orbitron", getPriceClassName('ensaladas'))}>{menuCategories[language as keyof typeof menuCategories].ensaladas}</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentSaladItems.map((item, index) => (
                     <Card key={index} className="bg-secondary border-primary/20">
                      <CardHeader><CardTitle>{item.name}</CardTitle></CardHeader>
                      <CardContent>
                        {item.quantity && <p className="text-sm text-muted-foreground">{item.quantity}</p>}
                        <p className="text-muted-foreground mb-2 text-sm">{item.accompaniment}</p>
                        <p className={cn("font-semibold text-lg", getPriceClassName('ensaladas'))}>${item.price}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* MARISCOS */}
              <TabsContent value="mariscos">
                <div className="text-center mb-6">
                  <h3 className={cn("text-4xl font-bold font-orbitron", getPriceClassName('mariscos'))}>{menuCategories[language as keyof typeof menuCategories].mariscos}</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentSeafoodItems.map((item, index) => (
                     <Card key={index} className="bg-secondary border-primary/20">
                      <CardHeader><CardTitle>{item.name}</CardTitle></CardHeader>
                      <CardContent>
                        {item.quantity && <p className="text-sm text-muted-foreground">{item.quantity}</p>}
                        <p className="text-muted-foreground mb-2 text-sm">{item.accompaniment}</p>
                        <p className={cn("font-semibold text-lg", getPriceClassName('mariscos'))}>${item.price}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* TACOS */}
              <TabsContent value="taco">
                <div className="text-center mb-6">
                  <h3 className={cn("text-4xl font-bold font-orbitron", getPriceClassName('taco'))}>{menuCategories[language as keyof typeof menuCategories].taco}</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentTacoItems.map((item, index) => (
                     <Card key={index} className="bg-secondary border-primary/20">
                      <CardHeader><CardTitle>{item.name}</CardTitle></CardHeader>
                      <CardContent>
                        {item.quantity && <p className="text-sm text-muted-foreground">{item.quantity}</p>}
                        <p className="text-muted-foreground mb-2 text-sm">{item.accompaniment}</p>
                        <p className={cn("font-semibold text-lg", getPriceClassName('taco'))}>${item.price}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* HAMBURGUESAS */}
              <TabsContent value="hamburguesas">
                <div className="text-center mb-6">
                  <h3 className={cn("text-4xl font-bold font-orbitron", getPriceClassName('hamburguesas'))}>{menuCategories[language as keyof typeof menuCategories].hamburguesas}</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentBurgerItems.map((item, index) => (
                     <Card key={index} className="bg-secondary border-primary/20">
                      <CardHeader><CardTitle>{item.name}</CardTitle></CardHeader>
                      <CardContent>
                        {item.quantity && <p className="text-sm text-muted-foreground">{item.quantity}</p>}
                        <p className="text-muted-foreground mb-2 text-sm">{item.accompaniment}</p>
                        <p className={cn("font-semibold text-lg", getPriceClassName('hamburguesas'))}>${item.price}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="snacks">
                <div className="text-center mb-6">
                  <h3 className={cn("text-4xl font-bold font-orbitron", getPriceClassName('snacks'))}>{menuCategories[language as keyof typeof menuCategories].snacks}</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentSnackItems.map((item, index) => (
                    <Card key={index} className="bg-secondary border-primary/20">
                      <CardHeader><CardTitle>{item.name}</CardTitle></CardHeader>
                      <CardContent>
                        {item.quantity && <p className="text-sm text-muted-foreground">{item.quantity}</p>}
                        <p className="text-muted-foreground mb-2 text-sm">{item.accompaniment}</p>
                        <p className={cn("font-semibold text-lg", getPriceClassName('snacks'))}>${item.price}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="bebidas">
                 <Tabs defaultValue="refrescos" className="w-full">
                   <TabsList className="grid w-full grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 p-1 h-auto bg-transparent justify-center mb-8 gap-3">
                    {Object.keys(bebidasSubCategories[language as keyof typeof bebidasSubCategories]).map((tab) => (
                      <TabsTrigger
                        key={tab}
                        value={tab}
                        className={cn("text-base md:text-lg font-bold px-3 py-2 border-2 rounded-full transition-all duration-300", menuColors[tab] || 'border-transparent text-muted-foreground hover:text-white')}
                      >
                        {bebidasSubCategories[language as keyof typeof bebidasSubCategories][tab as keyof typeof bebidasSubCategories.es]}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  <TabsContent value="refrescos">
                    <div className="text-center mb-6">
                      <h3 className={cn("text-4xl font-bold font-orbitron", getPriceClassName('refrescos'))}>{bebidasSubCategories[language as keyof typeof bebidasSubCategories].refrescos}</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {currentSodaItems.map((item, index) => (
                        <Card key={index} className="bg-secondary border-primary/20">
                          <CardHeader><CardTitle>{item.name}</CardTitle></CardHeader>
                          <CardContent>
                            <p className={cn("font-semibold text-lg", getPriceClassName('refrescos'))}>${item.price}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="cerveza">
                    <div className="text-center mb-6">
                      <h3 className={cn("text-4xl font-bold font-orbitron", getPriceClassName('cerveza'))}>{bebidasSubCategories[language as keyof typeof bebidasSubCategories].cerveza}</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {currentBeerItems.map((item, index) => (
                        <Card key={index} className="bg-secondary border-primary/20">
                          <CardHeader><CardTitle>{item.name}</CardTitle></CardHeader>
                          <CardContent>
                            {item.quantity && <p className="text-sm text-muted-foreground">{item.quantity}</p>}
                            <p className={cn("font-semibold text-lg", getPriceClassName('cerveza'))}>${item.price}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="preparados">
                    <div className="text-center mb-6">
                      <h3 className={cn("text-4xl font-bold font-orbitron", getPriceClassName('preparados'))}>{bebidasSubCategories[language as keyof typeof bebidasSubCategories].preparados}</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {currentPreparadosItems.map((item, index) => (
                        <Card key={index} className="bg-secondary border-primary/20">
                          <CardHeader>
                            <div className="flex justify-between items-baseline">
                              <CardTitle className="text-xl">{item.name}</CardTitle>
                              {item.quantity && <p className="text-sm text-muted-foreground ml-2">{item.quantity}</p>}
                            </div>
                          </CardHeader>
                          <CardContent>
                            {item.ingredients && <p className="text-sm text-muted-foreground mb-2">{item.ingredients}</p>}
                            <p className={cn("font-semibold text-lg", getPriceClassName('preparados'))}>${item.price}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="cocteleria">
                    <div className="text-center mb-6">
                        <h3 className={cn("text-4xl font-bold font-orbitron", getPriceClassName('cocteleria'))}>{language === 'es' ? 'Bebidas por Botella y Copeo' : 'Drinks by Bottle and Glass'}</h3>
                        <div className="mt-4 mb-8 max-w-md mx-auto p-4 rounded-lg border-2 border-[hsl(var(--neon-cyan))] bg-secondary shadow-[0_0_15px_hsl(var(--neon-cyan))]">
                            <div className="flex items-center justify-center gap-3">
                            <PartyPopper className="h-8 w-8 text-[hsl(var(--neon-cyan))]" />
                            <p className="text-lg font-bold text-[hsl(var(--neon-cyan))]">
                                {language === 'es' ? '¡PROMOCIÓN!' : 'PROMOTION!'}
                            </p>
                            </div>
                            <p className="text-white mt-2">
                            {language === 'es' ? 'En la compra de cada botella, incluye 6 refrescos de 325 ml ¡gratis!' : 'Each bottle purchase includes 6 free 325 ml soft drinks!'}
                            </p>
                        </div>
                    </div>

                    <Tabs defaultValue="ginebra" className="w-full">
                        <TabsList className="grid w-full grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 p-1 h-auto bg-transparent justify-center mb-8 gap-3">
                        {Object.keys(drinkCategories[language as keyof typeof drinkCategories]).map((tab) => (
                            <TabsTrigger
                            key={tab}
                            value={tab}
                            className={cn("text-base md:text-lg font-bold px-3 py-2 border-2 rounded-full transition-all duration-300", menuColors[tab] || 'border-transparent text-muted-foreground hover:text-white')}
                            >
                            {drinkCategories[language as keyof typeof drinkCategories][tab as keyof typeof drinkCategories.es]}
                            </TabsTrigger>
                        ))}
                        </TabsList>
                        
                        <TabsContent value="ginebra">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {currentGinebraItems.map((item, index) => (
                                    <Card key={index} className="bg-secondary border-primary/20">
                                    <CardHeader><CardTitle>{item.name}</CardTitle></CardHeader>
                                    <CardContent>
                                        <div className="flex justify-between items-center mt-4">
                                        <div><p className="font-semibold">{language === 'es' ? 'Copeo:' : 'Glass:'}</p><p className={cn("font-bold text-lg", getPriceClassName('ginebra'))}>${item.priceGlass}</p></div>
                                        <div className="text-right"><p className="font-semibold">{language === 'es' ? 'Botella:' : 'Bottle:'}</p>{item.priceBottle ? <p className={cn("font-bold text-lg", getPriceClassName('ginebra'))}>${item.priceBottle}</p> : <p className="text-sm text-muted-foreground italic">{language === 'es' ? 'No disponible' : 'Not available'}</p>}</div>
                                        </div>
                                    </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>
                        <TabsContent value="vodka">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {currentVodkaItems.map((item, index) => (
                                    <Card key={index} className="bg-secondary border-primary/20">
                                    <CardHeader><CardTitle>{item.name}</CardTitle></CardHeader>
                                    <CardContent>
                                        <div className="flex justify-between items-center mt-4">
                                        <div><p className="font-semibold">{language === 'es' ? 'Copeo:' : 'Glass:'}</p><p className={cn("font-bold text-lg", getPriceClassName('vodka'))}>${item.priceGlass}</p></div>
                                        <div className="text-right"><p className="font-semibold">{language === 'es' ? 'Botella:' : 'Bottle:'}</p>{item.priceBottle ? <p className={cn("font-bold text-lg", getPriceClassName('vodka'))}>${item.priceBottle}</p> : <p className="text-sm text-muted-foreground italic">{language === 'es' ? 'No disponible' : 'Not available'}</p>}</div>
                                        </div>
                                    </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>
                        <TabsContent value="tequila">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {currentTequilaItems.map((item, index) => (
                                    <Card key={index} className="bg-secondary border-primary/20">
                                    <CardHeader><CardTitle>{item.name}</CardTitle></CardHeader>
                                    <CardContent>
                                        <div className="flex justify-between items-center mt-4">
                                        <div><p className="font-semibold">{language === 'es' ? 'Copeo:' : 'Glass:'}</p><p className={cn("font-bold text-lg", getPriceClassName('tequila'))}>${item.priceGlass}</p></div>
                                        <div className="text-right"><p className="font-semibold">{language === 'es' ? 'Botella:' : 'Bottle:'}</p>{item.priceBottle ? <p className={cn("font-bold text-lg", getPriceClassName('tequila'))}>${item.priceBottle}</p> : <p className="text-sm text-muted-foreground italic">{language === 'es' ? 'No disponible' : 'Not available'}</p>}</div>
                                        </div>
                                    </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>
                        <TabsContent value="mezcal">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {currentMezcalItems.map((item, index) => (
                                    <Card key={index} className="bg-secondary border-primary/20">
                                    <CardHeader><CardTitle>{item.name}</CardTitle></CardHeader>
                                    <CardContent>
                                        <div className="flex justify-between items-center mt-4">
                                        <div><p className="font-semibold">{language === 'es' ? 'Copeo:' : 'Glass:'}</p><p className={cn("font-bold text-lg", getPriceClassName('mezcal'))}>${item.priceGlass}</p></div>
                                        <div className="text-right"><p className="font-semibold">{language === 'es' ? 'Botella:' : 'Bottle:'}</p>{item.priceBottle ? <p className={cn("font-bold text-lg", getPriceClassName('mezcal'))}>${item.priceBottle}</p> : <p className="text-sm text-muted-foreground italic">{language === 'es' ? 'No disponible' : 'Not available'}</p>}</div>
                                        </div>
                                    </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>
                        <TabsContent value="ron">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {currentRonItems.map((item, index) => (
                                    <Card key={index} className="bg-secondary border-primary/20">
                                    <CardHeader><CardTitle>{item.name}</CardTitle></CardHeader>
                                    <CardContent>
                                        <div className="flex justify-between items-center mt-4">
                                        <div><p className="font-semibold">{language === 'es' ? 'Copeo:' : 'Glass:'}</p><p className={cn("font-bold text-lg", getPriceClassName('ron'))}>${item.priceGlass}</p></div>
                                        <div className="text-right"><p className="font-semibold">{language === 'es' ? 'Botella:' : 'Bottle:'}</p>{item.priceBottle ? <p className={cn("font-bold text-lg", getPriceClassName('ron'))}>${item.priceBottle}</p> : <p className="text-sm text-muted-foreground italic">{language === 'es' ? 'No disponible' : 'Not available'}</p>}</div>
                                        </div>
                                    </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>
                        <TabsContent value="whisky">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {currentWhiskyItems.map((item, index) => (
                                    <Card key={index} className="bg-secondary border-primary/20">
                                    <CardHeader><CardTitle>{item.name}</CardTitle></CardHeader>
                                    <CardContent>
                                        <div className="flex justify-between items-center mt-4">
                                        <div><p className="font-semibold">{language === 'es' ? 'Copeo:' : 'Glass:'}</p><p className={cn("font-bold text-lg", getPriceClassName('whisky'))}>${item.priceGlass}</p></div>
                                        <div className="text-right"><p className="font-semibold">{language === 'es' ? 'Botella:' : 'Bottle:'}</p>{item.priceBottle ? <p className={cn("font-bold text-lg", getPriceClassName('whisky'))}>${item.priceBottle}</p> : <p className="text-sm text-muted-foreground italic">{language === 'es' ? 'No disponible' : 'Not available'}</p>}</div>
                                        </div>
                                    </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>
                        <TabsContent value="coñac">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {currentCognacItems.map((item, index) => (
                                    <Card key={index} className="bg-secondary border-primary/20">
                                    <CardHeader><CardTitle>{item.name}</CardTitle></CardHeader>
                                    <CardContent>
                                        <div className="flex justify-between items-center mt-4">
                                        <div><p className="font-semibold">{language === 'es' ? 'Copeo:' : 'Glass:'}</p><p className={cn("font-bold text-lg", getPriceClassName('cognac'))}>${item.priceGlass}</p></div>
                                        <div className="text-right"><p className="fontsemibold">{language === 'es' ? 'Botella:' : 'Bottle:'}</p>{item.priceBottle ? <p className={cn("font-bold text-lg", getPriceClassName('cognac'))}>${item.priceBottle}</p> : <p className="text-sm text-muted-foreground italic">{language === 'es' ? 'No disponible' : 'Not available'}</p>}</div>
                                        </div>
                                    </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>
                        <TabsContent value="brandy">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {currentBrandyItems.map((item, index) => (
                                    <Card key={index} className="bg-secondary border-primary/20">
                                    <CardHeader><CardTitle>{item.name}</CardTitle></CardHeader>
                                    <CardContent>
                                        <div className="flex justify-between items-center mt-4">
                                        <div><p className="font-semibold">{language === 'es' ? 'Copeo:' : 'Glass:'}</p><p className={cn("font-bold text-lg", getPriceClassName('brandy'))}>${item.priceGlass}</p></div>
                                        <div className="text-right"><p className="font-semibold">{language === 'es' ? 'Botella:' : 'Bottle:'}</p>{item.priceBottle ? <p className={cn("font-bold text-lg", getPriceClassName('brandy'))}>${item.priceBottle}</p> : <p className="text-sm text-muted-foreground italic">{language === 'es' ? 'No disponible' : 'Not available'}</p>}</div>
                                        </div>
                                    </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>
                        <TabsContent value="licor">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {currentLicorItems.map((item, index) => (
                                    <Card key={index} className="bg-secondary border-primary/20">
                                    <CardHeader><CardTitle>{item.name}</CardTitle></CardHeader>
                                    <CardContent>
                                        <div className="flex justify-between items-center mt-4">
                                        <div><p className="font-semibold">{language === 'es' ? 'Copeo:' : 'Glass:'}</p><p className={cn("font-bold text-lg", getPriceClassName('licor'))}>${item.priceGlass}</p></div>
                                        <div className="text-right"><p className="font-semibold">{language === 'es' ? 'Botella:' : 'Bottle:'}</p>{item.priceBottle ? <p className={cn("font-bold text-lg", getPriceClassName('licor'))}>${item.priceBottle}</p> : <p className="text-sm text-muted-foreground italic">{language === 'es' ? 'No disponible' : 'Not available'}</p>}</div>
                                        </div>
                                    </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>

                    </Tabs>
                  </TabsContent>
                </Tabs>
              </TabsContent>

            </Tabs>
          </div>
        </section>
        
        {/* Promociones Section */}
        <section id="promociones" className="py-16 md:py-24 bg-secondary">
          <div className="container">
            <h2 className="text-5xl font-bold text-center mb-12 font-orbitron neon-text">{language === 'es' ? 'Promociones' : 'Promotions'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {(promotions[language as keyof typeof promotions]).map((promo, index) => {
                const Icon = promo.icon;
                const colors: { [key: string]: string } = {
                  blue: 'border-[hsl(var(--neon-blue))] text-[hsl(var(--neon-blue))] shadow-[0_0_15px_hsl(var(--neon-blue))]',
                  green: 'border-[hsl(var(--neon-green))] text-[hsl(var(--neon-green))] shadow-[0_0_15px_hsl(var(--neon-green))]',
                  yellow: 'border-[hsl(var(--neon-yellow))] text-[hsl(var(--neon-yellow))] shadow-[0_0_15px_hsl(var(--neon-yellow))]',
                  orange: 'border-[hsl(var(--neon-orange))] text-[hsl(var(--neon-orange))] shadow-[0_0_15px_hsl(var(--neon-orange))]',
                };
                return (
                  <Card key={index} className={cn("bg-background/50 text-center transform hover:scale-105 transition-transform duration-300 neon-border", colors[promo.color])}>
                    <CardHeader className="items-center">
                      <div className="p-4 bg-background rounded-full mb-2">
                        <Icon className="h-10 w-10" />
                      </div>
                      <CardTitle className="font-orbitron text-xl">{promo.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{promo.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Reservaciones y Delivery */}
        <section id="reservaciones" className="py-16 md:py-24">
            <div className="container text-center">
                <h2 className="text-5xl font-bold mb-10 font-orbitron neon-text">{language === 'es' ? 'Reservaciones y Delivery' : 'Reservations and Delivery'}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <Card className="p-6 neon-border bg-background">
                        <h3 className="text-2xl font-semibold mb-4 font-orbitron">{language === 'es' ? 'Reserva tu mesa' : 'Reserve your table'}</h3>
                        <p className="text-muted-foreground mb-6">{language === 'es' ? 'Asegura tu lugar y vive la experiencia BarJac. Contáctanos para grupos y eventos especiales.' : 'Secure your spot and live the BarJac experience. Contact us for groups and special events.'}</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                           <Button asChild size="lg" className="font-bold neon-border hover:bg-primary/90 hover:scale-105 transition-all">
                                <a href="https://wa.me/525636363018" target="_blank" rel="noopener noreferrer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-5 w-5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path><path d="M14.05 2.9A15.9 15.9 0 0 1 21.1 10m-7.05-7.05A15.9 15.9 0 0 1 21.1 10"></path></svg>
                                    WhatsApp
                                </a>
                            </Button>
                             <Button asChild variant="outline" size="lg" className="hover:bg-primary/20 hover:border-primary">
                                <a href="tel:+525636363018">
                                    <Phone className="mr-2 h-5 w-5" />
                                    {language === 'es' ? 'Llamar ahora' : 'Call now'}
                                </a>
                            </Button>
                        </div>
                    </Card>
                    <Card className="p-6 bg-secondary">
                        <h3 className="text-2xl font-semibold mb-4 font-orbitron">{language === 'es' ? 'Próximamente a domicilio' : 'Coming soon to your home'}</h3>
                        <p className="text-muted-foreground mb-6">{language === 'es' ? 'Disfruta de nuestros platillos y bebidas en la comodidad de tu casa.' : 'Enjoy our dishes and drinks in the comfort of your home.'}</p>
                        <div className="flex justify-center items-center gap-6">
                           <Image src="/images/DIDI.jpg" alt="Didi Food" width={50} height={50} data-ai-hint="company logo" />
                           <Image src="/images/UBER.jpg" alt="Uber Eats" width={50} height={50} data-ai-hint="company logo" />
                        </div>
                    </Card>
                </div>
            </div>
        </section>

        {/* Opiniones Section */}
        <section id="opiniones" className="py-16 md:py-24 bg-secondary">
          <div className="container">
            <h2 className="text-5xl font-bold text-center mb-10 font-orbitron neon-text">{language === 'es' ? 'Lo que dicen nuestros clientes' : 'What our customers say'}</h2>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-4xl mx-auto"
            >
              <CarouselContent>
                {testimonials[language as keyof typeof testimonials].map((testimonial, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card className="bg-background">
                        <CardContent className="flex flex-col items-center text-center aspect-square justify-center p-6">
                            <Avatar className="mb-4 h-16 w-16 neon-border">
                                <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                                <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <h4 className="font-semibold">{testimonial.name}</h4>
                            <div className="my-2">
                                <StarRating rating={testimonial.rating} />
                            </div>
                            <p className="text-sm text-muted-foreground">&quot;{testimonial.comment}&quot;</p>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </section>


        {/* Ubicacion Section */}
        <section id="ubicacion" className="py-16 md:py-24">
          <div className="container">
             <h2 className="text-5xl font-bold text-center mb-10 font-orbitron neon-text">{language === 'es' ? 'Encuéntranos' : 'Find us'}</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="relative aspect-video rounded-lg overflow-hidden neon-border">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.628045558913!2d-99.1680506850934!3d19.42850698688649!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff3a5a47814b%3A0x44f19b81aa528539!2sAv.%20%C3%81lvaro%20Obreg%C3%B3n%20234%2C%20Roma%20Nte.%2C%20Cuauht%C3%A9moc%2C%2006700%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1ses-419!2smx!4v1678886361548!5m2!1ses-419!2smx"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="absolute inset-0 w-full h-full opacity-80"
                    ></iframe>
                </div>
                 <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <MapPin className="h-10 w-10 text-primary mt-1 shrink-0" />
                        <div>
                            <h3 className="text-xl font-semibold">{language === 'es' ? 'Dirección' : 'Address'}</h3>
                            <p className="text-muted-foreground">ALVARO OBREGON 234, CUAUHTEMOC, C.P 06700, ESQ. MEDELLIN Y AV YUCATAN, CDMX</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <Phone className="h-10 w-10 text-primary mt-1 shrink-0" />
                        <div>
                            <h3 className="text-xl font-semibold">{language === 'es' ? 'Teléfono' : 'Phone'}</h3>
                            <p className="text-muted-foreground">56 3636 3018</p>
                        </div>
                    </div>
                </div>
             </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contacto" className="bg-primary/90">
        <div className="container py-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-primary-foreground">&copy; {new Date().getFullYear()} BarJac. {language === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}</p>
          <div className="flex space-x-4">
            <Button variant="ghost" size="icon" asChild className="text-primary-foreground hover:bg-primary/20 hover:text-primary-foreground">
              <a href="https://www.facebook.com/profile.php?id=61584743632789&locale=es_LA" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><Facebook /></a>
            </Button>
            <Button variant="ghost" size="icon" asChild className="text-primary-foreground hover:bg-primary/20 hover:text-primary-foreground">
              <a href="https://www.instagram.com/barjac_cdmx/" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><Instagram /></a>
            </Button>
            <Button variant="ghost" size="icon" asChild className="text-primary-foreground hover:bg-primary/20 hover:text-primary-foreground">
              <a href="https://www.tiktok.com/@barjac234" aria-label="TikTok" target="_blank" rel="noopener noreferrer"><TiktokIcon /></a>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
