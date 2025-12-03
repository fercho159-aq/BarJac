"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Facebook, Instagram, Music, MapPin, Beer, Utensils, QrCode } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const menuItems = [
    { name: "Alitas BBQ", price: "150", description: "10 pz de alitas bañadas en nuestra salsa BBQ casera." },
    { name: "Hamburguesa Jack", price: "180", description: "Carne de res premium, queso cheddar, tocino y aros de cebolla." },
    { name: "Tacos de Arrachera", price: "120", description: "3 tacos de arrachera con guacamole y cebolla morada." },
    { name: "Cerveza Artesanal", price: "90", description: "Consulta nuestra selección de cervezas locales." },
  ];

  const drinkItems = [
    { name: "Gin & Tonic", price: "150", description: "Beefeater, Agua Tónica, Gajo de Limón Verde." },
    { name: "Vodka & Tonic", price: "140", description: "Smirnoff, Agua Tónica, Gajo de Limón Verde." },
    { name: "Cuba Libre", price: "130", description: "Bacardi Blanco, Jugo de Limón, Coca Cola." },
    { name: "Tequila Sunrise", price: "160", description: "Jose Cuervo Tradicional, Jugo de Naranja, Granadina." },
    { name: "Godfather", price: "180", description: "J.W. Red Label, Disaronno." },
    { name: "Black Russian", price: "150", description: "Smirnoff, Kahlua." },
    { name: "Cosmopolitan", price: "170", description: "Smirnoff, Controy, Jugo de Arándano, Jugo de Limón." },
    { name: "Margarita Clásica", price: "160", description: "Jose Cuervo Tradicional, Controy, Jugo de Limón." },
  ];

  const foodItems = [
    { name: "Tostada de Atun", quantity: "1 pz 80 gr", accompaniment: "cebolla, jitomate, aguacate", price: "95.00" },
    { name: "Tostada de Pescado", quantity: "1 pz 60 gr", accompaniment: "cebolla, jitomate, aguacate", price: "95.00" },
    { name: "Pescadilla", quantity: "3 pz 500 gr", accompaniment: "Aguacate, limon", price: "83.00" },
    { name: "Camarones Momia", quantity: "150 gr", accompaniment: "Ensalada de la casa", price: "225.00" },
    { name: "Atun a la Parrilla", quantity: "200 gr", accompaniment: "Ensalada de la casa, Arroz amarillo", price: "213.00" },
    { name: "Arrachera", quantity: "200 gr", accompaniment: "Papas a la Francesa, Cebollas Cambray, Nopal Baby, Chiles toreados", price: "295.00" },
    { name: "Tacos de Arrachera", quantity: "1 pz 60 gr", accompaniment: "Papas al oregano, chiles toreados, nopal baby, guacamole", price: "58.00" },
    { name: "Hamburguesa Clasica", quantity: "1 pz 180 gr", accompaniment: "Queso americano. Lechuga, jitomate, cebolla, tocino, papas a la francesa", price: "175.00" },
];


  const promos = [
    { title: "Jueves de Amigos", description: "2x1 en toda la coctelería nacional." },
    { title: "Sábado de Champions", description: "Cubeta de 10 cervezas nacionales por $300 durante los partidos." },
    { title: "DJ Night", description: "Todos los viernes, DJ en vivo y shots de bienvenida." },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold text-lg">Bar Jack</span>
            </Link>
          </div>
          <nav className="flex items-center space-x-6 text-sm font-medium ml-auto">
            <Link href="#menu" className="transition-colors hover:text-primary">Menú</Link>
            <Link href="#promociones" className="transition-colors hover:text-primary">Promociones</Link>
            <Link href="#ubicacion" className="transition-colors hover:text-primary">Ubicación</Link>
            <Link href="#contacto" className="transition-colors hover:text-primary">Contacto</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[60vh] w-full">
          <Image
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2000&auto=format&fit=crop"
            alt="Interior de Bar Jack"
            fill
            className="object-cover"
            data-ai-hint="bar interior"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white p-4">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">BAR JACK</h1>
            <p className="mt-4 text-lg md:text-xl max-w-2xl">Música en vivo, la mejor comida y un ambiente inigualable.</p>
          </div>
        </section>

        {/* Menu Section */}
        <section id="menu" className="py-16 md:py-24">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-10">Nuestro Menú</h2>
            
            <h3 className="text-2xl font-bold text-center mb-6 mt-12">Bebidas</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {drinkItems.map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{item.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-2">{item.description}</p>
                    <p className="font-semibold text-primary">${item.price}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <h3 className="text-2xl font-bold text-center mb-6 mt-12">Comida</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {foodItems.map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{item.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{item.quantity}</p>
                    <p className="text-muted-foreground mb-2">{item.accompaniment}</p>
                    <p className="font-semibold text-primary">${item.price}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

             <div className="text-center mt-12">
                <h3 className="text-2xl font-bold mb-4">Menú Digital</h3>
                 <div className="flex justify-center">
                    <div className="p-4 bg-white rounded-lg shadow-md">
                        <Image src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://example.com" alt="QR Code para menu digital" width={150} height={150} data-ai-hint="qr code" />
                    </div>
                </div>
                <p className="text-muted-foreground mt-2">Escanea para ver nuestro menú completo.</p>
            </div>
          </div>
        </section>

        {/* Promociones Section */}
        <section id="promociones" className="py-16 md:py-24 bg-secondary">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-10">Promociones</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {promos.map((promo, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <CardTitle>{promo.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg">{promo.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Ubicacion Section */}
        <section id="ubicacion" className="py-16 md:py-24">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-6">Encuéntranos</h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="md:w-1/2">
                <div className="relative aspect-video rounded-lg overflow-hidden border">
                    <Image src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=1931&auto=format&fit=crop" alt="Mapa de la ubicación" fill className="object-cover grayscale" data-ai-hint="city map" />
                </div>
              </div>
              <div className="md:w-1/2 text-left space-y-4">
                  <div className="flex items-center gap-4">
                      <MapPin className="h-8 w-8 text-primary" />
                      <div>
                          <h3 className="text-xl font-semibold">Dirección</h3>
                          <p className="text-muted-foreground">Av. de los Insurgentes Sur, Col. Roma, CDMX</p>
                      </div>
                  </div>
                  <div className="flex items-center gap-4">
                      <Music className="h-8 w-8 text-primary" />
                       <div>
                          <h3 className="text-xl font-semibold">Música en Vivo</h3>
                          <p className="text-muted-foreground">DJ sets todos los viernes y sábados por la noche.</p>
                      </div>
                  </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contacto" className="bg-secondary border-t">
        <div className="container py-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">&copy; 2024 Bar Jack. Todos los derechos reservados.</p>
          <div className="flex space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <a href="#" aria-label="Facebook"><Facebook /></a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="#" aria-label="Instagram"><Instagram /></a>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
