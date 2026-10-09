/**
 * Procesa las fotos nuevas del folder `menu digital-...` a WebP en
 * public/images/menu/*.webp (sirven estáticamente, van al git) y luego
 * actualiza en Neon los platillos y bebidas que matchean con alguna foto
 * para que apunten a esos paths estáticos. Al final llama a /api/admin/revalidate.
 *
 * Uso:
 *   Local (PGlite): node scripts/update-menu-photos.js
 *   Prod (Neon):
 *     DATABASE_URL="postgresql://..." \
 *     ADMIN_PASSWORD="..." \
 *     SITE_URL="https://www.barjac.com.mx" \
 *       node scripts/update-menu-photos.js
 *
 * Flags:
 *   --dry-run       No escribe ni al disco ni a la BD.
 *   --skip-process  Asume que las webp ya existen en public/images/menu/.
 *   --no-revalidate No llama al endpoint de revalidación.
 */

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const argv = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v ?? true];
  }),
);
const DRY_RUN = Boolean(argv["dry-run"]);
const SKIP_PROCESS = Boolean(argv["skip-process"]);
const SKIP_REVALIDATE = Boolean(argv["no-revalidate"]);
const SITE_URL = (argv.site || process.env.SITE_URL || "http://localhost:9002").replace(/\/$/, "");

const FOTOS_DIR = path.resolve(
  argv.fotos || path.join(__dirname, "..", "menu digital-20261009T155934Z-1-001", "menu digital"),
);
const OUT_DIR = path.resolve(path.join(__dirname, "..", "public", "images", "menu"));
const PUBLIC_BASE = "/images/menu";

// Nombre del archivo original → slug para el archivo WebP de salida.
// El slug es también la raíz del nombre que se usa en el URL público.
const FILES = {
  "aguachile.jpg": "aguachile",
  "cantarito.jpg": "cantarito",
  "charola de snacks.png": "charola-de-snacks",
  "con tosino.jpg": "hamburguesa-tocinito",
  "corte de carne.jpg": "corte-de-carne",
  "cosmopolitan.png": "cosmopolitan",
  "este podria ir en donde te mandaron cap.png": "galeria-barjac",
  "hamburguesa con _.jpg": "hamburguesa",
  "hamburguesa de la granja.jpg": "hamburguesa-de-la-granja",
  "lady pink.png": "lady-pink",
  "mojito.png": "mojito",
  "tacos.jpg": "tacos",
};

// Nombre del platillo (ES) → slug de la foto. Case-insensitive, trim.
const MENU_ITEM_IMAGES_RAW = {
  "Aguachile negro": "aguachile",
  "Hamburguesa de la granja": "hamburguesa-de-la-granja",
  "Hamburguesa tocinito": "hamburguesa-tocinito",
  "Charola BarJac": "charola-de-snacks",
  "Rib eye a la parrilla": "corte-de-carne",
  "Sirloin a la parrilla": "corte-de-carne",
  "New York a la parrilla": "corte-de-carne",
  "Taco de arrachera": "tacos",
  "Taco de rib eye": "tacos",
  "Taco de sirloin": "tacos",
  "Taco de New York": "tacos",
  Mojito: "mojito",
  Cosmopolitan: "cosmopolitan",
  "Pink Lady": "lady-pink",
  Mezcalita: "cantarito",
};
const MENU_ITEM_IMAGES = Object.fromEntries(
  Object.entries(MENU_ITEM_IMAGES_RAW).map(([k, v]) => [k.toLowerCase().trim(), v]),
);

const slugToUrl = (slug) => `${PUBLIC_BASE}/${slug}.webp`;

async function processImage(srcPath, outPath) {
  const buf = await sharp(srcPath)
    .rotate()
    .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 85 })
    .toBuffer();
  if (!DRY_RUN) fs.writeFileSync(outPath, buf);
  return buf.length;
}

async function openDb() {
  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (connectionString) {
    const { neon } = require("@neondatabase/serverless");
    const sql = neon(connectionString);
    const host = (() => {
      try {
        return new URL(connectionString).host;
      } catch {
        return "neon";
      }
    })();
    console.log(`→ Neon (${host})`);
    return { query: async (text, params = []) => await sql.query(text, params) };
  }
  const { PGlite } = await import("@electric-sql/pglite");
  const dir = path.join(__dirname, "..", ".data", "pglite");
  const db = new PGlite(dir);
  await db.waitReady;
  console.log(`→ PGlite local (${path.relative(process.cwd(), dir) || dir})`);
  return { query: async (text, params = []) => (await db.query(text, params)).rows };
}

async function main() {
  console.log(`→ Fotos: ${FOTOS_DIR}`);
  console.log(`→ Salida: ${OUT_DIR}`);
  if (DRY_RUN) console.log("→ DRY RUN: no se escribe nada");
  console.log();

  if (!fs.existsSync(FOTOS_DIR)) {
    console.error(`✗ Carpeta no encontrada: ${FOTOS_DIR}`);
    process.exit(1);
  }
  if (!DRY_RUN && !SKIP_PROCESS) fs.mkdirSync(OUT_DIR, { recursive: true });

  // 1. Procesar fotos → WebP en public/images/menu/.
  console.log("— Procesando fotos —");
  for (const [src, slug] of Object.entries(FILES)) {
    const srcPath = path.join(FOTOS_DIR, src);
    const outPath = path.join(OUT_DIR, `${slug}.webp`);
    if (!fs.existsSync(srcPath)) {
      console.warn(`⚠ Falta foto, se omite: ${src}`);
      continue;
    }
    if (SKIP_PROCESS && fs.existsSync(outPath)) {
      console.log(`  ${slug.padEnd(28)} (ya existe, saltado)`);
      continue;
    }
    const size = await processImage(srcPath, outPath);
    console.log(`  ${slug.padEnd(28)} ← ${src}  (${Math.round(size / 1024)} KB)`);
  }

  // 2. Actualizar menu_items en la BD con los paths estáticos.
  console.log("\n— Platillos (BD) —");
  const db = await openDb();
  const items = await db.query(`SELECT id, data FROM menu_items`);
  let itemsUpdated = 0;
  const assignedSlugs = new Set();
  for (const row of items) {
    const data = typeof row.data === "string" ? JSON.parse(row.data) : row.data;
    const name = data?.name?.es;
    if (!name) continue;
    const slug = MENU_ITEM_IMAGES[name.toLowerCase().trim()];
    if (!slug) continue;
    const newUrl = slugToUrl(slug);
    if (data.image === newUrl) {
      console.log(`  ${name.padEnd(32)} = ${newUrl} (sin cambio)`);
      assignedSlugs.add(slug);
      continue;
    }
    const prev = data.image || "(vacío)";
    data.image = newUrl;
    if (!DRY_RUN) {
      await db.query(`UPDATE menu_items SET data = $1::jsonb WHERE id = $2`, [
        JSON.stringify(data),
        row.id,
      ]);
    }
    console.log(`  ${name.padEnd(32)} ← ${slug}   (antes: ${prev.slice(0, 40)})`);
    itemsUpdated++;
    assignedSlugs.add(slug);
  }

  const foundKeys = new Set(
    items
      .map((r) => (typeof r.data === "string" ? JSON.parse(r.data) : r.data)?.name?.es)
      .filter(Boolean)
      .map((n) => n.toLowerCase().trim()),
  );
  const missing = Object.entries(MENU_ITEM_IMAGES_RAW).filter(
    ([k, v]) => !foundKeys.has(k.toLowerCase().trim()) && !assignedSlugs.has(v),
  );
  if (missing.length) {
    console.log(`\n⚠ Platillos del mapeo que no existen en la BD:`);
    missing.forEach(([k, v]) => console.log(`    - "${k}" (${v})`));
  }

  console.log(
    `\nResumen: ${Object.keys(FILES).length} fotos procesadas · ${itemsUpdated} platillos actualizados` +
      (DRY_RUN ? " (dry-run)" : ""),
  );

  // 3. Revalidar.
  if (DRY_RUN || SKIP_REVALIDATE) return;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    console.log(
      `\n⚠ ADMIN_PASSWORD no está en el entorno; no se revalidará el cache.\n  Toca cualquier cosa en /admin para que se refleje.`,
    );
    return;
  }
  try {
    const res = await fetch(`${SITE_URL}/api/admin/revalidate`, {
      method: "POST",
      headers: { Authorization: `Bearer ${adminPassword}` },
    });
    if (res.ok) console.log(`\n✓ Cache revalidado en ${SITE_URL}`);
    else console.log(`\n⚠ Revalidación falló (${res.status}).`);
  } catch (err) {
    console.log(`\n⚠ No se pudo conectar a ${SITE_URL}: ${err.message}`);
  }
}

main().catch((err) => {
  console.error("\n✗ Error:", err);
  process.exit(1);
});
