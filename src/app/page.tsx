"use client";

import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MapPin, Clock, ChevronRight, PartyPopper } from "lucide-react";
import { useState } from "react";
import { NeonDrinkCard } from "@/components/landing/neon-drink-card";


export default function Home() {
  const [activeTab, setActiveTab] = useState('litros');

  const promos = [
    {
      title: "CHAROLA $650",
      subtitle: "Lunes, Martes y Miércoles",
      items: ["24 Latas de Cerveza 355ml", "+ 1 Orden de 6 Alitas", "+ Papas a la Francesa"],
      highlight: true
    },
    {
      title: "TRITÓN 4.8L",
      subtitle: "Promoción Tritonera",
      items: ["Vodka Preparado", "Cerveza o Neon", "Solo $349"],
      highlight: false
    },
    {
      title: "ALITAS $349",
      subtitle: "Miércoles de Alitas",
      items: ["En la compra del primer tritón", "Te enviamos una orden", "Bañadas en tu salsa favorita"],
      highlight: false
    }
  ];

    const drinks = [
    { name: "PINK ON", price: "130", color: "pink", description: "Enciende tu bebida. Incluye patito de regalo.", icon: "💖" },
    { name: "GREEN ON", price: "130", color: "green", description: "Sabor explosivo. Incluye patito de regalo.", icon: "💚" },
    { name: "BLUE ON", price: "130", color: "blue", description: "Refrescante y eléctrico. Incluye patito de regalo.", icon: "💙" },
    { name: "YELLOW ON", price: "130", color: "yellow", description: "Cítrico y brillante. Incluye patito de regalo.", icon: "💛" },
    { name: "SAMBUPATO", price: "450", color: "orange", description: "10 Shots de Baileys o Perlas Negras.", icon: "🦆" },
    { name: "MICHELADA", price: "120", color: "yellow", description: "Mango o Cereza. 1.2 Litros de sabor.", icon: "🍺" },
  ];

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-pink-500 selection:text-white">
      <Header />

      {/* HERO SECTION */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
        
        <div className="relative z-10 text-center px-4">
          <h2 className="text-neon-green font-bold tracking-widest text-lg md:text-xl mb-4 animate-bounce">¿ESTÁS LISTO?</h2>
          <h1 className="text-6xl md:text-9xl font-black mb-6 tracking-tighter leading-none">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 filter drop-shadow-[0_0_10px_rgba(236,72,153,0.8)]">ENCIENDE</span>
            <span className="block text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">LA FIESTA</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10 font-light">
            El lugar de los <span className="text-yellow-400 font-bold">Patitos</span>, los <span className="text-cyan-400 font-bold">Tritones</span> y las mejores promos de la CDMX.
          </p>
          <Button asChild
            className="bg-pink-600 hover:bg-pink-700 text-white px-10 py-4 rounded-full font-black text-xl tracking-widest transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] border-2 border-white/20"
          >
            <Link href="/menu">VER MENÚ</Link>
          </Button>
        </div>
      </section>

       {/* PROMOS SECTION (Basado en Menú) */}
      <section id="promos" className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-16">
            <PartyPopper className="text-yellow-400" size={40} />
            <h2 className="text-4xl md:text-6xl font-black text-center uppercase italic">Promociones <span className="text-yellow-400">Tritoneras</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {promos.map((promo, idx) => (
              <div key={idx} className={`relative border-4 ${promo.highlight ? 'border-yellow-400 bg-gray-900' : 'border-gray-700 bg-black'} p-8 rounded-2xl transform hover:scale-105 transition-all duration-300`}>
                {promo.highlight && (
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black font-black px-6 py-2 rounded-full uppercase text-sm shadow-[0_0_20px_rgba(250,204,21,0.6)]">
                    La Favorita
                  </div>
                )}
                <h3 className="text-3xl font-black text-white mb-2 uppercase italic">{promo.title}</h3>
                <p className="text-pink-500 font-bold mb-6 text-lg uppercase tracking-wider">{promo.subtitle}</p>
                <ul className="space-y-3">
                  {promo.items.map((item, i) => (
                    <li key={i} className="flex items-center text-gray-300">
                      <ChevronRight className="text-green-500 mr-2" size={20} />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DRINKS SECTION */}
      <section id="bebidas" className="py-20 px-4 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-6xl font-black text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">NEON DRINKS</h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">Nuestras bebidas insignia. Brillan en la oscuridad e incluyen tu patito coleccionable.</p>

          <div className="flex justify-center gap-4 mb-12">
             <button 
                onClick={() => setActiveTab('litros')}
                className={`px-6 py-2 rounded-full font-bold border-2 transition-all ${activeTab === 'litros' ? 'bg-white text-black border-white' : 'border-gray-700 text-gray-500 hover:border-white'}`}
             >
               LITROS
             </button>
             <button 
                onClick={() => setActiveTab('shots')}
                className={`px-6 py-2 rounded-full font-bold border-2 transition-all ${activeTab === 'shots' ? 'bg-white text-black border-white' : 'border-gray-700 text-gray-500 hover:border-white'}`}
             >
               SHOTS & PATOS
             </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {drinks.filter(d => activeTab === 'litros' ? !d.name.includes('SAMBUPATO') : d.name.includes('SAMBUPATO')).map((drink, idx) => (
               <NeonDrinkCard key={idx} {...drink} />
            ))}
            {activeTab === 'shots' && (
                <>
                    <NeonDrinkCard name="BABY VODKA" price="300" color="yellow" description="10 Shots. Sabores: Mango, Fresa, Cereza..." icon="🐣" />
                    <NeonDrinkCard name="PERLAS NEGRAS" price="450" color="blue" description="10 Shots de Jägermeister con boost." icon="💣" />
                </>
            )}
          </div>
           <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300">
              <Link href="/menu">Ver Menú Completo</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
