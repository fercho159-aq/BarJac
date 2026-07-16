const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const dataFile = fs.readFileSync(path.join(__dirname, '..', 'src', 'lib', 'menu-data.ts'), 'utf-8');

function extractArray(varName) {
  const regex = new RegExp(`export\\s+const\\s+${varName}\\s*=\\s*\\[([\\s\\S]*?)\\];`, 'm');
  const match = dataFile.match(regex);
  if (!match) return [];
  const arrStr = '[' + match[1] + ']';
  let cleaned = arrStr.replace(/\/\/.*$/gm, '');
  cleaned = cleaned.replace(/"([^"]*)"/g, (m) => '<<DQ>>' + m.slice(1, -1).replace(/'/g, '<<SQ>>').replace(/,/g, '<<COMMA>>') + '<<DQ>>');
  cleaned = cleaned
    .replace(/'/g, '"')
    .replace(/<<DQ>>/g, '"')
    .replace(/<<SQ>>/g, "'")
    .replace(/,\s*([}\]])/g, '$1')
    .replace(/(\w+)\s*:/g, '"$1":')
    .replace(/null/g, 'null')
    .replace(/<<COMMA>>/g, ',');
  try {
    return JSON.parse(cleaned);
  } catch (e) {
    console.error(`Error parsing ${varName}:`, e.message);
    return [];
  }
}

const wb = XLSX.utils.book_new();

function addSheet(name, items, fieldMap) {
  const headers = Object.values(fieldMap);
  const keys = Object.keys(fieldMap);
  const rows = items.map(item => keys.map(k => item[k] ?? ''));
  const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
  ws['!cols'] = headers.map((h, i) => {
    const maxLen = Math.max(h.length, ...rows.map(r => String(r[i] || '').length));
    return { wch: Math.min(maxLen + 2, 60) };
  });
  XLSX.utils.book_append_sheet(wb, ws, name);
}

const foodFieldsPackage = {
  name: 'nombre', quantity: 'cantidad', accompaniment: 'acompañamiento',
  priceNormal: 'precio_normal', pricePackage: 'precio_paquete', category: 'categoria'
};
const foodFields = {
  name: 'nombre', quantity: 'cantidad', accompaniment: 'acompañamiento', price: 'precio'
};

addSheet('Desayunos', extractArray('breakfastItems'), foodFieldsPackage);
addSheet('Entradas', extractArray('entranceItems'), foodFields);
addSheet('Cortes', extractArray('cutsItems'), foodFields);
addSheet('Ensaladas', extractArray('saladItems'), foodFields);
addSheet('Mariscos', extractArray('seafoodItems'), foodFields);
addSheet('Tacos', extractArray('tacoItems'), foodFields);
addSheet('Hamburguesas', extractArray('burgerItems'), foodFields);
addSheet('Pollo', extractArray('chickenItems'), foodFields);
addSheet('Snacks', extractArray('snackItems'), foodFields);

addSheet('Preparados', extractArray('preparadosItems'), {
  name: 'nombre', quantity: 'cantidad', price: 'precio', ingredients: 'ingredientes'
});
addSheet('Refrescos', extractArray('sodaItems'), {
  name: 'nombre', quantity: 'cantidad', price: 'precio'
});
addSheet('Cervezas', extractArray('beerItems'), {
  name: 'nombre', quantity: 'cantidad', price: 'precio', type: 'tipo'
});
addSheet('Cocteleria', extractArray('cocteleriaItems'), {
  name: 'nombre', price: 'precio'
});

const allSpirits = [
  ...extractArray('ginebraItems'), ...extractArray('vodkaItems'),
  ...extractArray('tequilaItems'), ...extractArray('mezcalItems'),
  ...extractArray('ronItems'), ...extractArray('whiskyItems'),
  ...extractArray('bourbonItems'), ...extractArray('cognacItems'),
  ...extractArray('brandyItems'), ...extractArray('licorItems')
];
addSheet('Licores y Destilados', allSpirits, {
  name: 'nombre', category: 'categoria', priceGlass: 'precio_copa', priceBottle: 'precio_botella'
});

const outputPath = path.join(__dirname, '..', 'plantilla_productos_barjac.xlsx');
XLSX.writeFile(wb, outputPath);
console.log(`Plantilla generada exitosamente: ${outputPath}`);
console.log(`Total de hojas: ${wb.SheetNames.length}`);
wb.SheetNames.forEach(name => {
  const ws = wb.Sheets[name];
  const range = XLSX.utils.decode_range(ws['!ref']);
  console.log(`  - ${name}: ${range.e.r} productos`);
});
