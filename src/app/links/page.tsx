"use client";

import Image from "next/image";
import { Instagram, Facebook, MapPin, Phone, UtensilsCrossed, MessageCircle } from "lucide-react";
import { TiktokIcon } from "@/components/icons/tiktok-icon";

const links = [
  {
    label: "Ver Menú",
    href: "/",
    icon: UtensilsCrossed,
    color: "bg-[#5C6B3C]",
    hoverColor: "hover:bg-[#4A5D23]",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/525636363018",
    icon: MessageCircle,
    color: "bg-[#25D366]",
    hoverColor: "hover:bg-[#1DA851]",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/barjac_cdmx/",
    icon: Instagram,
    color: "bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737]",
    hoverColor: "hover:opacity-90",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@barjacmexico",
    icon: TiktokIcon,
    color: "bg-black",
    hoverColor: "hover:bg-gray-900",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61584743632789&locale=es_LA",
    icon: Facebook,
    color: "bg-[#1877F2]",
    hoverColor: "hover:bg-[#166FE5]",
  },
  {
    label: "Google Maps",
    href: "https://www.google.com/maps/place/BarJac/@19.4168227,-99.1708007,17z/data=!4m8!3m7!1s0x85d1ff001e0dc5b9:0xfdcd63bfe41952d9!8m2!3d19.4168177!4d-99.1659298",
    icon: MapPin,
    color: "bg-[#EA4335]",
    hoverColor: "hover:bg-[#D33426]",
  },
  {
    label: "Llamar",
    href: "tel:+525636363018",
    icon: Phone,
    color: "bg-[#5C6B3C]",
    hoverColor: "hover:bg-[#4A5D23]",
  },
];

export default function LinksPage() {
  return (
    <div className="min-h-[100svh] bg-gradient-to-b from-[#3D4F27] to-[#2A3A1A] flex flex-col items-center px-4 py-12">
      <div className="w-full max-w-md mx-auto flex flex-col items-center">
        {/* Logo */}
        <div className="mb-2 animate-fade-up">
          <Image
            src="/images/Imagen de WhatsApp 2025-11-25 a las 10.21.55_ff8ad4cb.jpg"
            alt="BarJac Logo"
            width={96}
            height={96}
            className="rounded-full border-4 border-white/30 shadow-xl"
          />
        </div>

        {/* Title */}
        <h1 className="font-display text-3xl font-bold text-white mb-1 animate-fade-up stagger-1">BarJac</h1>
        <p className="text-white/70 text-sm mb-8 animate-fade-up stagger-2">Música, amigos y el mejor ambiente</p>

        {/* Links */}
        <div className="w-full space-y-3">
          {links.map((link, index) => {
            const Icon = link.icon;
            return (
              <a
                key={index}
                href={link.href}
                target={link.href.startsWith("http") || link.href.startsWith("tel:") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`
                  w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-white font-semibold text-lg
                  ${link.color} ${link.hoverColor}
                  transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200
                  shadow-lg hover:shadow-xl
                  animate-fade-up
                `}
                style={{ animationDelay: `${(index + 3) * 100}ms` }}
              >
                <Icon className="h-6 w-6 flex-shrink-0" />
                <span className="flex-1 text-center">{link.label}</span>
              </a>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-white/40 text-xs">
          <p>Álvaro Obregón 234, Roma Norte</p>
          <p>Cuauhtémoc, CDMX</p>
          <p className="mt-2">&copy; {new Date().getFullYear()} BarJac</p>
        </div>
      </div>
    </div>
  );
}
