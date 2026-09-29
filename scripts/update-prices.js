const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const wb = XLSX.readFile('/root/.claude/uploads/0407ca0a-c3e4-5bff-97f6-fe2885997c18/811178eb-Nuevos_Precios_Junio_2026.xlsx');
const ws = wb.Sheets['Hoja1'];
const rows = XLSX.utils.sheet_to_json(ws);

// Parse Excel into structured sections
let currentSection = '';
let currentSubSection = '';
const priceMap = {};

for (const row of rows) {
  const name = (row['__EMPTY'] || '').trim();
  const newPrice = row[' P.V. Nuevo Variado '];
  const newPricePaq = row['__EMPTY_3'];

  // Section headers (no prices)
  if (!row[' P.V. '] && !row[' P.V. Nuevo 40% '] && newPrice === undefined) {
    if (['DESAYUNO', 'COMIDA', 'SNACK', 'BEBIDAS', 'CERVEZAS', 'PREPARADOS',
         'REFRESCOS', 'AGUAS', 'CAFES', 'OTROS', 'CUBAS', 'CALDOS SOPAS Y CREMAS',
         'POSTRES', 'HUARACHE', 'ORDEN DE SOPES', 'COSTRAS DE PROTEINA'].includes(name)) {
      currentSection = name;
      currentSubSection = '';
      continue;
    }
  }

  if (newPrice === undefined && !row[' P.V. ']) continue;
  if (newPrice === 0 && !row[' P.V. ']) continue; // Skip items with 0 price and no old price

  const key = `${currentSection}::${name}`;
  priceMap[key] = {
    section: currentSection,
    name,
    newPrice: newPrice !== undefined && newPrice !== 0 ? newPrice : null,
    newPricePaq: newPricePaq !== undefined ? newPricePaq : null,
    oldPrice: row[' P.V. '] || null,
  };
}

// Debug output
const sections = {};
for (const [key, val] of Object.entries(priceMap)) {
  const s = val.section;
  if (!sections[s]) sections[s] = [];
  sections[s].push(val);
}

for (const [section, items] of Object.entries(sections)) {
  console.log(`\n=== ${section} (${items.length} items) ===`);
  items.forEach(i => console.log(`  ${i.name}: ${i.newPrice}${i.newPricePaq ? '/' + i.newPricePaq : ''}`));
}
