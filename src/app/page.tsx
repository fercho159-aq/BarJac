"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Facebook, Instagram, Phone, Star, MapPin, Menu as MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { breakfastItems, entranceItems, foodItems, drinkItems, snackItems, sodaItems, beerItems, preparadosItems } from "@/lib/menu-data";
import { breakfastItemsEn, entranceItemsEn, foodItemsEn, drinkItemsEn, snackItemsEn, sodaItemsEn, beerItemsEn, preparadosItemsEn } from "@/lib/menu-data-en";
import { TiktokIcon } from "@/components/icons/tiktok-icon";
import { cn } from "@/lib/utils";

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
    desayunos: "text-[hsl(var(--neon-blue))] shadow-[0_0_10px_hsl(var(--neon-blue))] border-[hsl(var(--neon-blue))] data-[state=active]:border-[hsl(var(--neon-blue))]",
    entradas: "text-[hsl(var(--neon-green))] shadow-[0_0_10px_hsl(var(--neon-green))] border-[hsl(var(--neon-green))] data-[state=active]:border-[hsl(var(--neon-green))]",
    comida: "text-[hsl(var(--neon-yellow))] shadow-[0_0_10px_hsl(var(--neon-yellow))] border-[hsl(var(--neon-yellow))] data-[state=active]:border-[hsl(var(--neon-yellow))]",
    snacks: "text-[hsl(var(--neon-orange))] shadow-[0_0_10px_hsl(var(--neon-orange))] border-[hsl(var(--neon-orange))] data-[state=active]:border-[hsl(var(--neon-orange))]",
    refrescos: "text-[hsl(var(--neon-magenta))] shadow-[0_0_10px_hsl(var(--neon-magenta))] border-[hsl(var(--neon-magenta))] data-[state=active]:border-[hsl(var(--neon-magenta))]",
    cerveza: "text-[hsl(var(--neon-red))] shadow-[0_0_10px_hsl(var(--neon-red))] border-[hsl(var(--neon-red))] data-[state=active]:border-[hsl(var(--neon-red))]",
    cocteleria: "text-[hsl(var(--neon-cyan))] shadow-[0_0_10px_hsl(var(--neon-cyan))] border-[hsl(var(--neon-cyan))] data-[state=active]:border-[hsl(var(--neon-cyan))]",
    preparados: "text-[hsl(var(--neon-violet))] shadow-[0_0_10px_hsl(var(--neon-violet))] border-[hsl(var(--neon-violet))] data-[state=active]:border-[hsl(var(--neon-violet))]",
  };
  
  const menuCategories = {
    es: {
      desayunos: "Desayunos",
      entradas: "Entradas",
      comida: "Comida",
      snacks: "Snacks",
      refrescos: "Refrescos",
      cerveza: "Cerveza",
      cocteleria: "Coctelería",
      preparados: "Preparados",
    },
    en: {
      desayunos: "Breakfast",
      entradas: "Appetizers",
      comida: "Food",
      snacks: "Snacks",
      refrescos: "Sodas",
      cerveza: "Beer",
      cocteleria: "Cocktails",
      preparados: "Preparados",
    }
  };


  const getPriceClassName = (tab: string) => {
    switch (tab) {
      case 'desayunos': return 'text-[hsl(var(--neon-blue))]';
      case 'entradas': return 'text-[hsl(var(--neon-green))]';
      case 'comida': return 'text-[hsl(var(--neon-yellow))]';
      case 'snacks': return 'text-[hsl(var(--neon-orange))]';
      case 'refrescos': return 'text-[hsl(var(--neon-magenta))]';
      case 'cerveza': return 'text-[hsl(var(--neon-red))]';
      case 'cocteleria': return 'text-[hsl(var(--neon-cyan))]';
      case 'preparados': return 'text-[hsl(var(--neon-violet))]';
      default: return 'text-primary';
    }
  };

  const promos = {
    es: [
      { title: "Jueves de Amigos", description: "2x1 en toda la coctelería nacional." },
      { title: "Sábado de Champions", description: "Cubeta de 10 cervezas nacionales por $300 durante los partidos." },
      { title: "DJ Night", description: "Todos los viernes, DJ en vivo y shots de bienvenida." },
    ],
    en: [
      { title: "Friends Thursday", description: "2x1 on all national cocktails." },
      { title: "Champions Saturday", description: "Bucket of 10 national beers for $300 during the matches." },
      { title: "DJ Night", description: "Every Friday, live DJ and welcome shots." },
    ]
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
      { name: "Javier G.", rating: 5, comment: "Excellent service and the cocktails are top-notch. I recommend the 'Old Fashioned'. I'll be back soon.", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704f" },
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

  const currentBreakfastItems = language === 'es' ? breakfastItems : breakfastItemsEn;
  const currentEntranceItems = language === 'es' ? entranceItems : entranceItemsEn;
  const currentFoodItems = language === 'es' ? foodItems : foodItemsEn;
  const currentDrinkItems = language === 'es' ? drinkItems : drinkItemsEn;
  const currentSnackItems = language === 'es' ? snackItems : snackItemsEn;
  const currentSodaItems = language === 'es' ? sodaItems : sodaItemsEn;
  const currentBeerItems = language === 'es' ? beerItems : beerItemsEn;
  const currentPreparadosItems = language === 'es' ? preparadosItems : preparadosItemsEn;


  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-[hsl(var(--neon-yellow))]/30 bg-[hsl(var(--neon-yellow))]/10 backdrop-blur supports-[backdrop-filter]:bg-[hsl(var(--neon-yellow))]/10">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
             <Image src="/images/Imagen de WhatsApp 2025-11-25 a las 10.21.55_ff8ad4cb.jpg" alt="BarJac Logo" width={40} height={40} className="rounded-full neon-border" data-ai-hint="bar logo" />
            <span className="font-orbitron font-bold text-xl neon-text text-black" style={{ textShadow: '0 0 5px hsl(var(--primary)), 0 0 10px hsl(var(--primary)), 0 0 20px #000' }}>BarJac</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navLinks[language as keyof typeof navLinks].map(link => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-black font-bold">{link.label}</Link>
            ))}
          </nav>
          
          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-black hover:bg-white/20">
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
            <h1 className="text-4xl md:text-6xl font-orbitron font-extrabold tracking-tight leading-tight neon-text">BARJAC</h1>
            <p className="mt-4 text-lg md:text-xl max-w-2xl">{language === 'es' ? 'Música, amigos y el mejor ambiente de la ciudad.' : 'Music, friends and the best atmosphere in the city.'}</p>
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
              <div className="flex justify-center mb-8">
                <TabsList className="grid w-full max-w-4xl grid-cols-2 md:grid-cols-4 lg:grid-cols-8 h-auto">
                  {Object.keys(menuColors).map((tab) => (
                    <TabsTrigger key={tab} value={tab} className={cn(activeTab === tab ? menuColors[tab] : 'data-[state=inactive]:border-transparent')}>
                      {menuCategories[language as keyof typeof menuCategories][tab as keyof typeof menuCategories.es]}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
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
              <TabsContent value="comida">
                <div className="text-center mb-6">
                  <h3 className={cn("text-4xl font-bold font-orbitron", getPriceClassName('comida'))}>{menuCategories[language as keyof typeof menuCategories].comida}</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentFoodItems.map((item, index) => (
                     <Card key={index} className="bg-secondary border-primary/20">
                      <CardHeader><CardTitle>{item.name}</CardTitle></CardHeader>
                      <CardContent>
                        {item.quantity && <p className="text-sm text-muted-foreground">{item.quantity}</p>}
                        <p className="text-muted-foreground mb-2 text-sm">{item.accompaniment}</p>
                        <p className={cn("font-semibold text-lg", getPriceClassName('comida'))}>${item.price}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
               <TabsContent value="cocteleria">
                <div className="text-center mb-6">
                  <h3 className={cn("text-4xl font-bold font-orbitron", getPriceClassName('cocteleria'))}>{menuCategories[language as keyof typeof menuCategories].cocteleria}</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentDrinkItems.map((item, index) => (
                     <Card key={index} className="bg-secondary border-primary/20">
                      <CardHeader>
                        <div className="flex justify-between items-baseline">
                          <CardTitle className="text-xl">{item.name}</CardTitle>
                          {item.quantity && <p className="text-sm text-muted-foreground ml-2">{item.quantity}</p>}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className={cn("font-semibold text-lg", getPriceClassName('cocteleria'))}>${item.price}</p>
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
              <TabsContent value="refrescos">
                 <div className="text-center mb-6">
                  <h3 className={cn("text-4xl font-bold font-orbitron", getPriceClassName('refrescos'))}>{menuCategories[language as keyof typeof menuCategories].refrescos}</h3>
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
                  <h3 className={cn("text-4xl font-bold font-orbitron", getPriceClassName('cerveza'))}>{menuCategories[language as keyof typeof menuCategories].cerveza}</h3>
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
                  <h3 className={cn("text-4xl font-bold font-orbitron", getPriceClassName('preparados'))}>{menuCategories[language as keyof typeof menuCategories].preparados}</h3>
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
                        <p className={cn("font-semibold text-lg", getPriceClassName('preparados'))}>${item.price}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Promociones Section */}
        <section id="promociones" className="py-16 md:py-24 bg-secondary">
          <div className="container">
            <h2 className="text-5xl font-bold text-center mb-10 font-orbitron neon-text">{language === 'es' ? 'Promociones' : 'Promotions'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {promos[language as keyof typeof promos].map((promo, index) => (
                <Card key={index} className="text-center transform hover:scale-105 transition-transform duration-300 neon-border bg-background">
                  <CardHeader>
                    <CardTitle className="text-primary font-orbitron">{promo.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg">{promo.description}</p>
                  </CardContent>
                </Card>
              ))}
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
                           <Image src="/images/DIDI.jpg" alt="Uber Eats" width={50} height={50} data-ai-hint="company logo" />
                           <Image src="/images/UBER.jpg" alt="Didi Food" width={50} height={50} data-ai-hint="company logo" />
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
              <CarouselPrevious />
              <CarouselNext />
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
      <footer id="contacto" className="bg-[hsl(var(--neon-yellow))]/10">
        <div className="container py-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-black">&copy; {new Date().getFullYear()} BarJac. {language === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}</p>
          <div className="flex space-x-4">
            <Button variant="ghost" size="icon" asChild className="text-primary hover:bg-primary/20 hover:text-primary">
              <a href="https://www.facebook.com/profile.php?id=61584743632789&locale=es_LA" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><Facebook /></a>
            </Button>
            <Button variant="ghost" size="icon" asChild className="text-primary hover:bg-primary/20 hover:text-primary">
              <a href="https://www.instagram.com/barjac_cdmx/" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><Instagram /></a>
            </Button>
            <Button variant="ghost" size="icon" asChild className="text-primary hover:bg-primary/20 hover:text-primary">
              <a href="https://www.tiktok.com/@barjac234" aria-label="TikTok" target="_blank" rel="noopener noreferrer"><TiktokIcon /></a>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
