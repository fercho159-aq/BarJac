"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Phone, Star, MapPin, Menu as MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { TiktokIcon } from "@/components/icons/tiktok-icon";
import type { Lang, SiteContent } from "@/lib/content/types";
import { Hero } from "./hero";
import { MenuSection } from "./menu-section";
import { PromotionsSection } from "./promotions-section";

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className={`h-5 w-5 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-500"}`} />
    ))}
  </div>
);

const testimonials = {
  es: [
    { name: "Mariana L.", rating: 5, comment: "Excelente lugar para pasar un buen rato, la comida es deliciosa (recomiendo los tacos de rib eye) y los tragos muy bien preparados. El ambiente es muy agradable, con buena música y el servicio de 10. ¡Volveremos!", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026705d" },
    { name: "Fernando S.", rating: 5, comment: "Las promociones son lo mejor, sobre todo los jueves de coctelería doble. El ambiente es relajado y perfecto para ir después de la oficina. El personal es súper amable y atento.", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026705e" },
    { name: "Valeria R.", rating: 5, comment: "Un lugar increíble en la Roma. La terraza es perfecta para una tarde con amigos. La comida tiene muy buen sazón y la carta de bebidas es muy amplia. Definitivamente uno de mis nuevos lugares favoritos.", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026705f" },
  ],
  en: [
    { name: "Mariana L.", rating: 5, comment: "Excellent place to have a good time, the food is delicious (I recommend the rib eye tacos) and the drinks are very well prepared. The atmosphere is very pleasant, with good music and 10/10 service. We will be back!", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026705d" },
    { name: "Fernando S.", rating: 5, comment: "The promotions are the best, especially the double cocktail Thursdays. The atmosphere is relaxed and perfect to go after the office. The staff is super friendly and attentive.", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026705e" },
    { name: "Valeria R.", rating: 5, comment: "An incredible place in Roma. The terrace is perfect for an afternoon with friends. The food is very well seasoned and the drink menu is very extensive. Definitely one of my new favorite places.", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026705f" },
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

export function HomePage({ content }: { content: SiteContent }) {
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [language, setLanguage] = useState<Lang>("es");

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
        <Hero hero={content.hero} lang={language} onViewMenu={setLanguage} />

        <MenuSection categories={content.categories} items={content.items} lang={language} />

        <PromotionsSection promotions={content.promotions} lang={language} />

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
              plugins={[Autoplay({ delay: 5000 })]}
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
            <div className="mt-8 text-center">
              <Button asChild className="font-bold neon-border hover:bg-primary/90 hover:scale-105 transition-all">
                <a href="https://www.google.com/maps/place/BarJac/@19.4168227,-99.1708007,17z/data=!4m8!3m7!1s0x85d1ff001e0dc5b9:0xfdcd63bfe41952d9!8m2!3d19.4168177!4d-99.1659298!9m1!1b1!16s%2Fg%2F11yr45lq9_?entry=ttu" target="_blank" rel="noopener noreferrer">
                  {language === 'es' ? 'Escribe una reseña' : 'Write a review'}
                </a>
              </Button>
            </div>
          </div>
        </section>


        {/* Ubicacion Section */}
        <section id="ubicacion" className="py-16 md:py-24">
          <div className="container">
             <h2 className="text-5xl font-bold text-center mb-10 font-orbitron neon-text">{language === 'es' ? 'Encuéntranos' : 'Find us'}</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="relative aspect-video rounded-lg overflow-hidden neon-border">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.900451683412!2d-99.1659298!3d19.4168177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff001e0dc5b9%3A0xfdcd63bfe41952d9!2sBarJac!5e0!3m2!1ses-419!2smx!4v1700000000000!5m2!1ses-419!2smx"
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
            <Button variant="ghost" size="icon" asChild className="text-primary-foreground hover:bg-primary/20">
              <a href="https://www.facebook.com/profile.php?id=61584743632789&locale=es_LA" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><Facebook /></a>
            </Button>
            <Button variant="ghost" size="icon" asChild className="text-primary-foreground hover:bg-primary/20">
              <a href="https://www.instagram.com/barjac_cdmx/" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><Instagram /></a>
            </Button>
            <Button variant="ghost" size="icon" asChild className="text-primary-foreground hover:bg-primary/20">
              <a href="https://www.tiktok.com/@barjacmexico" aria-label="TikTok" target="_blank" rel="noopener noreferrer"><TiktokIcon /></a>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
