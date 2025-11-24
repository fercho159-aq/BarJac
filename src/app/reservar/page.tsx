"use client";

import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function ReservarPage() {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Reservación Enviada",
      description: "Gracias por reservar en Sambuca. Te contactaremos pronto para confirmar.",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center pt-24 md:pt-32">
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-7xl font-headline tracking-widest text-glow-accent">
                Reservar
              </h1>
              <p className="text-lg text-muted-foreground mt-4">
                Asegura tu lugar para una noche inolvidable.
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="space-y-8 bg-card p-8 rounded-lg border border-border/50"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input id="name" placeholder="Tu nombre" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input id="phone" type="tel" placeholder="Tu teléfono" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Sucursal</Label>
                <Select required>
                  <SelectTrigger id="location">
                    <SelectValue placeholder="Elige una sucursal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="condesa">Sambuca Condesa</SelectItem>
                    <SelectItem value="roma">Sambuca Roma</SelectItem>
                    <SelectItem value="polanco">Sambuca Polanco</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label htmlFor="guests">Número de Personas</Label>
                  <Input
                    id="guests"
                    type="number"
                    placeholder="2"
                    min="1"
                    max="20"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Hora</Label>
                  <Select required>
                    <SelectTrigger id="time">
                      <SelectValue placeholder="Elige la hora" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="18:00">6:00 PM</SelectItem>
                      <SelectItem value="19:00">7:00 PM</SelectItem>
                      <SelectItem value="20:00">8:00 PM</SelectItem>
                      <SelectItem value="21:00">9:00 PM</SelectItem>
                      <SelectItem value="22:00">10:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4 flex flex-col items-center">
                <Label>Fecha</Label>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border border-border/30"
                  disabled={(date) =>
                    date < new Date(new Date().setHours(0, 0, 0, 0))
                  }
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-accent text-accent-foreground rounded-none hover:bg-accent/90 text-lg font-headline tracking-wider transition-all duration-300 h-auto py-3 box-glow-accent"
              >
                Confirmar Reservación
              </Button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
