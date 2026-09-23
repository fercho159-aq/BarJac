"use client";

import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { colorCss } from "@/lib/content/palette";
import { describeDays, formatShortDate, isActiveOn, isAlwaysOn, mexicoToday } from "@/lib/content/schedule";
import type { Lang, Promotion } from "@/lib/content/types";
import { PROMO_ICONS } from "./promo-icons";
import { tr } from "./menu-section";

function scheduleLabel(p: Promotion, lang: Lang) {
  const parts: string[] = [];
  if (p.days.length > 0 && p.days.length < 7) parts.push(describeDays(p.days, lang));
  if (p.startDate && p.endDate) {
    parts.push(`${formatShortDate(p.startDate, lang)} – ${formatShortDate(p.endDate, lang)}`);
  } else if (p.endDate) {
    parts.push(`${lang === "es" ? "Hasta el" : "Until"} ${formatShortDate(p.endDate, lang)}`);
  } else if (p.startDate) {
    parts.push(`${lang === "es" ? "Desde el" : "From"} ${formatShortDate(p.startDate, lang)}`);
  }
  return parts.join(" · ");
}

export function PromotionsSection({ promotions, lang }: { promotions: Promotion[]; lang: Lang }) {
  // Scheduling depends on the visitor's current date, so it is resolved after hydration.
  const [today, setToday] = useState<ReturnType<typeof mexicoToday> | null>(null);
  useEffect(() => {
    setToday(mexicoToday());
    const timer = setInterval(() => setToday(mexicoToday()), 60_000);
    return () => clearInterval(timer);
  }, []);

  const visible = promotions
    .filter((p) => (today ? isActiveOn(p, today) : p.visible && isAlwaysOn(p)))
    .sort((a, b) => a.sortOrder - b.sortOrder);

  if (visible.length === 0) return null;

  return (
    <section id="promociones" className="bg-secondary py-16 md:py-24">
      <div className="container">
        <h2 className="mb-12 text-center font-orbitron text-5xl font-bold neon-text">
          {lang === "es" ? "Promociones" : "Promotions"}
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((promo) => {
            const color = colorCss(promo.color);
            const { Icon } = PROMO_ICONS[promo.icon] ?? PROMO_ICONS.bottle;
            const schedule = scheduleLabel(promo, lang);
            return (
              <Card
                key={promo.id}
                className="transform overflow-hidden bg-background/50 text-center transition-transform duration-300 hover:scale-105"
                style={{ borderColor: color, color, boxShadow: `0 0 15px ${color}` }}
              >
                {promo.image && (
                  <img src={promo.image} alt={tr(promo.title, lang)} loading="lazy" className="h-auto w-full" />
                )}
                <CardHeader className="items-center">
                  {!promo.image && (
                    <div className="mb-2 rounded-full bg-background p-4">
                      <Icon className="h-10 w-10" />
                    </div>
                  )}
                  <CardTitle className="font-orbitron text-xl">{tr(promo.title, lang)}</CardTitle>
                  {schedule && (
                    <p className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-current px-3 py-1 text-xs font-semibold">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {schedule}
                    </p>
                  )}
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{tr(promo.description, lang)}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
