const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const inputPath = process.argv[2] || path.join(__dirname, '..', 'plantilla_productos_barjac.xlsx');

if (!fs.existsSync(inputPath)) {
  console.error(`Archivo no encontrado: ${inputPath}`);
  process.exit(1);
}

const wb = XLSX.readFile(inputPath);

function readSheet(sheetName) {
  const ws = wb.Sheets[sheetName];
  if (!ws) return [];
  return XLSX.utils.sheet_to_json(ws);
}

function esc(val) {
  if (val === null || val === undefined) return 'null';
  return `"${String(val).replace(/"/g, '\\"')}"`;
}

function genFoodItems(varName, sheetName, hasPackage = false) {
  const rows = readSheet(sheetName);
  if (!rows.length) return '';
  const items = rows.map(r => {
    if (hasPackage) {
      return `    { name: ${esc(r.nombre)}, quantity: ${esc(r.cantidad)}, accompaniment: ${esc(r['acompañamiento'] || '')}, priceNormal: ${esc(r.precio_normal)}, pricePackage: ${esc(r.precio_paquete)}, category: ${esc(r.categoria)} }`;
    }
    return `    { name: ${esc(r.nombre)}, quantity: ${esc(r.cantidad)}, accompaniment: ${esc(r['acompañamiento'] || '')}, price: ${esc(r.precio)} }`;
  });
  return `export const ${varName} = [\n${items.join(',\n')}\n];\n`;
}

function genDrinkItems(varName, sheetName, fieldMap) {
  const rows = readSheet(sheetName);
  if (!rows.length) return '';
  const items = rows.map(r => {
    const fields = Object.entries(fieldMap).map(([tsKey, excelKey]) => {
      const val = r[excelKey];
      if (val === null || val === undefined || val === '') {
        return tsKey === 'priceBottle' ? `${tsKey}: null` : `${tsKey}: ""`;
      }
      return `${tsKey}: ${esc(val)}`;
    });
    return `    { ${fields.join(', ')} }`;
  });
  return `export const ${varName} = [\n${items.join(',\n')}\n];\n`;
}

let output = '\n\n';

output += genFoodItems('breakfastItems', 'Desayunos', true);
output += '\n' + genFoodItems('entranceItems', 'Entradas');
output += '\n' + genFoodItems('cutsItems', 'Cortes');
output += '\n' + genFoodItems('saladItems', 'Ensaladas');
output += '\n' + genFoodItems('seafoodItems', 'Mariscos');
output += '\n' + genFoodItems('tacoItems', 'Tacos');
output += '\n' + genFoodItems('burgerItems', 'Hamburguesas');
output += '\n' + genFoodItems('chickenItems', 'Pollo');
output += '\n' + genFoodItems('snackItems', 'Snacks');

output += '\n' + genDrinkItems('preparadosItems', 'Preparados', {
  name: 'nombre', quantity: 'cantidad', price: 'precio', ingredients: 'ingredientes'
});
output += '\n' + genDrinkItems('sodaItems', 'Refrescos', {
  name: 'nombre', quantity: 'cantidad', price: 'precio'
});
output += '\n' + genDrinkItems('beerItems', 'Cervezas', {
  name: 'nombre', quantity: 'cantidad', price: 'precio', type: 'tipo'
});
output += '\n' + genDrinkItems('cocteleriaItems', 'Cocteleria', {
  name: 'nombre', price: 'precio'
});

// Spirits - split by category
const spiritsRows = readSheet('Licores y Destilados');
const spiritFields = { name: 'nombre', category: 'categoria', priceGlass: 'precio_copa', priceBottle: 'precio_botella' };

const spiritGroups = {
  ginebraItems: 'Ginebra',
  vodkaItems: 'Vodka',
  tequilaItems: 'Tequila',
  mezcalItems: 'Mezcal',
  ronItems: 'Ron',
  whiskyItems: 'Whisky',
  bourbonItems: 'Bourbon',
  cognacItems: 'Coñac',
  brandyItems: 'Brandy',
  licorItems: null
};

const knownCategories = new Set(Object.values(spiritGroups).filter(Boolean));

for (const [varName, category] of Object.entries(spiritGroups)) {
  const filtered = category
    ? spiritsRows.filter(r => r.categoria === category)
    : spiritsRows.filter(r => !knownCategories.has(r.categoria));

  if (!filtered.length) continue;

  const items = filtered.map(r => {
    const fields = Object.entries(spiritFields).map(([tsKey, excelKey]) => {
      const val = r[excelKey];
      if ((val === null || val === undefined || val === '') && tsKey === 'priceBottle') {
        return `${tsKey}: null`;
      }
      return `${tsKey}: ${esc(val)}`;
    });
    return `    { ${fields.join(', ')} }`;
  });
  output += `\nexport const ${varName} = [\n${items.join(',\n')}\n];\n`;
}

const outputPath = path.join(__dirname, '..', 'src', 'lib', 'menu-data.ts');
fs.writeFileSync(outputPath, output);
console.log(`menu-data.ts actualizado desde: ${inputPath}`);
console.log('Hojas procesadas:', wb.SheetNames.join(', '));
