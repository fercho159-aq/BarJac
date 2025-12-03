"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Facebook, Instagram, Music, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {

  const breakfastItems = [
    { name: "Chilaquiles Verdes", quantity: "100 gs", accompaniment: "Cebolla, cilantro, crema, queso panela", priceNormal: "90.00", pricePackage: "120.00" },
    { name: "Chilaquiles Verdes con Huevo", quantity: "100 gs + 120 gr", accompaniment: "Cebolla, cilantro, crema, queso panela", priceNormal: "110.00", pricePackage: "140.00" },
    { name: "Chilaquiles Verdes con Pollo", quantity: "100 gs + 100 gr", accompaniment: "Cebolla, cilantro, crema, queso panela", priceNormal: "120.00", pricePackage: "150.00" },
    { name: "Chilaquiles Verdes con Ahuja Norteña", quantity: "100 gs + 100 gr", accompaniment: "Cebolla, cilantro, crema, queso panela", priceNormal: "150.00", pricePackage: "180.00" },
    { name: "Chilaquiles Verdes con Arrachera Marinada", quantity: "100 gs + 100 gr", accompaniment: "Cebolla, cilantro, crema, queso panela", priceNormal: "160.00", pricePackage: "190.00" },
    { name: "Chilaquiles Verdes con Ribeye", quantity: "100 gs + 100 gr", accompaniment: "Cebolla, cilantro, crema, queso panela", priceNormal: "160.00", pricePackage: "190.00" },
    { name: "Chilaquiles Verdes con New York", quantity: "100 gs + 100 gr", accompaniment: "Cebolla, cilantro, crema, queso panela", priceNormal: "160.00", pricePackage: "190.00" },
    { name: "Chilaquiles Verdes con Sirlon", quantity: "100 gs + 100 gr", accompaniment: "Cebolla, cilantro, crema, queso panela", priceNormal: "160.00", pricePackage: "190.00" },
    { name: "Chilaquiles Rojos", quantity: "100 gs", accompaniment: "Cebolla, cilantro, crema, queso panela", priceNormal: "90.00", pricePackage: "120.00" },
    { name: "Chilaquiles Rojos con Huevo", quantity: "100 gs + 120 gr", accompaniment: "Cebolla, cilantro, crema, queso panela", priceNormal: "110.00", pricePackage: "140.00" },
    { name: "Chilaquiles Rojos con Pollo", quantity: "100 gs + 100 gr", accompaniment: "Cebolla, cilantro, crema, queso panela", priceNormal: "120.00", pricePackage: "150.00" },
    { name: "Chilaquiles Rojos con Ahuja Norteña", quantity: "100 gs + 100 gr", accompaniment: "Cebolla, cilantro, crema, queso panela", priceNormal: "150.00", pricePackage: "180.00" },
    { name: "Chilaquiles Rojos con Arrachera Marinada", quantity: "100 gs + 100 gr", accompaniment: "Cebolla, cilantro, crema, queso panela", priceNormal: "160.00", pricePackage: "190.00" },
    { name: "Chilaquiles Rojos con Ribeye", quantity: "100 gs + 100 gr", accompaniment: "Cebolla, cilantro, crema, queso panela", priceNormal: "160.00", pricePackage: "190.00" },
    { name: "Chilaquiles Rojos con New York", quantity: "100 gs + 100 gr", accompaniment: "Cebolla, cilantro, crema, queso panela", priceNormal: "160.00", pricePackage: "190.00" },
    { name: "Chilaquiles Rojos con Sirlon", quantity: "100 gs + 100 gr", accompaniment: "Cebolla, cilantro, crema, queso panela", priceNormal: "160.00", pricePackage: "190.00" },
    { name: "Huevos Divorciados", quantity: "120 gr", accompaniment: "Frijol, Crema Queso Panela, cilantro", priceNormal: "89.00", pricePackage: "119.00" },
    { name: "Huevos a la Mexicana", quantity: "120 gr", accompaniment: "Frijol, ensalada, tortillas", priceNormal: "89.00", pricePackage: "119.00" },
    { name: "Huevos Rancheros", quantity: "120 gs", accompaniment: "jamon, frijoles, tortillas", priceNormal: "89.00", pricePackage: "119.00" },
    { name: "Huevos revueltos", quantity: "120 gs", accompaniment: "Frijol, ensalada, tortillas. Con Jamon 70gs, tocino 90gs, o chorizo 90gs", priceNormal: "89.00", pricePackage: "119.00" },
  ];

  const entranceItems = [
    { name: "Coktel de Camaron Chico", quantity: "80 gr", accompaniment: "cebolla, jitomate, cilantro, aguacate", price: "95.00" },
    { name: "Coktel de Camaron Grande", quantity: "140 gr", accompaniment: "cebolla, jitomate, cilantro, aguacate", price: "145.00" },
    { name: "Coktel de Campechano Chico", quantity: "80 gr", accompaniment: "cebolla, jitomate, cilantro, aguacate", price: "95.00" },
    { name: "Coktel de Campachano Grande", quantity: "140 gr", accompaniment: "cebolla, jitomate, cilantro, aguacate", price: "145.00" },
    { name: "Queso Fundido", accompaniment: "Cebolla Cambray, chile toreado, tortillas", price: "125.00" },
    { name: "Queso Fundido con Arrachera", accompaniment: "Cebolla Cambray, chile toreado, tortillas", price: "165.00" },
    { name: "Queso Fundido con Ahuja Norteña", accompaniment: "Cebolla Cambray, chile toreado, tortillas", price: "165.00" },
    { name: "Queso Fundido con Ribey", accompaniment: "Cebolla Cambray, chile toreado, tortillas", price: "185.00" },
    { name: "Queso Fundido con New York", accompaniment: "Cebolla Cambray, chile toreado, tortillas", price: "185.00" },
    { name: "Queso Fundido con Sirlon", accompaniment: "Cebolla Cambray, chile toreado, tortillas", price: "185.00" },
    { name: "Guacamole", accompaniment: "Cebolla Cambray, chile toreado, tortillas", price: "145.00" },
  ];

  const drinkItems = [
    { name: "Gin & Tonic", description: "Beefeater, Agua Tónica, Gajo de Limón Verde." },
    { name: "Vodka & Tonic", description: "Smirnoff, Agua Tónica, Gajo de Limón Verde." },
    { name: "Cuba Libre", description: "Bacardi Blanco, Jugo de Limón, Coca Cola." },
    { name: "Cubata", description: "Bacardi Añejo, Jugo de Limón, Coca Cola." },
    { name: "Tequila Sunrise", description: "Jose Cuervo Tradicional, Jugo de Naranja, Granadina." },
    { name: "Godfather", description: "J.W. Red Label, Disaronno." },
    { name: "Godmother", description: "Smirnoff, Disaronno." },
    { name: "Black Russian", description: "Smirnoff, Kahlua." },
    { name: "White Russian", description: "Smirnoff, Kahlua, Leche." },
    { name: "Colorado Bulldog", description: "Smirnoff, Kahlua, Coca Cola." },
    { name: "Woo Woo", description: "Smirnoff, Flamingo De Durazno, Jugo de Arándano." },
    { name: "Cape Codder", description: "Smirnoff, Jugo De Arándano." },
    { name: "Americano", description: "Campari, Vermut Dulce, Agua Mineral." },
    { name: "Screaming Orgasm", description: "Smirnoff, Kahlua, Disaronno, Baileys, Leche." },
    { name: "Orgasm", description: "Kahlua, Disaronno, Baileys, Leche." },
    { name: "Sex On The Beach", description: "Smirnoff, Flamingo De Durazno, Jugo De Naranja, Jugo De Arándano." },
    { name: "Cosmopolitan", description: "Smirnoff, Controy, Jugo de Arándano, Jugo de Limón." },
    { name: "Daiquiri Clasico", description: "Bacardi Blanco, Jugo De Limon Verde, Jarabe Natural." },
    { name: "Lychburg Limonade", description: "Jim Bean White, Controy, Jugo De Limon Amarillo, Jarabe Natural, Sprite." },
    { name: "Horses Neck", description: "Jim Bean White, Bitter De Angostura, Ginger Ale." },
    { name: "Tom Collins", description: "Beefetear, Jugo De Limón Amarillo, Jarabe Natural, Agua Mineral." },
    { name: "John Collins", description: "Jim Bean White, Jugo De Limon Amarillo, Jarabe Natural, Agua Mineral." },
    { name: "Long Island Iced Tea", description: "Smirnoff, Beefetear, Bacardi Blanco, Jose Cuervo Tradicional, Controy, Jarabe Natural, Jugo De Limon Amarillo, Coca Cola." },
    { name: "Long Beach Iced Tea", description: "Smirnoff, Beefetear, Bacardi Blanco, Jose Cuervo Tradicional, Controy, Jarabe Natural, Jugo De Limon Amarillo, Jugo De Arándano." },
    { name: "Beverly Hills Iced Tea", description: "Smirnoff, Beefetear, Bacardi Blanco, Jose Cuervo Tradicional, Controy, Jarabe Natural, Jugo De Limon Amarillo, Cinzano To Spritz." },
    { name: "Dry Martini", description: "Smirnoff/Beefeater, Vermut Seco." },
    { name: "Wet Martini", description: "Smirnoff/Beefeater, Vermut Seco." },
    { name: "Dirty Martini", description: "Smirnoff/Beefeater, Vermut Seco, Salmuera." },
    { name: "Manhattan Dulce", description: "Jim Bean White, Bitter De Angostura, Vermut Dulce." },
    { name: "Manhattan Seco", description: "Jim Bean White, Bitter De Angostura, Vermut Seco." },
    { name: "Manhattan Perfecto", description: "Jim Bean White, Bitter De Angostura, Vermut Dulce, Vermut Seco." },
    { name: "Rob Roy", description: "J.W. Red Label, Vermut Dulce, Bitter De Angostura." },
    { name: "Paloma", description: "Sal, Jose Cuervo Tradicional, Jugo De Toronja, Jugo De Limón Verde, Jarabe Natural, Agua Mineral." },
    { name: "Margarita Clásica", description: "Sal, Jose Cuervo Tradicional, Controy, Jugo De Limón Verde, Jarabe Natural." },
    { name: "Tommy's Margarita", description: "Sal, Jose Cuervo Tradicional, Jugo De Limón Verde, Miel De Agave." },
    { name: "Side Car", description: "Azúcar, Martel V.S., Controy, Jugo De Limón Verde, Jarabe Natural." },
    { name: "Amaretto Sour", description: "Bitter De Angostura, Clara De Huevo, Disaronno, Jugo De Limón Amarillo, Jarabe Natural." },
    { name: "Midori Sour", description: "Bitter De Angostura, Clara De Huevo, Midori, Jugo De Limón Amarillo, Jarabe Natural." },
    { name: "Whiskey Sour", description: "Bitter De Angostura, Clara De Huevo, Jim Bean White, Jugo De Limón Amarillo, Jarabe Natural." },
    { name: "New York Sour", description: "Bitter De Angostura, Clara De Huevo, Jim Bean White, Jugo De Limón Amarillo, Jarabe Natural, Altozano Ensamble Crianza." },
    { name: "Clover Club", description: "Beefetear, Jugo De Limón Amarillo, Néctar De Frambuesa, Clara De Huevo." },
    { name: "Mojito", description: "Gajo De Limón Verde, Jarabe Natural, Hierbabuena, Bacardi Blanco, Agua Mineral." },
    { name: "Caipiroska", description: "Gajo De Limón Verde, Jarabe Natural, Smirnoff." },
    { name: "Gin Basil Smash", description: "Beefetear, Jugo De Limón Amarillo, Jarabe Natural, Albahaca." },
    { name: "Southside", description: "Beefetear, Jugo De Limón Amarillo, Jarabe Natural, Hierbabuena." },
    { name: "B52", description: "Kahlua, Baileys, Controy." },
    { name: "Last Word", description: "Beefetear, Flamingo De Cereza, Chartreuse Verde, Jugo De Limón Verde." },
    { name: "Old Fashioned", description: "Bitter De Angostura, Jim Bean White, Jarabe Natural." },
    { name: "Fidel Castro", description: "Jugo De Limón Verde, Bacardi Añejo, Ginger Ale." },
    { name: "Hemingway Daiquiri", description: "Bacardi Blanco, Flamingo De Cereza, Jugo De Limón Verde, Jugo De Toronja." },
    { name: "White Lady", description: "Beefetear, Controy, Jugo De Limón Amarillo, Jarabe Natural." },
    { name: "Pink Lady", description: "Beefetear, Controy, Jugo De Limón Amarillo, Jarabe Natural, Granadina." },
    { name: "Bloody Mari", description: "Smirnoff, Jugo De Tomate, Petroleo, Sal, Pimienta Negra, Jugo De Limón Verde." },
    { name: "Red Snapper", description: "Beefetear, Jugo De Tomate, Petroleo, Sal, Pimienta Negra, Jugo De Limón Verde." },
    { name: "Negroni", description: "Beefetear, Vermut Dulce, Campari." },
    { name: "Negroni Sbagliato", description: "Cinzano To Spritz, Vermut Dulce, Campari." },
    { name: "Boulevardier", description: "Jim Bean White, Vermut Dulce, Campari." },
    { name: "Aperol Spritz", description: "Cinzano To Spritz, Aperol, Agua Mineral." },
    { name: "Mimosa", description: "Jugo De Naranja, Cinzano To Spritz." },
    { name: "Expresso Martini", description: "Smirnoff, Kahlua, Expresso, Jarabe Natural." },
    { name: "Kamikaze", description: "Smirnoff, Controy, Jugo De Limón Verde." },
    { name: "Pink Gin", description: "Beefetear, Bitter De Angostura." },
    { name: "Piña Colada", description: "Jugo De Piña, Bacardi Blanco, Flamingo De Coco, Jugo De Limón Verde, Néctar De Coco." },
    { name: "Lemon Drop", description: "Smirnoff, Jugo De Limón Amarillo, Jarabe Natural." },
    { name: "Bull", description: "Jugo De Limón Verde, Jarabe Natural, Bacardi Blanco, Bohemia Oscura." },
    { name: "Mezcalita", description: "Tajín, Mono Araña, Jugo De Limón Verde, Jarabe Natural." },
    { name: "MezcalOni", description: "Mono Araña, Vermut Dulce, Campari." },
    { name: "Carajillo", description: "Licor 43, Expresso." },
    { name: "Carajillo con kalua", description: "Licor 43, Kahlua, Expresso." },
    { name: "Tinto De Verano", description: "Sprite, Altozano Ensamble Crianza." },
    { name: "Pitufo", description: "Malibu, Flamingo De Curazao, Jugo De Piña, Sprite." },
    { name: "Back Room", description: "Beefetear, Vermut Seco, Frangelico." },
    { name: "Frangelico Spritz", description: "Cinzano To Spritz, Frangelico, Agua Mineral." },
    { name: "St Germain Spritz", description: "Cinzano To Spritz, St Germain, Agua Mineral." },
    { name: "AMF", description: "Smirnoff, Beefetear, Mono Araña, Flamingo De Curazao, Jugo De Limon Amarillo, Jarabe Natural, Sprite." },
    { name: "Cerveza Sunrise", description: "Chamoy De Sabor, Tajin, Jose Cuervo Tradicional, Granadina, Jugo De Limón Verde, Heineken." },
    { name: "Cerveza Hawaian", description: "Chamoy De Sabor, Tajin, Bacardi Blanco, Jugo De Piña, Flamingo De Curazao, Jugo De Limón Verde, Heineken." },
    { name: "Chela Azulita", description: "Chamoy De Sabor, Tajin, Jose Cuervo Tradicional, Flamingo De Curazao, Jugo De Limón Verde, Sprite." },
    { name: "Chelada", description: "Sal, Jugo De Limón Verde." },
    { name: "Cubana", description: "Tajin, Jugo De Limón Verde, Petroleo." },
    { name: "Clamato", description: "Tajin, Jugo De Limón Verde, Petroleo, Clamato." },
    { name: "Coctel De Camarones", description: "Tajin, Camarones, Jugo De Limón Verde, Petroleo, Clamato." },
    { name: "Coctel De Ostiones", description: "Tajin, Ostiones, Jugo De Limón Verde, Petroleo, Clamato." },
  ];

  const foodItems = [
    { name: "Tostada de Atun", quantity: "1 pz 80 gr", accompaniment: "cebolla, jitomate, aguacate", price: "95.00" },
    { name: "Tostada de Pescado", quantity: "1 pz 60 gr", accompaniment: "cebolla, jitomate, aguacate", price: "95.00" },
    { name: "Pescadilla", quantity: "3 pz 500 gr", accompaniment: "Aguacate, limon", price: "83.00" },
    { name: "Camarones Momia", quantity: "150 gr", accompaniment: "Ensalada de la casa", price: "225.00" },
    { name: "Atun a la Parrilla", quantity: "200 gr", accompaniment: "Ensalada de la casa, Arroz amarillo", price: "213.00" },
    { name: "Arrachera", quantity: "200 gr", accompaniment: "Papas a la Francesa, Cebollas Cambray, Nopal Baby, Chiles toreados", price: "295.00" },
    { name: "Tacos de Arrachera (Orden)", quantity: "1 pz 60 gr", accompaniment: "Papas al oregano, chiles toreados, nopal baby, guacamole", price: "58.00" },
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
            
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold">Desayunos</h3>
              <p className="text-muted-foreground">En paquete te incluimos café, fruta o jugo.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {breakfastItems.map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{item.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{item.quantity}</p>
                    <p className="text-muted-foreground mb-2">{item.accompaniment}</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">Normal:</p>
                        <p className="text-primary">${item.priceNormal}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Paquete:</p>
                        <p className="text-primary">${item.pricePackage}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <h3 className="text-2xl font-bold text-center mb-6 mt-12">Entradas</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {entranceItems.map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{item.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {item.quantity && <p className="text-sm text-muted-foreground">{item.quantity}</p>}
                    <p className="text-muted-foreground mb-2">{item.accompaniment}</p>
                    <p className="font-semibold text-primary">${item.price}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <h3 className="text-2xl font-bold text-center mb-6 mt-12">Bebidas</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {drinkItems.map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{item.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-2">{item.description}</p>
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
                    {item.quantity && <p className="text-sm text-muted-foreground">{item.quantity}</p>}
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
