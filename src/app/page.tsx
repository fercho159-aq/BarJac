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
import { breakfastItems, entranceItems, foodItems, drinkItems, snackItems, sodaItems, beerItems } from "@/lib/menu-data";
import { TiktokIcon } from "@/components/icons/tiktok-icon";

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className={`h-5 w-5 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
    ))}
  </div>
);


export default function Home() {
  const [isSheetOpen, setSheetOpen] = useState(false);

  const promos = [
    { title: "Jueves de Amigos", description: "2x1 en toda la coctelería nacional." },
    { title: "Sábado de Champions", description: "Cubeta de 10 cervezas nacionales por $300 durante los partidos." },
    { title: "DJ Night", description: "Todos los viernes, DJ en vivo y shots de bienvenida." },
  ];
  
  const testimonials = [
    { name: "Carlos M.", rating: 5, comment: "¡El ambiente es increíble y la comida deliciosa! Los chilaquiles son los mejores que he probado.", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },
    { name: "Ana P.", rating: 4, comment: "Muy buen lugar para ir con amigos. La música en vivo le da un toque especial. Las micheladas son un must.", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704e" },
    { name: "Javier G.", rating: 5, comment: "Excelente servicio y la coctelería es de primer nivel. Recomiendo el 'Old Fashioned'. Volveré pronto.", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704f" },
    { name: "Sofia R.", rating: 5, comment: "Me encantó la terraza. Es el lugar perfecto para una tarde de sábado. ¡Las promos están geniales!", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704g" },
  ];

  const navLinks = [
    { href: "#menu", label: "Menú" },
    { href: "#promociones", label: "Promociones" },
    { href: "#reservaciones", label: "Reservaciones" },
    { href: "#ubicacion", label: "Ubicación" },
    { href: "#opiniones", label: "Opiniones" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
             <Image src="/images/Imagen de WhatsApp 2025-11-25 a las 10.21.55_ff8ad4cb.jpg" alt="Bar Jac Logo" width={40} height={40} className="rounded-full" data-ai-hint="bar logo" />
            <span className="font-bold text-xl">Bar Jac</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-primary">{link.label}</Link>
            ))}
          </nav>
          
          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 p-4">
                 <Link href="/" className="flex items-center gap-2 mb-4">
                    <Image src="https://picsum.photos/seed/bar-logo/40/40" alt="Bar Jac Logo" width={40} height={40} className="rounded-full" data-ai-hint="bar logo"/>
                    <span className="font-bold text-xl">Bar Jac</span>
                </Link>
                {navLinks.map(link => (
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
            alt="Interior de Bar Jac"
            fill
            className="object-cover"
            data-ai-hint="bar interior"
            priority
          />
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center text-white p-4">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">BAR JAC</h1>
            <p className="mt-4 text-lg md:text-xl max-w-2xl">Música, amigos y el mejor ambiente de la ciudad.</p>
            <Button asChild className="mt-8">
                <Link href="#menu">Ver Menú</Link>
            </Button>
          </div>
        </section>

        {/* Menu Section */}
        <section id="menu" className="py-16 md:py-24">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Nuestro Menú</h2>
            <Tabs defaultValue="desayunos" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="grid w-full max-w-4xl grid-cols-2 md:grid-cols-4 lg:grid-cols-7 h-auto">
                  <TabsTrigger value="desayunos">Desayunos</TabsTrigger>
                  <TabsTrigger value="entradas">Entradas</TabsTrigger>
                  <TabsTrigger value="comida">Comida</TabsTrigger>
                  <TabsTrigger value="snacks">Snacks</TabsTrigger>
                  <TabsTrigger value="refrescos">Refrescos</TabsTrigger>
                  <TabsTrigger value="cerveza">Cerveza</TabsTrigger>
                  <TabsTrigger value="cocteleria">Coctelería</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="desayunos">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold">Desayunos</h3>
                  <p className="text-muted-foreground">En paquete te incluimos café, fruta o jugo.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {breakfastItems.map((item, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle>{item.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{item.quantity}</p>
                        <p className="text-muted-foreground mb-2 text-sm">{item.accompaniment}</p>
                        <div className="flex justify-between items-center mt-4">
                          <div>
                            <p className="font-semibold">Normal:</p>
                            <p className="text-primary font-bold text-lg">${item.priceNormal}</p>
                          </div>
                          <div>
                            <p className="font-semibold">Paquete:</p>
                            <p className="text-primary font-bold text-lg">${item.pricePackage}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="entradas">
                 <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold">Entradas</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {entranceItems.map((item, index) => (
                    <Card key={index}>
                      <CardHeader><CardTitle>{item.name}</CardTitle></CardHeader>
                      <CardContent>
                        {item.quantity && <p className="text-sm text-muted-foreground">{item.quantity}</p>}
                        <p className="text-muted-foreground mb-2 text-sm">{item.accompaniment}</p>
                        <p className="font-semibold text-primary text-lg">${item.price}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="comida">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold">Comida</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {foodItems.map((item, index) => (
                     <Card key={index}>
                      <CardHeader><CardTitle>{item.name}</CardTitle></CardHeader>
                      <CardContent>
                        {item.quantity && <p className="text-sm text-muted-foreground">{item.quantity}</p>}
                        <p className="text-muted-foreground mb-2 text-sm">{item.accompaniment}</p>
                        <p className="font-semibold text-primary text-lg">${item.price}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
               <TabsContent value="cocteleria">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold">Coctelería</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {drinkItems.map((item, index) => (
                     <Card key={index}>
                      <CardHeader>
                        <div className="flex justify-between items-baseline">
                          <CardTitle className="text-xl">{item.name}</CardTitle>
                          {item.quantity && <p className="text-sm text-muted-foreground ml-2">{item.quantity}</p>}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="font-semibold text-primary text-lg">${item.price}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="snacks">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold">Snacks</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {snackItems.map((item, index) => (
                    <Card key={index}>
                      <CardHeader><CardTitle>{item.name}</CardTitle></CardHeader>
                      <CardContent>
                        {item.quantity && <p className="text-sm text-muted-foreground">{item.quantity}</p>}
                        <p className="text-muted-foreground mb-2 text-sm">{item.accompaniment}</p>
                        <p className="font-semibold text-primary text-lg">${item.price}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="refrescos">
                 <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold">Refrescos</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sodaItems.map((item, index) => (
                    <Card key={index}>
                      <CardHeader><CardTitle>{item.name}</CardTitle></CardHeader>
                      <CardContent>
                        <p className="font-semibold text-primary text-lg">${item.price}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="cerveza">
                 <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold">Cerveza</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {beerItems.map((item, index) => (
                    <Card key={index}>
                      <CardHeader><CardTitle>{item.name}</CardTitle></CardHeader>
                      <CardContent>
                        {item.quantity && <p className="text-sm text-muted-foreground">{item.quantity}</p>}
                        <p className="font-semibold text-primary text-lg">${item.price}</p>
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
            <h2 className="text-3xl font-bold text-center mb-10">Promociones</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {promos.map((promo, index) => (
                <Card key={index} className="text-center transform hover:scale-105 transition-transform duration-300">
                  <CardHeader>
                    <CardTitle className="text-primary">{promo.title}</CardTitle>
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
                <h2 className="text-3xl font-bold mb-10">Reservaciones y Delivery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <Card className="p-6">
                        <h3 className="text-2xl font-semibold mb-4">Reserva tu mesa</h3>
                        <p className="text-muted-foreground mb-6">Asegura tu lugar y vive la experiencia Bar Jac. Contáctanos para grupos y eventos especiales.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                           <Button asChild size="lg">
                                <a href="https://wa.me/525636363018" target="_blank" rel="noopener noreferrer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-5 w-5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path><path d="M14.05 2.9A15.9 15.9 0 0 1 21.1 10m-7.05-7.05A15.9 15.9 0 0 1 21.1 10"></path></svg>
                                    WhatsApp
                                </a>
                            </Button>
                             <Button asChild variant="outline" size="lg">
                                <a href="tel:+525636363018">
                                    <Phone className="mr-2 h-5 w-5" />
                                    Llamar ahora
                                </a>
                            </Button>
                        </div>
                    </Card>
                    <Card className="p-6 bg-secondary">
                        <h3 className="text-2xl font-semibold mb-4">Próximamente a domicilio</h3>
                        <p className="text-muted-foreground mb-6">Disfruta de nuestros platillos y bebidas en la comodidad de tu casa.</p>
                        <div className="flex justify-center items-center gap-6">
                           <Image src="https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=50&h=50" alt="Uber Eats" width={50} height={50} data-ai-hint="company logo" className="grayscale"/>
                           <Image src="https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=50&h=50" alt="Didi Food" width={50} height={50} data-ai-hint="company logo" className="grayscale"/>
                        </div>
                    </Card>
                </div>
            </div>
        </section>

        {/* Opiniones Section */}
        <section id="opiniones" className="py-16 md:py-24 bg-secondary">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-10">Lo que dicen nuestros clientes</h2>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-4xl mx-auto"
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex flex-col items-center text-center aspect-square justify-center p-6">
                            <Avatar className="mb-4 h-16 w-16">
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
             <h2 className="text-3xl font-bold text-center mb-10">Encuéntranos</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="relative aspect-video rounded-lg overflow-hidden border">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.628045558913!2d-99.1680506850934!3d19.42850698688649!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff3a5a47814b%3A0x44f19b81aa528539!2sAv.%20%C3%81lvaro%20Obreg%C3%B3n%20234%2C%20Roma%20Nte.%2C%20Cuauht%C3%A9moc%2C%2006700%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1ses-419!2smx!4v1678886361548!5m2!1ses-419!2smx"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="absolute inset-0 w-full h-full"
                    ></iframe>
                </div>
                 <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <MapPin className="h-10 w-10 text-primary mt-1 shrink-0" />
                        <div>
                            <h3 className="text-xl font-semibold">Dirección</h3>
                            <p className="text-muted-foreground">ALVARO OBREGON 234, CUAUHTEMOC, C.P 06700, ESQ. MEDELLIN Y AV YUCATAN, CDMX</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <Phone className="h-10 w-10 text-primary mt-1 shrink-0" />
                        <div>
                            <h3 className="text-xl font-semibold">Teléfono</h3>
                            <p className="text-muted-foreground">56 3636 3018</p>
                        </div>
                    </div>
                </div>
             </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contacto" className="bg-gray-900 text-gray-300">
        <div className="container py-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm">&copy; {new Date().getFullYear()} Bar Jac. Todos los derechos reservados.</p>
          <div className="flex space-x-4">
            <Button variant="ghost" size="icon" asChild className="hover:bg-primary/20 hover:text-white">
              <a href="https://www.facebook.com/profile.php?id=61584743632789&locale=es_LA" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><Facebook /></a>
            </Button>
            <Button variant="ghost" size="icon" asChild className="hover:bg-primary/20 hover:text-white">
              <a href="https://www.instagram.com/barjac_cdmx/" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><Instagram /></a>
            </Button>
            <Button variant="ghost" size="icon" asChild className="hover:bg-primary/20 hover:text-white">
              <a href="https://www.tiktok.com/@barjac234" aria-label="TikTok" target="_blank" rel="noopener noreferrer"><TiktokIcon /></a>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}

    

    