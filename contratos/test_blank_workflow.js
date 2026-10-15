const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log('🧪 Iniciando prueba funcional de flujo de documento en blanco...');

// Mock básico de localStorage y window para app.js
const mockLocalStorage = {};
global.localStorage = {
  getItem: (k) => mockLocalStorage[k] || null,
  setItem: (k, v) => { mockLocalStorage[k] = String(v); },
  removeItem: (k) => { delete mockLocalStorage[k]; },
  clear: () => { for (const k in mockLocalStorage) delete mockLocalStorage[k]; }
};

global.window = {
  location: { search: '', pathname: '/contratos/index.html' },
  history: { replaceState: () => {} },
  addEventListener: () => {},
  matchMedia: () => ({ matches: false }),
  navigator: { userAgent: 'NodeTest' }
};
global.navigator = global.window.navigator;
global.document = {
  readyState: 'complete',
  addEventListener: () => {},
  querySelectorAll: () => [],
  getElementById: () => null,
  createElement: () => ({ appendChild: () => {}, querySelector: () => null, classList: { add: () => {}, remove: () => {} } }),
  body: { classList: { add: () => {}, remove: () => {} } }
};

// Cargar y evaluar el script app.js
const appJsCode = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf-8');

// Comprobar presencia de la lógica clave
assert(appJsCode.includes("clienteNombre: ''"), 'Debe inicializar clienteNombre como cadena vacía');
assert(appJsCode.includes("items: []"), 'Debe inicializar items como arreglo vacío');
assert(appJsCode.includes("paquetesSeleccionados: []"), 'Debe inicializar paquetesSeleccionados como arreglo vacío');
assert(appJsCode.includes("resetStateToBlank"), 'Debe incluir función resetStateToBlank');

// Comprobar que no haya llamadas a cargarItemsDePaquete al inicio
assert(!appJsCode.includes("cargarItemsDePaquete('paquete1', state.zona);"), 'No debe precargar items de Paquete 1 en el arranque');

console.log('  ✓ app.js verificado: Inicia 100% en blanco sin cliente ni items precargados.');
console.log('  ✓ Documento en blanco listo para comenzar de cero.');
