import type { ColorKey, HeroHeight } from "./types";

export const PALETTE: Record<ColorKey, { label: string; css: string }> = {
  blue: { label: "Azul neón", css: "hsl(var(--neon-blue))" },
  green: { label: "Verde neón", css: "hsl(var(--neon-green))" },
  yellow: { label: "Amarillo neón", css: "hsl(var(--neon-yellow))" },
  orange: { label: "Naranja neón", css: "hsl(var(--neon-orange))" },
  magenta: { label: "Magenta neón", css: "hsl(var(--neon-magenta))" },
  red: { label: "Rojo neón", css: "hsl(var(--neon-red))" },
  cyan: { label: "Cian neón", css: "hsl(var(--neon-cyan))" },
  violet: { label: "Violeta neón", css: "hsl(var(--neon-violet))" },
  gray: { label: "Gris", css: "hsl(var(--neon-gray))" },
  sky: { label: "Azul cielo", css: "#60a5fa" },
  purple: { label: "Morado", css: "#c084fc" },
  amber: { label: "Ámbar", css: "#fbbf24" },
  lime: { label: "Lima", css: "#a3e635" },
  tangerine: { label: "Mandarina", css: "#fb923c" },
  gold: { label: "Dorado", css: "#d97706" },
  rust: { label: "Óxido", css: "#ea580c" },
  crimson: { label: "Carmesí", css: "#ef4444" },
  rose: { label: "Rosa", css: "#f43f5e" },
  pink: { label: "Rosa mexicano", css: "#ec4899" },
};

export const colorCss = (key: string | undefined) =>
  PALETTE[key as ColorKey]?.css ?? "hsl(var(--primary))";

export const HERO_HEIGHTS: Record<HeroHeight, { label: string; vh: number }> = {
  short: { label: "Baja (50%)", vh: 50 },
  medium: { label: "Media (70%)", vh: 70 },
  tall: { label: "Alta (85%)", vh: 85 },
  full: { label: "Pantalla completa", vh: 100 },
};
