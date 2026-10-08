/**
 * Procesa las fotos del folder Fotos/, las sube a la tabla `images` y
 * actualiza menu_items y promotions para que apunten a su imagen.
 *
 * Uso:
 *   Local (PGlite .data/pglite, requiere dev server corriendo para revalidar):
 *     node scripts/upload-menu-images.js
 *
 *   Producción (Neon):
 *     DATABASE_URL="postgresql://..." \
 *     SITE_URL="https://barjac.web.app" \
 *     ADMIN_PASSWORD="..." \
 *       node scripts/upload-menu-images.js
 *
 * Flags:
 *   --dry-run           No escribe nada, sólo muestra lo que haría.
 *   --fotos=<dir>       Carpeta con las fotos (por defecto: Fotos-20261008T031804Z-1-001/Fotos).
 *   --no-revalidate     No llama al endpoint de revalidación al terminar.
 *   --site=<url>        URL del sitio para revalidar (default: http://localhost:9002).
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const sharp = require("sharp");

const argv = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v ?? true];
  }),
);
const DRY_RUN = Boolean(argv["dry-run"]);
const FOTOS_DIR = path.resolve(
  argv.fotos || path.join(__dirname, "..", "Fotos-20261008T031804Z-1-001", "Fotos"),
);
const SITE_URL = (argv.site || process.env.SITE_URL || "http://localhost:9002").replace(/\/$/, "");
const SKIP_REVALIDATE = Boolean(argv["no-revalidate"]);

// Nombre del platillo (ES) → archivo de la foto. El matching es case-insensitive
// y se hace trim para tolerar diferencias entre seed y lo que haya en la BD.
const MENU_ITEM_IMAGES_RAW = {
  "Molcajete Tierra": "DSC05201.jpg",
  "Molcajete Mar y Tierra": "DSC05201.jpg",
  "Hamburguesa clásica": "DSC05236.jpg",
  "Hamburguesa doble carne": "DSC05236.jpg",
  "Hamburguesa tocinito": "DSC05236.jpg",
  "Hamburguesa queso + queso": "DSC05236.jpg",
  "Hamburguesa de la granja": "DSC05236.jpg",
  "Hamburguesa mar y tierra": "DSC05236.jpg",
  "Hamburguesa de la casa": "DSC05236.jpg",
  "Hamburguesa de pollo": "DSC05236.jpg",
  Alitas: "DSC05337.jpg",
  "Dedo de queso (5 pzas)": "DSC05323.jpg",
  "Dedos de queso": "DSC05323.jpg",
  "Charola BarJac": "DSC05352.jpg",
  "Charola de snack": "DSC05352.jpg",
};
const MENU_ITEM_IMAGES = Object.fromEntries(
  Object.entries(MENU_ITEM_IMAGES_RAW).map(([k, v]) => [k.toLowerCase().trim(), v]),
);

// Promociones: la primera regex que haga match en el título (ES) gana.
const PROMO_IMAGES = [
  { match: /jacalit|alita.*cerveza|cerveza.*alita/i, file: "DSC05274.jpg" },
  { match: /molcajete.*cerveza|cerveza.*molcajete|molcajete.*mar/i, file: "DSC05293.jpg" },
  { match: /2.*hamburgues|dos.*hamburgues|hamburgues.*2/i, file: "DSC05321.jpg" },
  { match: /charola.*10|combo.*10|10.*cerveza|799/i, file: "DSC05369.jpg" },
  { match: /charola|superbol|bongles/i, file: "DSC05352.jpg" },
];

async function processImage(filePath) {
  const buf = await sharp(filePath)
    .rotate() // respeta orientación EXIF
    .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 85 })
    .toBuffer();
  return { mime: "image/webp", bytes: buf };
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
    console.log(`→ Conectado a Neon (${host})`);
    return {
      kind: "neon",
      query: async (text, params = []) => await sql.query(text, params),
    };
  }
  const { PGlite } = await import("@electric-sql/pglite");
  const dir = path.join(__dirname, "..", ".data", "pglite");
  const dbInstance = new PGlite(dir);
  await dbInstance.waitReady;
  console.log(`→ PGlite local (${path.relative(process.cwd(), dir) || dir})`);
  return {
    kind: "pglite",
    query: async (text, params = []) => (await dbInstance.query(text, params)).rows,
  };
}

async function main() {
  if (!fs.existsSync(FOTOS_DIR)) {
    console.error(`✗ Carpeta de fotos no encontrada: ${FOTOS_DIR}`);
    process.exit(1);
  }
  console.log(`→ Fotos: ${FOTOS_DIR}`);
  if (DRY_RUN) console.log("→ DRY RUN: no se escribirá nada\n");
  else console.log();

  const db = await openDb();

  // 1. Procesar y subir cada archivo único una sola vez.
  const uniqueFiles = new Set();
  Object.values(MENU_ITEM_IMAGES).forEach((f) => uniqueFiles.add(f));
  PROMO_IMAGES.forEach((p) => uniqueFiles.add(p.file));

  const fileToUrl = {};
  for (const file of uniqueFiles) {
    const filePath = path.join(FOTOS_DIR, file);
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠ Foto no encontrada, se omite: ${file}`);
      continue;
    }
    const { mime, bytes } = await processImage(filePath);
    const id = crypto.randomUUID().replace(/-/g, "");
    if (!DRY_RUN) {
      await db.query(
        `INSERT INTO images (id, mime, size, data) VALUES ($1, $2, $3, decode($4, 'base64'))`,
        [id, mime, bytes.length, bytes.toString("base64")],
      );
    }
    fileToUrl[file] = `/api/images/${id}`;
    console.log(
      `✓ ${file.padEnd(16)} → ${fileToUrl[file]}  (${Math.round(bytes.length / 1024)} KB)`,
    );
  }

  // 2. Actualizar menu_items.
  console.log("\n— Platillos —");
  const items = await db.query(`SELECT id, data FROM menu_items`);
  let itemsUpdated = 0;
  const assignedFiles = new Set(); // fotos que al menos un platillo (por cualquiera de sus alias) usó
  for (const row of items) {
    const data = typeof row.data === "string" ? JSON.parse(row.data) : row.data;
    const name = data?.name?.es;
    if (!name) continue;
    const file = MENU_ITEM_IMAGES[name.toLowerCase().trim()];
    if (!file || !fileToUrl[file]) continue;
    data.image = fileToUrl[file];
    if (!DRY_RUN) {
      await db.query(`UPDATE menu_items SET data = $1::jsonb WHERE id = $2`, [
        JSON.stringify(data),
        row.id,
      ]);
    }
    console.log(`  ${name.padEnd(32)} ← ${file}`);
    itemsUpdated++;
    assignedFiles.add(file);
  }
  // Sólo avisamos de aliases que no existen Y cuya foto tampoco fue asignada por
  // ningún otro alias — así los sinónimos (p.ej. "Dedos de queso" vs "Dedo de
  // queso (5 pzas)") no generan ruido cuando uno de los dos sí matcheó.
  const foundKeys = new Set(
    items
      .map((r) => {
        const d = typeof r.data === "string" ? JSON.parse(r.data) : r.data;
        return d?.name?.es;
      })
      .filter(Boolean)
      .map((n) => n.toLowerCase().trim()),
  );
  const missing = Object.entries(MENU_ITEM_IMAGES_RAW).filter(
    ([k, v]) => !foundKeys.has(k.toLowerCase().trim()) && !assignedFiles.has(v),
  );
  if (missing.length) {
    console.log(`\n⚠ Platillos del mapeo que no existen en la BD (nombre no coincide):`);
    missing.forEach(([k, v]) => console.log(`    - "${k}"  (foto: ${v})`));
  }

  // 3. Actualizar promotions.
  console.log("\n— Promociones —");
  const promos = await db.query(`SELECT id, data FROM promotions`);
  let promosUpdated = 0;
  const unmatchedPromos = [];
  for (const row of promos) {
    const data = typeof row.data === "string" ? JSON.parse(row.data) : row.data;
    const title = data?.title?.es || "";
    const match = PROMO_IMAGES.find((p) => p.match.test(title));
    if (!match || !fileToUrl[match.file]) {
      unmatchedPromos.push(title);
      continue;
    }
    data.image = fileToUrl[match.file];
    if (!DRY_RUN) {
      await db.query(`UPDATE promotions SET data = $1::jsonb WHERE id = $2`, [
        JSON.stringify(data),
        row.id,
      ]);
    }
    console.log(`  ${title.slice(0, 48).padEnd(48)} ← ${match.file}`);
    promosUpdated++;
  }
  if (unmatchedPromos.length) {
    console.log(`\n⚠ Promociones sin match en el mapeo:`);
    unmatchedPromos.forEach((t) => console.log(`    - ${t}`));
  }

  console.log(
    `\nResumen: ${Object.keys(fileToUrl).length} imágenes subidas · ` +
      `${itemsUpdated} platillos · ${promosUpdated} promociones` +
      (DRY_RUN ? " (dry-run)" : ""),
  );

  // 4. Revalidar el cache de Next.js para que el sitio muestre lo nuevo.
  if (DRY_RUN || SKIP_REVALIDATE) return;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    console.log(
      `\n⚠ ADMIN_PASSWORD no está en el entorno; no se revalidará el cache.\n  Reinicia el dev server o toca cualquier cosa en /admin para que se refleje.`,
    );
    return;
  }
  try {
    const res = await fetch(`${SITE_URL}/api/admin/revalidate`, {
      method: "POST",
      headers: { Authorization: `Bearer ${adminPassword}` },
    });
    if (res.ok) {
      console.log(`\n✓ Cache revalidado en ${SITE_URL}`);
    } else {
      console.log(
        `\n⚠ Revalidación falló (${res.status}). Reinicia el server o toca algo en /admin.`,
      );
    }
  } catch (err) {
    console.log(
      `\n⚠ No se pudo conectar a ${SITE_URL} para revalidar: ${err.message}.` +
        `\n  Si lo corres contra prod, pasa --site=https://tu-sitio o reinicia Vercel.`,
    );
  }
}

main().catch((err) => {
  console.error("\n✗ Error:", err);
  process.exit(1);
});
