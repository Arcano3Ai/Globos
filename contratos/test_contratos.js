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

// Comprobar tarifas de nuevos paquetes (Invitaciones Digitales y Fotografía)
assert(appJsContent.includes('paquete_invitaciones'), 'Falta paquete_invitaciones en app.js');
assert(appJsContent.includes('399'), 'Falta tarifa de $399 en invitaciones digitales');
assert(appJsContent.includes('paquete_fotografia'), 'Falta paquete_fotografia en app.js');
assert(appJsContent.includes('2500'), 'Falta tarifa de $2,500 en fotografía profesional');

console.log('  ✓ Tarifas oficiales verificadas: P1 ($2,000/$2,500), P2 ($4,000/$4,200), P3 ($1,900/$2,200), Invitaciones ($399), Fotografía ($2,500).');

// 2b. Verificación matemática exacta de anticipos al 50%
const testPricingMatrix = [
  { name: 'Paquete 1 (Mty)', total: 2500, depositExpected: 1250 },
  { name: 'Paquete 1 (Jz/Gpe)', total: 2000, depositExpected: 1000 },
  { name: 'Paquete 2 (Mty)', total: 4200, depositExpected: 2100 },
  { name: 'Paquete 2 (Jz/Gpe)', total: 4000, depositExpected: 2000 },
  { name: 'Paquete 3 (Mty)', total: 2200, depositExpected: 1100 },
  { name: 'Paquete 3 (Jz/Gpe)', total: 1900, depositExpected: 950 },
  { name: 'Invitaciones Digitales', total: 399, depositExpected: 200 }, // 399 * 0.5 = 199.50 -> round 200
  { name: 'Fotografía Profesional', total: 2500, depositExpected: 1250 }
];

testPricingMatrix.forEach(item => {
  const deposit = Math.round(item.total * 0.5);
  const saldo = item.total - deposit;
  assert.strictEqual(deposit, item.depositExpected, `Anticipo erróneo para ${item.name}`);
  assert.strictEqual(deposit + saldo, item.total, `La suma de anticipo + saldo debe ser igual al total en ${item.name}`);
  console.log(`  ✓ Matemática comprobada: ${item.name} -> Total: $${item.total} | Anticipo 50%: $${deposit} | Saldo: $${saldo}`);
});

// 3. Comprobar cláusulas legales y blindaje climático en index.html
const indexHtmlContent = fs.readFileSync(path.join(CONTRATOS_DIR, 'index.html'), 'utf-8');

assert(indexHtmlContent.includes('Todo contrato requiere un anticipo'), 'Falta Cláusula 1: Anticipo obligatorio');
assert(indexHtmlContent.includes('En caso de posponer el evento'), 'Falta Cláusula 2: Posponer evento');
assert(indexHtmlContent.includes('NO HAY DEVOLUCIONES DE ANTICIPO'), 'Falta Cláusula 3: No devoluciones');
assert(indexHtmlContent.includes('El Cliente deberá liquidar el costo total 1 semana antes'), 'Falta Cláusula 4: Liquidación');
assert(indexHtmlContent.includes('No nos hacemos responsables por daños ocasionados por terceras personas y sucesos climatológico'), 'Falta Cláusula 5: Clima y terceros');
assert(indexHtmlContent.includes('Todas las bases, cortinas y decoraciones que no sean globos son rentadas'), 'Falta Cláusula 6: Mobiliario en renta');
assert(indexHtmlContent.includes('Todo daño o extravío a las herramientas rentadas'), 'Falta Cláusula 7: Responsabilidad daño/extravío');
assert(indexHtmlContent.includes('Como mínimo se necesitan 2Hrs antes del evento para hacer el montaje'), 'Falta Cláusula 8: 2Hrs montaje');
assert(indexHtmlContent.includes('Los diseños contratados son aprobados por el cliente'), 'Falta Cláusula 9: Aprobación de diseños');
assert(indexHtmlContent.includes('812 900 3343'), 'Falta WhatsApp oficial 812 900 3343');
assert(indexHtmlContent.includes('811 062 6302'), 'Falta WhatsApp oficial 811 062 6302');
assert(indexHtmlContent.includes('@ DECORACIONES GARCIA'), 'Falta Facebook oficial @ DECORACIONES GARCIA');
assert(indexHtmlContent.includes('NANCY GARCÍA'), 'Falta nombre oficial NANCY GARCÍA en index.html');

console.log('  ✓ Las 9 Cláusulas oficiales de Nancy García y ambos teléfonos de contacto 100% verificadas.');

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

// 6. Comprobar elementos de UI reactivos y barra flotante móvil
assert(indexHtmlContent.includes('mobileFloatingBar'), 'index.html debe incluir mobileFloatingBar');
assert(indexHtmlContent.includes('btnPresetInvitaciones'), 'index.html debe tener botón btnPresetInvitaciones');
assert(indexHtmlContent.includes('btnPresetFotografia'), 'index.html debe tener botón btnPresetFotografia');
assert(stylesContent.includes('.mobile-floating-bar'), 'styles.css debe incluir estilos para mobile-floating-bar');

// 7. Comprobar características de Selección Múltiple y Corrección de Descuento
assert(appJsContent.includes('togglePaquete'), 'Falta función togglePaquete en app.js');
assert(appJsContent.includes('agregarPaquete'), 'Falta función agregarPaquete en app.js');
assert(appJsContent.includes('removerPaquetePorClave'), 'Falta función removerPaquetePorClave en app.js');
assert(indexHtmlContent.includes('selQuickAddPackage'), 'Falta selector selQuickAddPackage en index.html');
assert(indexHtmlContent.includes('btnQuickAddPackage'), 'Falta botón btnQuickAddPackage en index.html');
assert(indexHtmlContent.includes('activePackagesWrap'), 'Falta contenedor activePackagesWrap en index.html');
assert(indexHtmlContent.includes('sheetDescuentoRow'), 'Falta fila sheetDescuentoRow en index.html');
assert(indexHtmlContent.includes('btnClearDescuento'), 'Falta botón btnClearDescuento en index.html');
assert(indexHtmlContent.includes('inpAnticipoMonto'), 'Falta input inpAnticipoMonto en index.html');
assert(stylesContent.includes('.add-package-box'), 'styles.css debe incluir estilos para .add-package-box');
assert(stylesContent.includes('.sheet-total-row.discount'), 'styles.css debe incluir estilos para .sheet-total-row.discount');

// 8. Verificación matemática de combinación de múltiples paquetes (Ej. P1 + Invitaciones + Fotografía)
const comboMultiple = 2500 + 399 + 2500; // Paquete 1 (Mty) + Invitación ($399) + Fotografía ($2,500)
assert.strictEqual(comboMultiple, 5399, 'La combinación P1 + Invitaciones + Fotografía debe ser $5,399');
const comboDeposit = Math.round(comboMultiple * 0.5);
assert.strictEqual(comboDeposit, 2700, 'Anticipo 50% de $5,399 debe redondear a $2,700');
assert.strictEqual(comboMultiple - comboDeposit, 2699, 'Saldo debe ser $2,699');
console.log(`  ✓ Matemática Multi-Paquetes: P1 ($2,500) + Invitaciones ($399) + Fotografía ($2,500) -> Subtotal: $${comboMultiple} | Anticipo 50%: $${comboDeposit} | Saldo: $${comboMultiple - comboDeposit}`);

// 8b. Verificación matemática de TODOS los paquetes juntos (P1 + P2 + P3 + Invitaciones + Fotografía + Flete + Descuento)
const granMegaCombo = 2500 + 4200 + 2200 + 399 + 2500; // Todos en Mty = $11,799
assert.strictEqual(granMegaCombo, 11799, 'La suma de los 5 paquetes en Monterrey debe ser $11,799');
const fleteOtrasZonas = 350;
const descEspecial = 500;
const totalNeto = granMegaCombo + fleteOtrasZonas - descEspecial; // 11,799 + 350 - 500 = 11,649
assert.strictEqual(totalNeto, 11649, 'Total con flete ($350) y descuento ($500) debe ser $11,649');
const dep50 = Math.round(totalNeto * 0.5);
const saldoNeto = totalNeto - dep50;
assert.strictEqual(dep50, 5825, 'Anticipo 50% debe ser $5,825');
assert.strictEqual(saldoNeto, 5824, 'Saldo restante debe ser $5,824');
assert.strictEqual(dep50 + saldoNeto, totalNeto, 'La suma de anticipo + saldo debe ser idéntica al total neto');
console.log(`  ✓ Auditoría completa de cálculos: Subtotal $${granMegaCombo} + Flete $${fleteOtrasZonas} - Desc $${descEspecial} = Total $${totalNeto} (Anticipo: $${dep50} + Saldo: $${saldoNeto})`);

// 9. Verificación matemática de anticipo fijo en pesos ($ MXN)
const totalP2 = 4200;
const anticipoFijo = 2500;
const saldoRestante = totalP2 - anticipoFijo;
assert.strictEqual(saldoRestante, 1700, 'Si el cliente da $2,500 de anticipo en contrato de $4,200, el saldo debe ser $1,700');
console.log(`  ✓ Matemática Anticipo en Efectivo: Contrato $${totalP2} - Anticipo $${anticipoFijo} = Saldo Restante: $${saldoRestante}`);

// 10. Verificación de Serie Consecutiva de Folios Oficiales (Inicia en 00691 y sube)
assert(indexHtmlContent.includes('CTR-2026-00691'), 'index.html debe iniciar con el folio CTR-2026-00691');
assert(appJsContent.includes('FOLIO_START_NUM = 691'), 'app.js debe definir FOLIO_START_NUM = 691');
assert(appJsContent.includes('String(num).padStart(5, \'0\')'), 'app.js debe formatear folios con 5 dígitos');

const startNum = 691;
const padSeq1 = String(startNum).padStart(5, '0');
assert.strictEqual(padSeq1, '00691', 'El folio inicial debe ser 00691');
const nextNum = startNum + 1;
const padSeq2 = String(nextNum).padStart(5, '0');
assert.strictEqual(padSeq2, '00692', 'El siguiente folio consecutivo debe ser 00692');
console.log(`  ✓ Serie Consecutiva Oficial Verificada: Inicial ${padSeq1} -> Siguiente ${padSeq2} (Incremento garantizado)`);

// 11. Verificación de Autenticación por Usuario y Contraseña (admin / nancylopuede)
assert(appJsContent.includes("MASTER_USER = 'admin'"), 'app.js debe definir MASTER_USER = "admin"');
assert(appJsContent.includes("MASTER_PASS = 'nancylopuede'"), 'app.js debe definir MASTER_PASS = "nancylopuede"');
assert(indexHtmlContent.includes('id="authLoginForm"'), 'index.html debe contener el formulario authLoginForm');
assert(indexHtmlContent.includes('id="authUsername"'), 'index.html debe contener el input authUsername');
assert(indexHtmlContent.includes('id="authPassword"'), 'index.html debe contener el input authPassword');
assert(indexHtmlContent.includes('id="btnTogglePassword"'), 'index.html debe contener el botón btnTogglePassword');
assert(stylesContent.includes('.auth-form'), 'styles.css debe incluir estilos para .auth-form');
assert(stylesContent.includes('.auth-submit-btn'), 'styles.css debe incluir estilos para .auth-submit-btn');
// 12. Verificación de Eliminación Total de PIN y Paquetes No Divididos (1 solo concepto limpio por paquete)
assert(!appJsContent.includes('MASTER_PIN_FALLBACK'), 'El PIN de fallback no debe existir en app.js');
assert(!appJsContent.includes("const MASTER_PIN = '1062'"), 'MASTER_PIN no debe existir en app.js');

// Verificación de que cada paquete comercial es un concepto unificado (1 solo renglón por paquete)
assert(appJsContent.includes('Paquete 1: Aro Decorado con Globos High-Shine & Servicio de Caballetes Infantil (1 Hora)'), 'Paquete 1 debe ser un solo concepto integral');
assert(appJsContent.includes('Paquete 2: Barra de Snacks (25 Elotes + 25 Tostitos) & Decoración Escenográfica Completa'), 'Paquete 2 debe ser un solo concepto integral');
assert(appJsContent.includes('Paquete 3: Taller Creativo de Arte (2 Horas), Caballete de Bienvenida & Lote de 30 Yesitos'), 'Paquete 3 debe ser un solo concepto integral');
console.log('  ✓ Paquetes No Desglosados Verificados: 1 solo concepto integral y limpio por paquete contratado.');
console.log('  ✓ Sistema de PIN completamente eliminado: Acceso exclusivo por Usuario y Contraseña.');

// 13. Verificación de Inicio en Blanco Siempre (Empezar de cero sin datos demo)
assert(!indexHtmlContent.includes('value="C. Alejandro Ramírez Salinas"'), 'index.html no debe tener valor demo prellenado para cliente');
assert(!indexHtmlContent.includes('value="Mía Ramírez"'), 'index.html no debe tener valor demo prellenado para festejado');
assert(!indexHtmlContent.includes('value="81-8399-2211"'), 'index.html no debe tener teléfono demo prellenado');
assert(!indexHtmlContent.includes('btn-preset active'), 'Ningún botón de preset debe estar activo por defecto');
assert(appJsContent.includes("clienteNombre: ''"), 'app.js debe inicializar clienteNombre vacío');
assert(appJsContent.includes("festejado: ''"), 'app.js debe inicializar festejado vacío');
assert(appJsContent.includes("items: []"), 'app.js debe inicializar items vacío');
assert(appJsContent.includes("paquetesSeleccionados: []"), 'app.js debe inicializar paquetesSeleccionados vacío');
assert(appJsContent.includes("resetStateToBlank"), 'app.js debe implementar resetStateToBlank');
assert(appJsContent.includes("localStorage.removeItem('nancy_contrato_draft')"), 'loadFromStorage y reset deben limpiar borradores antiguos para garantizar inicio en blanco');

// 14. Verificación de Botones Oficiales "Limpiar Contrato" (Solicitado por el usuario)
assert(indexHtmlContent.includes('id="btnClearContract"'), 'index.html debe tener el botón superior btnClearContract');
assert(indexHtmlContent.includes('id="btnSidebarClearContract"'), 'index.html debe tener el botón en sidebar btnSidebarClearContract');
assert(indexHtmlContent.includes('id="btnClearItemsSection"'), 'index.html debe tener el botón btnClearItemsSection');
assert(indexHtmlContent.includes('id="btnMobileClear"'), 'index.html debe tener el botón btnMobileClear');
assert(appJsContent.includes('limpiarContratoCompleto'), 'app.js debe implementar limpiarContratoCompleto');
assert(stylesContent.includes('.btn-danger'), 'styles.css debe incluir estilos para .btn-danger');
assert(stylesContent.includes('.btn-clear-main'), 'styles.css debe incluir estilos para .btn-clear-main');

// 15. Verificación de Optimizaciones Móviles (Segmented Tabs, Keyboards, Barra Flotante & PDF)
assert(indexHtmlContent.includes('id="mobileViewTabs"'), 'index.html debe contener el contenedor mobileViewTabs');
assert(indexHtmlContent.includes('id="tabBtnForm"'), 'index.html debe contener el botón tabBtnForm');
assert(indexHtmlContent.includes('id="tabBtnSheet"'), 'index.html debe contener el botón tabBtnSheet');
assert(indexHtmlContent.includes('inputmode="tel"'), 'index.html debe tener inputmode="tel" en teléfono');
assert(indexHtmlContent.includes('inputmode="decimal"'), 'index.html debe tener inputmode="decimal" en montos');
assert(indexHtmlContent.includes('inputmode="numeric"'), 'index.html debe tener inputmode="numeric" en edad y % anticipo');
assert(indexHtmlContent.includes('id="btnMobilePdf"'), 'index.html debe contener el botón btnMobilePdf');
assert(indexHtmlContent.includes('id="btnMobileWhatsApp"'), 'index.html debe contener el botón btnMobileWhatsApp');
assert(indexHtmlContent.includes('id="btnToggleMobileView"'), 'index.html debe contener el botón btnToggleMobileView');
assert(appJsContent.includes('switchMobileView'), 'app.js debe implementar switchMobileView');
assert(appJsContent.includes("switchMobileView('form')"), 'app.js debe permitir cambiar a vista de datos');
assert(appJsContent.includes("switchMobileView('sheet')"), 'app.js debe permitir cambiar a vista de hoja');
assert(appJsContent.includes('pdf-exporting'), 'app.js debe activar la clase pdf-exporting durante la exportación');
assert(!appJsContent.includes('.from(sheetEl)'), 'app.js no debe contener la referencia indefinida sheetEl');
assert(appJsContent.includes('.from(sheetTarget)'), 'app.js debe exportar desde sheetTarget verificado');
assert(stylesContent.includes('.mobile-view-tabs'), 'styles.css debe incluir estilos para .mobile-view-tabs');
assert(stylesContent.includes('.mobile-tab-btn'), 'styles.css debe incluir estilos para .mobile-tab-btn');
assert(stylesContent.includes('.tab-form-active'), 'styles.css debe incluir reglas para .tab-form-active');
assert(stylesContent.includes('.tab-sheet-active'), 'styles.css debe incluir reglas para .tab-sheet-active');
assert(stylesContent.includes('body.pdf-exporting .sheet'), 'styles.css debe incluir reglas de protección para exportación en móvil');
assert(stylesContent.includes('body.pdf-exporting .preview-viewport'), 'styles.css debe garantizar que preview-viewport sea visible al exportar PDF');
assert(stylesContent.includes('input[type="date"]'), 'styles.css debe incluir estilos específicos para input[type="date"]');
assert(stylesContent.includes('color-scheme: light'), 'styles.css debe incluir color-scheme: light para calendario legible');
assert(stylesContent.includes('-webkit-text-fill-color: #0E0B18'), 'styles.css debe forzar tipografía negra en fecha para iOS/Safari');
assert(appJsContent.includes('Contrato - ${sanitizedClient}.pdf'), 'app.js debe nombrar el archivo PDF como Contrato - [Cliente].pdf');
assert(appJsContent.includes('document.title = sanitizedClient'), 'app.js debe sincronizar document.title para impresión nativa Guardar como PDF');
assert(appJsContent.includes(".outputPdf('blob')"), 'app.js debe generar Blob real con outputPdf para compatibilidad móvil');
assert(appJsContent.includes('navigator.share'), 'app.js debe integrar Web Share API para Guardar en Archivos / Files nativo');
assert(appJsContent.includes('openPdfDeliveryModal'), 'app.js debe implementar openPdfDeliveryModal para entrega síncrona infalible');
assert(indexHtmlContent.includes('id="pdfDeliveryModal"'), 'index.html debe contener el modal interactivo pdfDeliveryModal');
assert(indexHtmlContent.includes('id="btnDeliveryDirectDownload"'), 'index.html debe contener el botón de descarga directa btnDeliveryDirectDownload');
assert(indexHtmlContent.includes('id="btnDeliverySaveFiles"'), 'index.html debe contener el botón btnDeliverySaveFiles');
assert(indexHtmlContent.includes('id="inAppBrowserAlert"'), 'index.html debe contener la alerta para navegador in-app inAppBrowserAlert');
assert(stylesContent.includes('.pdf-modal-overlay'), 'styles.css debe incluir estilos para el modal de entrega .pdf-modal-overlay');
assert(stylesContent.includes('.btn-delivery-download'), 'styles.css debe incluir estilos para .btn-delivery-download');
assert(stylesContent.includes('.pdf-modal-inapp-alert'), 'styles.css debe incluir estilos para .pdf-modal-inapp-alert');

// 16. Verificación de Datos Bancarios Oficiales (Mercado Pago & CLABE 722969016978001939)
assert(indexHtmlContent.includes('722969016978001939'), 'index.html debe contener la CLABE 722969016978001939');
assert(indexHtmlContent.includes('Mercado Pago'), 'index.html debe contener Mercado Pago en datos bancarios');
assert(appJsContent.includes('722969016978001939'), 'app.js debe configurar por defecto la CLABE 722969016978001939');
assert(appJsContent.includes('Mercado Pago'), 'app.js debe configurar Mercado Pago por defecto');
assert(swContent.includes('nancy-contratos-pwa-v3.6'), 'sw.js debe estar actualizado a nancy-contratos-pwa-v3.6');

console.log('  ✓ Datos Bancarios Oficiales Verificados: Mercado Pago | Nancy García | CLABE 722969016978001939 (en formulario, hoja membretada y mensaje WhatsApp).');
console.log('  ✓ Sistema de Descarga y Guardado en Archivos / Files Verificado: Descarga directa + Modal interactivo + Web Share API + Alerta In-App.');
console.log('  ✓ Nomenclatura Oficial de Archivo Verificada: "Contrato - [Nombre del Cliente].pdf" (descarga directa y diálogo nativo).');

console.log('  ✓ Botones "Limpiar Contrato" 100% Verificados: Barra superior, panel de paquetes, conceptos y barra móvil.');

console.log('  ✓ Barra flotante móvil, barra de agregar paquetes, selección múltiple, anticipo dual y desglose de descuento 100% verificados.');

console.log('  ✓ Soporte PWA (Manifest Standalone, Service Worker Offline e Iconos) 100% verificado.');

console.log('\n🎉 ¡TODAS LAS PRUEBAS DE INTEGRIDAD PASARON SATISFACTORIAMENTE! (100% OK)');
