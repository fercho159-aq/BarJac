// Initial content, migrated from the original hard-coded menu. Used to seed an
// empty database and as a read-only fallback when no database is configured.
import * as es from "@/lib/menu-data";
import * as en from "@/lib/menu-data-en";
import type {
  ColorKey, HeroSettings, Localized, MenuCategory, MenuItem, Price, Promotion, SiteContent,
} from "./types";

const L = (esText = "", enText = esText): Localized => ({ es: esText ?? "", en: enText ?? "" });
const EMPTY = L();

type RawItem = Record<string, any>;

function category(
  id: string, name: Localized, color: ColorKey, sortOrder: number,
  extra: Partial<MenuCategory> = {},
): MenuCategory {
  return {
    id: `cat-${id}`, parentId: null, sortOrder, visible: true, name,
    description: EMPTY, note: EMPTY, color, childrenDisplay: "tabs", ...extra,
  };
}

function toItems(
  categoryId: string, esList: RawItem[], enList: RawItem[], prices: (e: RawItem) => Price[],
): MenuItem[] {
  return esList.map((e, i) => {
    const n = enList[i] ?? e;
    return {
      id: `${categoryId}-item-${i + 1}`,
      categoryId,
      sortOrder: i,
      visible: true,
      name: L(e.name, n.name),
      quantity: L(e.quantity, n.quantity),
      description: L(e.accompaniment ?? e.ingredients, n.accompaniment ?? n.ingredients),
      prices: prices(e),
      image: null,
    };
  });
}

const single = (e: RawItem): Price[] => [{ label: EMPTY, price: e.price }];
const breakfast = (e: RawItem): Price[] => [
  { label: L("Normal", "Normal"), price: e.priceNormal },
  ...(e.pricePackage ? [{ label: L("Paquete", "Package"), price: e.pricePackage }] : []),
];
const spirits = (e: RawItem): Price[] => [
  { label: L("Copeo", "Glass"), price: e.priceGlass },
  ...(e.priceBottle ? [{ label: L("Botella", "Bottle"), price: e.priceBottle }] : []),
];

export function buildSeedContent(): SiteContent {
  const categories: MenuCategory[] = [];
  const items: MenuItem[] = [];
  const add = (c: MenuCategory, list?: MenuItem[]) => {
    categories.push(c);
    if (list) items.push(...list);
    return c;
  };

  // --- Desayunos, grouped in sections ---
  const desayunos = add(category("desayunos", L("Desayunos", "Breakfast"), "blue", 0, {
    description: L("En paquete te incluimos café, fruta o jugo.", "In a package we include coffee, fruit or juice."),
    childrenDisplay: "sections",
  }));
  const breakfastGroups: [string, string, Localized, Localized][] = [
    ["Huevos", "Eggs", L("Huevos al gusto", "Eggs Your Way"), L(
      "chorizo, jamón, tocino, a la mexicana, rancheros y divorciados. Acompañados de frijoles refritos y ensalada de la casa.",
      "chorizo, ham, bacon, Mexican style, rancheros, and divorced. Served with refried beans and house salad.")],
    ["Chilaquiles", "Chilaquiles", L("Chilaquiles (verdes, rojos o combinados)", "Chilaquiles (green, red or combined)"), L(
      "Crujientes totopos de maíz bañados en salsa roja, verde o una combinación de ambas, acompañados de proteína de elección. Se sirven con cebolla fresca, cilantro, un delicado toque de crema, queso panela y la proteína que prefieras.",
      "Crispy corn tortilla chips bathed in red, green, or a combination of both sauces, accompanied by your choice of protein. Served with fresh onion, cilantro, a delicate touch of cream, panela cheese, and your preferred protein.")],
    ["Enchiladas", "Enchiladas", L("Enchiladas (verdes, rojas o combinadas)", "Enchiladas (green, red or combined)"), L(
      "Delicadas enchiladas preparadas con proteína de tu elección, bañadas en salsa roja, verde o ambas. Se acompañan con cebolla finamente fileteada, cilantro fresco, un toque de crema, queso panela y la proteína que prefieras.",
      "Delicate enchiladas prepared with your choice of protein, bathed in red, green, or both sauces. They are accompanied by finely sliced onion, fresh cilantro, a touch of cream, panela cheese, and your preferred protein.")],
    ["Sopes y Huaraches", "Sopes & Huaraches", L("Sopes y Huaraches", "Sopes & Huaraches"), EMPTY],
  ];
  breakfastGroups.forEach(([esKey, enKey, name, description], i) => {
    const slug = esKey.toLowerCase().replace(/\s+/g, "-");
    const c = add(category(`desayunos-${slug}`, name, "blue", i, { parentId: desayunos.id, description }));
    const esList = (es.breakfastItems as RawItem[]).filter((x) => x.category === esKey);
    const enList = (en.breakfastItemsEn as RawItem[]).filter((x) => x.category === enKey);
    items.push(...toItems(c.id, esList, enList, breakfast));
  });

  // --- Simple food categories ---
  const food: [string, Localized, ColorKey, RawItem[], RawItem[], Partial<MenuCategory>?][] = [
    ["entradas", L("Entradas", "Appetizers"), "green", es.entranceItems, en.entranceItemsEn],
    ["sopas", L("Sopas", "Soups"), "violet", es.soupItems, en.soupItemsEn],
    ["cortes", L("Cortes", "Cuts"), "yellow", es.cutsItems, en.cutsItemsEn],
    ["ensaladas", L("Ensaladas", "Salads"), "orange", es.saladItems, en.saladItemsEn],
    ["mariscos", L("Mariscos", "Seafood"), "magenta", es.seafoodItems, en.seafoodItemsEn],
    ["taco", L("Taco", "Taco"), "red", es.tacoItems, en.tacoItemsEn],
    ["costras", L("Costras", "Costras"), "yellow", es.costrasItems, en.costrasItemsEn, {
      description: L(
        "Exquisita mezcla de quesos de la casa a la plancha, al punto de chicharrón, servidos con 4 tortillas de harina y salsa de la casa.",
        "Exquisite blend of house cheeses on the griddle, crisped to chicharrón point, served with 4 flour tortillas and house salsa."),
    }],
    ["hamburguesas", L("Hamburguesas", "Burgers"), "cyan", es.burgerItems, en.burgerItemsEn, {
      description: L("TODAS LAS HAMBURGUESAS LLEVAN CATSUP Y CHILES CURADOS.", "ALL BURGERS COME WITH KETCHUP AND PICKLED CHILIES."),
    }],
    ["snacks", L("Snacks", "Snacks"), "orange", es.snackItems, en.snackItemsEn, {
      description: L(
        "CON SALSA A ELEGIR (BBQ, BÚFALO, MANGO HABANERO Y MEZCAL, Y TAMARINDO JALAPEÑO)",
        "WITH YOUR CHOICE OF SAUCE (BBQ, BUFFALO, MANGO HABANERO & MEZCAL, AND TAMARIND JALAPEÑO)"),
    }],
    ["compartir", L("Para Compartir", "To Share"), "green", es.compartirItems, en.compartirItemsEn],
    ["postres", L("Postres", "Desserts"), "magenta", es.dessertItems, en.dessertItemsEn],
  ];
  food.forEach(([slug, name, color, esList, enList, extra], i) => {
    const c = add(category(slug, name, color, i + 1, extra));
    items.push(...toItems(c.id, esList, enList, single));
  });

  // --- Bebidas ---
  const bebidas = add(category("bebidas", L("Bebidas", "Drinks"), "gray", food.length + 1));
  const sub = (slug: string, name: Localized, color: ColorKey, order: number, extra: Partial<MenuCategory> = {}) =>
    add(category(slug, name, color, order, { parentId: bebidas.id, ...extra }));

  const refrescos = sub("refrescos", L("Refrescos", "Sodas"), "magenta", 0);
  items.push(...toItems(refrescos.id, es.sodaItems, en.sodaItemsEn, single));

  const cafes = sub("cafes", L("Cafés y Más", "Coffee & More"), "orange", 1);
  items.push(...toItems(cafes.id, es.cafeItems, en.cafeItemsEn, single));

  const cerveza = sub("cerveza", L("Cerveza", "Beer"), "red", 2, {
    note: L("Cerveza 3 x $130 ¡todos los días!", "Beer 3 for $130, every day!"),
    childrenDisplay: "sections",
  });
  const isBottle = (b: RawItem) => b.type === "botella";
  items.push(...toItems(cerveza.id, es.beerItems.filter(isBottle), en.beerItemsEn.filter(isBottle), single));
  const barril = add(category("cerveza-barril", L("CERVEZA DE BARRIL", "DRAFT BEER"), "red", 0, { parentId: cerveza.id }));
  items.push(...toItems(barril.id, es.beerItems.filter((b) => !isBottle(b)), en.beerItemsEn.filter((b) => !isBottle(b)), single));

  const preparados = sub("preparados", L("Preparados", "Preparados"), "violet", 3);
  items.push(...toItems(preparados.id, es.preparadosItems, en.preparadosItemsEn, single));

  const cocteleria = sub("cocteleria", L("Coctelería", "Cocktails"), "green", 4);
  items.push(...toItems(cocteleria.id, es.cocteleriaItems, en.cocteleriaItemsEn, single));

  const destilados = sub("destilados", L("Destilados", "Spirits"), "blue", 5, {
    description: L("Bebidas por botella y copeo", "Drinks by bottle and glass"),
    note: L(
      "En la compra de cada botella, incluye 6 refrescos de 325 ml ¡gratis!",
      "Each bottle purchase includes 6 free 325 ml soft drinks!"),
  });
  const spiritsList: [string, Localized, ColorKey, RawItem[], RawItem[]][] = [
    ["ginebra", L("Ginebra", "Gin"), "sky", es.ginebraItems, en.ginebraItemsEn],
    ["vodka", L("Vodka", "Vodka"), "purple", es.vodkaItems, en.vodkaItemsEn],
    ["tequila", L("Tequila", "Tequila"), "amber", es.tequilaItems, en.tequilaItemsEn],
    ["mezcal", L("Mezcal", "Mezcal"), "lime", es.mezcalItems, en.mezcalItemsEn],
    ["ron", L("Ron", "Rum"), "tangerine", es.ronItems, en.ronItemsEn],
    ["whisky", L("Whisky", "Whisky"), "gold", es.whiskyItems, en.whiskyItemsEn],
    ["bourbon", L("Bourbon", "Bourbon"), "rust", es.bourbonItems, en.bourbonItemsEn],
    ["cognac", L("Coñac", "Cognac"), "crimson", es.cognacItems, en.cognacItemsEn],
    ["brandy", L("Brandy", "Brandy"), "rose", es.brandyItems, en.brandyItemsEn],
    ["licor", L("Licor", "Liqueur"), "pink", es.licorItems, en.licorItemsEn],
  ];
  spiritsList.forEach(([slug, name, color, esList, enList], i) => {
    const c = add(category(slug, name, color, i, { parentId: destilados.id }));
    items.push(...toItems(c.id, esList, enList, spirits));
  });

  const promo = (
    id: string, sortOrder: number, title: Localized, description: Localized,
    icon: Promotion["icon"], color: ColorKey,
  ): Promotion => ({
    id: `promo-${id}`, sortOrder, visible: true, title, description, icon, color,
    image: null, days: [], startDate: null, endDate: null,
  });

  const promotions: Promotion[] = [
    promo("3x2", 0, L("Bebidas y Coctelería al 3x2 ¡Todos los días!", "Drinks & Cocktails 3x2, Every Day!"),
      L("Todos los días, tus bebidas y cocteles favoritos al 3x2.", "Every day, your favorite drinks and cocktails 3 for the price of 2."),
      "bottle", "blue"),
    promo("cerveza", 1, L("Cerveza 3 x $130 ¡Todos los días!", "Beer 3 for $130, Every Day!"),
      L("Llévate 3 cervezas por solo $130, todos los días.", "Get 3 beers for just $130, every day."),
      "bottle", "blue"),
    promo("godin", 2, L("Happy Hour Godín", "Godín Happy Hour"),
      L("Los martes y viernes, muestra tu credencial de trabajo y obtén un 20% de descuento en tu próxima visita.",
        "On Tuesdays and Fridays, show your work ID and get a 20% discount on your next visit."),
      "briefcase", "green"),
    promo("trios", 3, L("Tríos Bar Jac por $199", "Bar Jac Trios for $199"),
      L("De lunes a viernes, disfruta de una comida completa por $199: Sopa o crema del día + Hamburguesa o Tacos de Arrachera o Pescadillas con Cóctel Chico + Bebida sin alcohol.",
        "From Monday to Friday, enjoy a full meal for $199: Soup or cream of the day + Burger or Arrachera Tacos or Pescadillas with a Small Cocktail + Non-alcoholic drink."),
      "utensils", "orange"),
  ];

  return { categories, items, promotions, hero: defaultHero() };
}

export function defaultHero(): HeroSettings {
  return {
    mode: "single",
    slides: [{
      id: "slide-1",
      desktopImage: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2000&auto=format&fit=crop",
      mobileImage: null,
      fitDesktop: "cover",
      fitMobile: "cover",
      alt: "Interior de BarJac",
    }],
    intervalSeconds: 5,
    heightDesktop: "medium",
    heightMobile: "medium",
    overlay: 70,
    showLogo: true,
    showButtons: true,
    tagline: L("Música, amigos y el mejor ambiente de la ciudad.", "Music, friends and the best atmosphere in the city."),
  };
}
