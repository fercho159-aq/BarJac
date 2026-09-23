import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: "BarJac - Música, Amigos y el Mejor Ambiente",
  description: "Restaurante bar en la Roma, CDMX. Cortes, mariscos, hamburguesas, cocteles y el mejor ambiente.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
