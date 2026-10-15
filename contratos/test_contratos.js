/**
 * Suite de Verificación Rigurosa para la suite de Contratos y Generador
 * Nancy García Decoración · Globos · Detalles
 * Modo Pickle Rick - Zero Jerry-work
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('🧪 Iniciando verificación rigurosa de suite de contratos...');

const CONTRATOS_DIR = path.resolve(__dirname);

// 1. Verificar existencia de archivos obligatorios
const requiredFiles = [
  'index.html',
  'styles.css',
  'app.js',
  'sw.js',
  'manifest.json',
  'PROTOCOLO_OPERATIVO_CONTRATOS.md',
  'README.md',
  'assets/nancy_eventos_logo_oficial.png',
  'assets/icon-192.png',
  'assets/icon-512.png',
  'assets/apple-touch-icon.png'
];

requiredFiles.forEach(file => {
  const fullPath = path.join(CONTRATOS_DIR, file);
  assert(fs.existsSync(fullPath), `Error: Archivo mandatorio ${file} no existe en ${CONTRATOS_DIR}`);
  const stat = fs.statSync(fullPath);
  assert(stat.size > 50, `Error: Archivo ${file} está sospechosamente vacío (${stat.size} bytes)`);
  console.log(`  ✓ Archivo verificado: ${file} (${stat.size} bytes)`);
});

// 2. Verificar consistencia del Catálogo de Paquetes
const appJsContent = fs.readFileSync(path.join(CONTRATOS_DIR, 'app.js'), 'utf-8');

// Comprobar presencia de claves de paquetes oficiales
assert(appJsContent.includes('paquete1'), 'Falta definición de paquete1 en app.js');
assert(appJsContent.includes('paquete2'), 'Falta definición de paquete2 en app.js');
assert(appJsContent.includes('paquete3'), 'Falta definición de paquete3 en app.js');

// Comprobar tarifas oficiales de Paquete 1
assert(appJsContent.includes('juarez_guadalupe: 2000'), 'Paquete 1 Juárez/Guadalupe debe costar $2,000');
assert(appJsContent.includes('monterrey: 2500'), 'Paquete 1 Monterrey debe costar $2,500');

// Comprobar tarifas oficiales de Paquete 2
assert(appJsContent.includes('juarez_guadalupe: 4000'), 'Paquete 2 Juárez/Guadalupe debe costar $4,000');
assert(appJsContent.includes('monterrey: 4200'), 'Paquete 2 Monterrey debe costar $4,200');

// Comprobar tarifas oficiales de Paquete 3
assert(appJsContent.includes('juarez_guadalupe: 1900'), 'Paquete 3 Juárez/Guadalupe debe costar $1,900');
assert(appJsContent.includes('monterrey: 2200'), 'Paquete 3 Monterrey debe costar $2,200');

console.log('  ✓ Tarifas oficiales de Paquetes 1, 2 y 3 verificadas contra catálogo oficial.');

// 3. Comprobar cláusulas legales y blindaje climático en index.html
const indexHtmlContent = fs.readFileSync(path.join(CONTRATOS_DIR, 'index.html'), 'utf-8');

assert(indexHtmlContent.includes('PRIMERA. OBJETO:'), 'Falta cláusula Primera (Objeto)');
assert(indexHtmlContent.includes('SEGUNDA. PRECIO Y FORMA DE LIQUIDACIÓN:'), 'Falta cláusula Segunda (Pago y Saldo)');
assert(indexHtmlContent.includes('TERCERA. CUIDADO Y RESPONSABILIDAD DEL MOBILIARIO EN RENTA:'), 'Falta cláusula Tercera (Mobiliario)');
assert(indexHtmlContent.includes('CUARTA. CONDICIONES CLIMÁTICAS EN NUEVO LEÓN (GLOBOS):'), 'Falta cláusula Cuarta (Clima NL)');
assert(indexHtmlContent.includes('QUINTA. CANCELACIONES O CAMBIOS DE FECHA:'), 'Falta cláusula Quinta (Cancelaciones)');
assert(indexHtmlContent.includes('High-Shine'), 'Falta mención al tratamiento profesional High-Shine');
assert(indexHtmlContent.includes('81-1062-6302'), 'Falta WhatsApp oficial de Nancy García');
assert(indexHtmlContent.includes('NANCY EVENTOS'), 'Falta marca oficial NANCY EVENTOS en index.html');

console.log('  ✓ Cláusulas legales, garantía y marca NANCY EVENTOS verificadas en index.html.');

// 4. Comprobar reglas de impresión en styles.css
const stylesContent = fs.readFileSync(path.join(CONTRATOS_DIR, 'styles.css'), 'utf-8');
assert(stylesContent.includes('@media print'), 'Falta bloque @media print en styles.css');
assert(stylesContent.includes('size: letter portrait'), 'Falta configuración de tamaño Carta/Letter en @page');
assert(stylesContent.includes('-webkit-print-color-adjust: exact'), 'Falta preservación de colores de impresión');

console.log('  ✓ Reglas de exportación e impresión @media print Letter verificadas en styles.css.');

// 5. Comprobar PWA (Manifest y Service Worker)
const manifestContent = fs.readFileSync(path.join(CONTRATOS_DIR, 'manifest.json'), 'utf-8');
assert(manifestContent.includes('"display": "standalone"'), 'Manifest debe tener display standalone');
assert(manifestContent.includes('icon-192.png'), 'Manifest debe incluir icon-192.png');
assert(manifestContent.includes('icon-512.png'), 'Manifest debe incluir icon-512.png');

const swContent = fs.readFileSync(path.join(CONTRATOS_DIR, 'sw.js'), 'utf-8');
assert(swContent.includes('CACHE_NAME'), 'Service Worker debe definir CACHE_NAME');
assert(swContent.includes('addEventListener(\'fetch\''), 'Service Worker debe manejar evento fetch para offline');

assert(indexHtmlContent.includes('rel="manifest" href="manifest.json"'), 'index.html debe vincular manifest.json');
assert(indexHtmlContent.includes('apple-touch-icon'), 'index.html debe tener apple-touch-icon para iOS');

console.log('  ✓ Soporte PWA (Manifest Standalone, Service Worker Offline e Iconos) 100% verificado.');

console.log('\n🎉 ¡TODAS LAS PRUEBAS DE INTEGRIDAD PASARON SATISFACTORIAMENTE! (100% OK)');
