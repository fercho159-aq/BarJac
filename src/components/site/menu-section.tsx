"use client";

import { useMemo, useState } from "react";
import { PartyPopper } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { colorCss } from "@/lib/content/palette";
import type { Lang, Localized, MenuCategory, MenuItem } from "@/lib/content/types";

export const tr = (l: Localized | undefined, lang: Lang) => (l ? l[lang] || l.es : "");

type Tree = {
  children: Map<string | null, MenuCategory[]>;
  items: Map<string, MenuItem[]>;
};

function useTree(categories: MenuCategory[], items: MenuItem[]): Tree {
  return useMemo(() => {
    const children = new Map<string | null, MenuCategory[]>();
    for (const c of categories) {
      if (!c.visible) continue;
      const list = children.get(c.parentId) ?? [];
      list.push(c);
      children.set(c.parentId, list);
    }
    children.forEach((list) => list.sort((a, b) => a.sortOrder - b.sortOrder));
    const byCat = new Map<string, MenuItem[]>();
    for (const i of items) {
      if (!i.visible) continue;
      const list = byCat.get(i.categoryId) ?? [];
      list.push(i);
      byCat.set(i.categoryId, list);
    }
    byCat.forEach((list) => list.sort((a, b) => a.sortOrder - b.sortOrder));
    return { children, items: byCat };
  }, [categories, items]);
}

function ItemCard({ item, lang, color }: { item: MenuItem; lang: Lang; color: string }) {
  const prices = item.prices.filter((p) => p.price);
  const quantity = tr(item.quantity, lang);
  const description = tr(item.description, lang);
  return (
    <Card className="overflow-hidden bg-secondary border-primary/20">
      {item.image && (
        <img src={item.image} alt={tr(item.name, lang)} loading="lazy" className="aspect-[4/3] w-full object-cover" />
      )}
      <CardHeader>
        <CardTitle>{tr(item.name, lang)}</CardTitle>
      </CardHeader>
      <CardContent>
        {quantity && <p className="text-sm text-muted-foreground">{quantity}</p>}
        {description && <p className="mb-2 text-sm text-muted-foreground">{description}</p>}
        {prices.length === 1 && !tr(prices[0].label, lang) ? (
          <p className="text-lg font-semibold" style={{ color }}>${prices[0].price}</p>
        ) : (
          prices.length > 0 && (
            <div className="mt-4 flex items-center justify-between gap-4">
              {prices.map((p, i) => (
                <div key={i} className={cn(i > 0 && i === prices.length - 1 && "text-right")}>
                  <p className="font-semibold">{tr(p.label, lang)}:</p>
                  <p className="text-lg font-bold" style={{ color }}>${p.price}</p>
                </div>
              ))}
            </div>
          )
        )}
      </CardContent>
    </Card>
  );
}

function CategoryTabs({
  categories, tree, lang, depth, value, onValueChange,
}: {
  categories: MenuCategory[]; tree: Tree; lang: Lang; depth: number;
  value?: string; onValueChange?: (v: string) => void;
}) {
  if (categories.length === 0) return null;
  return (
    <Tabs
      defaultValue={value === undefined ? categories[0].id : undefined}
      value={value}
      onValueChange={onValueChange}
      className="w-full"
    >
      <TabsList className="mb-8 flex h-auto flex-wrap justify-center gap-3 bg-transparent p-1">
        {categories.map((c) => (
          <TabsTrigger
            key={c.id}
            value={c.id}
            style={{ "--c": colorCss(c.color) } as React.CSSProperties}
            className={cn(
              "neon-tab rounded-full border-2 px-3 py-2 text-base font-bold transition-all duration-300 md:text-lg",
              depth === 0 ? "neon-tab-quiet" : "neon-tab-outline",
            )}
          >
            {tr(c.name, lang)}
          </TabsTrigger>
        ))}
      </TabsList>
      {categories.map((c) => (
        <TabsContent key={c.id} value={c.id}>
          <CategoryBody category={c} tree={tree} lang={lang} depth={depth} />
        </TabsContent>
      ))}
    </Tabs>
  );
}

function CategoryBody({
  category, tree, lang, depth, asSection = false,
}: { category: MenuCategory; tree: Tree; lang: Lang; depth: number; asSection?: boolean }) {
  const color = colorCss(category.color);
  const items = tree.items.get(category.id) ?? [];
  const children = tree.children.get(category.id) ?? [];
  const description = tr(category.description, lang);
  const note = tr(category.note, lang);
  const showTitle = asSection || depth <= 1;

  return (
    <div className={cn(asSection && "mb-12")}>
      {(showTitle || description || note) && (
        <div className="mb-6 text-center">
          {showTitle && tr(category.name, lang) && (asSection ? (
            <h4 className="font-orbitron text-3xl font-bold text-primary">{tr(category.name, lang)}</h4>
          ) : (
            <h3 className="font-orbitron text-4xl font-bold" style={{ color }}>{tr(category.name, lang)}</h3>
          ))}
          {description && <p className="mx-auto mt-2 max-w-3xl text-muted-foreground">{description}</p>}
          {note && (
            <div className="mx-auto mb-8 mt-4 max-w-md rounded-lg border-2 border-[hsl(var(--neon-cyan))] bg-secondary p-4 shadow-[0_0_15px_hsl(var(--neon-cyan))]">
              <div className="flex items-center justify-center gap-3">
                <PartyPopper className="h-8 w-8 text-[hsl(var(--neon-cyan))]" />
                <p className="text-lg font-bold text-[hsl(var(--neon-cyan))]">{lang === "es" ? "¡PROMOCIÓN!" : "PROMOTION!"}</p>
              </div>
              <p className="mt-2 text-white">{note}</p>
            </div>
          )}
        </div>
      )}

      {items.length > 0 && (
        <div
          className={cn(
            "grid grid-cols-1 gap-6",
            items.length <= 2 ? "mx-auto max-w-3xl sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3",
            children.length > 0 && "mb-12",
          )}
        >
          {items.map((item) => (
            <ItemCard key={item.id} item={item} lang={lang} color={color} />
          ))}
        </div>
      )}

      {children.length > 0 &&
        (category.childrenDisplay === "sections" ? (
          children.map((child) => (
            <CategoryBody key={child.id} category={child} tree={tree} lang={lang} depth={depth + 1} asSection />
          ))
        ) : (
          <CategoryTabs categories={children} tree={tree} lang={lang} depth={depth + 1} />
        ))}
    </div>
  );
}

export function MenuSection({ categories, items, lang }: { categories: MenuCategory[]; items: MenuItem[]; lang: Lang }) {
  const tree = useTree(categories, items);
  const roots = tree.children.get(null) ?? [];
  const [active, setActive] = useState<string | undefined>(undefined);

  return (
    <section id="menu" className="py-16 md:py-24">
      <div className="container">
        <h2 className="mb-12 text-center font-orbitron text-5xl font-bold neon-text">
          {lang === "es" ? "Nuestro Menú" : "Our Menu"}
        </h2>
        {roots.length > 0 && (
          <CategoryTabs
            categories={roots}
            tree={tree}
            lang={lang}
            depth={0}
            value={active && roots.some((r) => r.id === active) ? active : roots[0].id}
            onValueChange={setActive}
          />
        )}
      </div>
    </section>
  );
}
