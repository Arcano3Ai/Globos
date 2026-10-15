/**
 * APLICACIÓN GENERADORA DE CONTRATOS - NANCY GARCÍA DECORACIÓN
 * Módulo 100% autónomo y portable.
 * Arquitectura limpia en Vanilla JS sin dependencias mandatorias.
 */

(function () {
  'use strict';

  // =========================================================================
  // CATÁLOGO OFICIAL DE PAQUETES Y PRECIOS
  // =========================================================================
  const PAQUETES = {
    paquete1: {
      nombre: 'Paquete 1: Aro Decorado + Caballetes (1 Hora)',
      badge: 'Aro + Caballetes 1H',
      precios: {
        juarez_guadalupe: 2000,
        monterrey: 2500,
        otras_zonas: 2600
      },
      items: [
        {
          cant: 1,
          titulo: 'Decoración Principal: Aro Decorado Profesional & Mesita',
          descripcion: 'Aro metálico profesional con arco orgánico de globos (2 a 3 tonos de látex alta durabilidad con tratamiento High-Shine), letrero a elegir (Luz LED Neón o MDF temático calado) y mesita para pastel o repostería.',
          horario: 'Evento Completo',
          precio: function(zona) {
            return zona === 'juarez_guadalupe' ? 1200 : 1500;
          }
        },
        {
          cant: 1,
          titulo: 'Servicio de Caballetes Infantil de Arte (1 Hora Continua)',
          descripcion: '5 Caballetes dobles de madera (10 plazas infantiles simultáneas), pinturas vinílicas lavables no tóxicas ilimitadas, dibujos temáticos ilimitados, pinceles, recipientes con agua, toallitas limpiadoras y 1 persona de Staff de atención continua.',
          horario: '1 Hora de Servicio',
          precio: function(zona) {
            return zona === 'juarez_guadalupe' ? 800 : 1000;
          }
        }
      ]
    },

    paquete2: {
      nombre: 'Paquete 2: Elotes, Tostitos & Decoración Completa',
      badge: 'Elotes + Tostitos + Deco',
      precios: {
        juarez_guadalupe: 4000,
        monterrey: 4200,
        otras_zonas: 4400
      },
      items: [
        {
          cant: 1,
          titulo: 'Barra de Antojitos: 25 Elotes en Vaso + 25 Tostitos Preparados',
          descripcion: '25 Vasos de elote tierno desgranado cocido al vapor en el evento + 25 bolsas de Tostitos preparados en barquitos biodegradables. Incluye 7 aderezos (crema, mayonesa, chipotle, chile en polvo, queso cheddar caliente, salsa botanera y salsa casera) y 5 toppings (cacahuates, Cheetos, Ruffles, Doritos y queso rallado).',
          horario: 'Barra de Snacks',
          precio: function(zona) {
            return 2200;
          }
        },
        {
          cant: 1,
          titulo: 'Decoración Escenográfica: Aro o Mampara con Arco Orgánico High-Shine',
          descripcion: 'Estructura a elegir (Aro Decorado o Mampara Escenográfica lisa/texturizada) con arco orgánico en 2-3 tonos con abrillantador profesional High-Shine, letrero LED Neón o MDF temático y mesita para pastel.',
          horario: 'Evento Completo',
          precio: function(zona) {
            return zona === 'juarez_guadalupe' ? 1800 : 2000;
          }
        }
      ]
    },

    paquete3: {
      nombre: 'Paquete 3: Taller Creativo (2 Horas), Caballete Bienvenida & 30 Yesitos',
      badge: 'Taller 2H + Bienvenida + Yesitos',
      precios: {
        juarez_guadalupe: 1900,
        monterrey: 2200,
        otras_zonas: 2300
      },
      items: [
        {
          cant: 1,
          titulo: 'Taller Creativo Infantil de Arte en Caballetes (2 Horas Continuas)',
          descripcion: '5 Caballetes dobles de madera (10 espacios infantiles simultáneos), 10 mandilitos protectores de tela lavable, pinturas vinílicas no tóxicas ilimitadas, dibujos temáticos para colorear ilimitados, pinceles y 1 persona de Staff a cargo.',
          horario: '2 Horas de Taller',
          precio: function(zona) {
            return zona === 'juarez_guadalupe' ? 1000 : 1200;
          }
        },
        {
          cant: 1,
          titulo: 'Caballete de Entrada / Bienvenida con Foto y Marco de Globos',
          descripcion: 'Caballete de bienvenida con fotografía o póster temático impreso de la festejada/o, enmarcado con arco orgánico de globos en 2 a 3 tonos coordinados.',
          horario: 'Recepción',
          precio: function(zona) {
            return 450;
          }
        },
        {
          cant: 1,
          titulo: 'Lote de 30 Yesitos Temáticos Artesanales (Recuerdos en bolsita individual)',
          descripcion: '30 Figuras de yeso cerámico temáticas en bolsita de celofán individual con listón rizado, pincel y botecito de pintura lavable para que los niños pinten y lleven a casa.',
          horario: 'Consumible / Souvenir',
          precio: function(zona) {
            return zona === 'juarez_guadalupe' ? 450 : 550;
          }
        }
      ]
    },

    paquete_invitaciones: {
      nombre: 'Paquete: Invitaciones Digitales Interactivas con GPS & WhatsApp RSVP',
      badge: 'Invitaciones Digitales $399',
      precios: {
        juarez_guadalupe: 399,
        monterrey: 399,
        otras_zonas: 399
      },
      items: [
        {
          cant: 1,
          titulo: 'Diseño de Invitación Digital Interactiva con GPS, RSVP & Mesa de Regalos',
          descripcion: 'Invitación digital personalizada para WhatsApp y redes con botón en 1 clic a Google Maps y Waze, confirmación de asistencia RSVP directa a WhatsApp, itinerario de fiesta, mesa de regalos y cuenta regresiva animada.',
          horario: 'Entrega Digital',
          precio: function(zona) {
            return 399;
          }
        }
      ]
    },

    paquete_fotografia: {
      nombre: 'Paquete: Cobertura Fotográfica Profesional para Eventos',
      badge: 'Fotografía Profesional $2,500',
      precios: {
        juarez_guadalupe: 2500,
        monterrey: 2500,
        otras_zonas: 2500
      },
      items: [
        {
          cant: 1,
          titulo: 'Cobertura Fotográfica Profesional para Evento (Galería Digital Editada)',
          descripcion: 'Cobertura fotográfica durante el festejo: sesión familiar en el arco o set de globos, fotos del festejo, partida de pastel, dinámicas infantiles y momentos espontáneos. Entrega de galería digital privada con todas las fotos editadas en alta resolución listas para imprimir y compartir.',
          horario: 'Evento Completo',
          precio: function(zona) {
            return 2500;
          }
        }
      ]
    }
  };

  // =========================================================================
  // ESTADO DE LA APLICACIÓN
  // =========================================================================
  const state = {
    folio: generateFolio(),
    fechaEmision: getFormattedCurrentDate(),
    zona: 'monterrey',
    paquetesSeleccionados: ['paquete1'],
    paqueteSeleccionado: 'paquete1',
    clienteNombre: 'C. Alejandro Ramírez Salinas',
    clienteTelefono: '81-8399-2211',
    clienteEmail: '',
    festejado: 'Mía Ramírez',
    edadFestejado: '5 años',
    tipoFestejo: 'Cumpleaños Infantil',
    tematica: 'Princesas & Fantasía Mágica',
    coloresGlobos: 'Rosa pastel, lavanda y toques cromo oro',
    tipoLetrero: 'Luz LED Neón ("Happy Birthday")',
    fechaEvento: getSuggestedEventDate(),
    lugarEvento: 'Salón Las Nubes, San Pedro Garza García, N.L.',
    horaMontaje: '14:30 hrs (2 horas antes)',
    horaEvento: '16:30 a 20:30 hrs',
    horaDesmontaje: '20:45 hrs',
    items: [],
    flete: 0,
    descuento: 0,
    anticipoPorcentaje: 50,
    anticipoMonto: 0,
    anticipoModo: 'porcentaje',
    notasBancarias: 'Banco: BBVA / Banorte | Beneficiaria: Nancy García (Nancy Eventos) | Cuenta / CLABE: 012 580 00123456789 0'
  };

  // Inicializar items con el Paquete 1 por defecto
  cargarItemsDePaquete('paquete1', state.zona);

  // =========================================================================
  // REFERENCIAS DOM
  // =========================================================================
  const dom = {};

  function initDom() {
    // Entradas del panel
    dom.inpFolio = document.getElementById('inpFolio');
    dom.inpFechaEmision = document.getElementById('inpFechaEmision');
    dom.selZona = document.getElementById('selZona');
    dom.inpClienteNombre = document.getElementById('inpClienteNombre');
    dom.inpClienteTelefono = document.getElementById('inpClienteTelefono');
    dom.inpClienteEmail = document.getElementById('inpClienteEmail');
    dom.inpFestejado = document.getElementById('inpFestejado');
    dom.inpEdadFestejado = document.getElementById('inpEdadFestejado');
    dom.inpTipoFestejo = document.getElementById('inpTipoFestejo');
    dom.inpTematica = document.getElementById('inpTematica');
    dom.inpColoresGlobos = document.getElementById('inpColoresGlobos');
    dom.inpTipoLetrero = document.getElementById('inpTipoLetrero');
    dom.inpFechaEvento = document.getElementById('inpFechaEvento');
    dom.inpLugarEvento = document.getElementById('inpLugarEvento');
    dom.inpHoraMontaje = document.getElementById('inpHoraMontaje');
    dom.inpHoraEvento = document.getElementById('inpHoraEvento');
    dom.inpHoraDesmontaje = document.getElementById('inpHoraDesmontaje');
    dom.inpFlete = document.getElementById('inpFlete');
    dom.inpDescuento = document.getElementById('inpDescuento');
    dom.btnClearDescuento = document.getElementById('btnClearDescuento');
    dom.inpAnticipoPct = document.getElementById('inpAnticipoPct');
    dom.inpAnticipoMonto = document.getElementById('inpAnticipoMonto');
    dom.inpNotasBancarias = document.getElementById('inpNotasBancarias');
    dom.itemsContainer = document.getElementById('itemsContainer');

    // Totales en Sidebar
    dom.sideSubtotal = document.getElementById('sideSubtotal');
    dom.sideFlete = document.getElementById('sideFlete');
    dom.sideDescuento = document.getElementById('sideDescuento');
    dom.sideTotal = document.getElementById('sideTotal');
    dom.sideAnticipo = document.getElementById('sideAnticipo');
    dom.sideSaldo = document.getElementById('sideSaldo');

    // Elementos en la Hoja Membretada (Print Preview)
    dom.sheetFolio = document.getElementById('sheetFolio');
    dom.sheetFechaEmision = document.getElementById('sheetFechaEmision');
    dom.sheetClienteNombre = document.getElementById('sheetClienteNombre');
    dom.sheetClienteTelefono = document.getElementById('sheetClienteTelefono');
    dom.sheetLugarEvento = document.getElementById('sheetLugarEvento');
    dom.sheetFechaEvento = document.getElementById('sheetFechaEvento');
    dom.sheetFestejadoInfo = document.getElementById('sheetFestejadoInfo');
    dom.sheetTematicaInfo = document.getElementById('sheetTematicaInfo');
    dom.sheetHorariosInfo = document.getElementById('sheetHorariosInfo');
    dom.sheetTableBody = document.getElementById('sheetTableBody');
    dom.sheetSubtotalVal = document.getElementById('sheetSubtotalVal');
    dom.sheetDescuentoRow = document.getElementById('sheetDescuentoRow');
    dom.sheetDescuentoVal = document.getElementById('sheetDescuentoVal');
    dom.sheetFleteVal = document.getElementById('sheetFleteVal');
    dom.sheetTotalVal = document.getElementById('sheetTotalVal');
    dom.sheetAnticipoLabel = document.getElementById('sheetAnticipoLabel');
    dom.sheetAnticipoVal = document.getElementById('sheetAnticipoVal');
    dom.sheetSaldoVal = document.getElementById('sheetSaldoVal');
    dom.sheetTotalLetras = document.getElementById('sheetTotalLetras');
    dom.sheetSignCliente = document.getElementById('sheetSignCliente');
    dom.sheetBankInfo = document.getElementById('sheetBankInfo');

    // Barra y controles para sumar paquetes juntos
    dom.selQuickAddPackage = document.getElementById('selQuickAddPackage');
    dom.btnQuickAddPackage = document.getElementById('btnQuickAddPackage');
    dom.activePackagesWrap = document.getElementById('activePackagesWrap');
    dom.activePackagesList = document.getElementById('activePackagesList');
    dom.btnClearAllPackages = document.getElementById('btnClearAllPackages');
    dom.btnOpenAddPackage = document.getElementById('btnOpenAddPackage');

    // Botones de presets y adicionales
    dom.btnPreset1 = document.getElementById('btnPreset1');
    dom.btnPreset2 = document.getElementById('btnPreset2');
    dom.btnPreset3 = document.getElementById('btnPreset3');
    dom.btnPresetInvitaciones = document.getElementById('btnPresetInvitaciones');
    dom.btnPresetFotografia = document.getElementById('btnPresetFotografia');
    dom.btnAddItem = document.getElementById('btnAddItem');
    dom.btnPrint = document.getElementById('btnPrint');
    dom.btnDownloadPdf = document.getElementById('btnDownloadPdf');
    dom.btnWhatsApp = document.getElementById('btnWhatsApp');
    dom.btnCopySummary = document.getElementById('btnCopySummary');
    dom.btnReset = document.getElementById('btnReset');
    dom.btnNewFolio = document.getElementById('btnNewFolio');

    // Elementos de la barra flotante móvil
    dom.mBarTotal = document.getElementById('mBarTotal');
    dom.mBarAnticipo = document.getElementById('mBarAnticipo');
    dom.btnScrollToForm = document.getElementById('btnScrollToForm');
    dom.btnScrollToSheet = document.getElementById('btnScrollToSheet');
  }

  // =========================================================================
  // FUNCIONES AUXILIARES & FORMATOS (FOLIOS CONSECUTIVOS DESDE 00691)
  // =========================================================================
  const FOLIO_STORAGE_KEY = 'nancy_contrato_folio_counter';
  const FOLIO_START_NUM = 691;

  function getCurrentFolioNumber() {
    try {
      const stored = localStorage.getItem(FOLIO_STORAGE_KEY);
      const parsed = parseInt(stored, 10);
      if (!isNaN(parsed) && parsed >= FOLIO_START_NUM) {
        return parsed;
      }
    } catch (e) {}
    return FOLIO_START_NUM;
  }

  function setFolioNumber(num) {
    try {
      if (typeof num === 'number' && !isNaN(num) && num >= FOLIO_START_NUM) {
        localStorage.setItem(FOLIO_STORAGE_KEY, String(num));
      }
    } catch (e) {}
  }

  function formatFolioString(num, template = null) {
    const seq = String(num).padStart(5, '0');
    // Si el usuario borró o cambió el prefijo CTR- manualmente (ej. dejó sólo "00691")
    if (template && typeof template === 'string' && !template.includes('CTR-')) {
      const customMatch = template.match(/^(.*?)(\d{3,6})$/);
      if (customMatch) {
        return `${customMatch[1]}${seq}`;
      }
      return seq;
    }
    const d = new Date();
    const year = d.getFullYear();
    return `CTR-${year}-${seq}`;
  }

  function generateFolio(advance = false) {
    let currentNum = getCurrentFolioNumber();
    if (advance) {
      currentNum += 1;
      setFolioNumber(currentNum);
    } else {
      setFolioNumber(currentNum);
    }
    return formatFolioString(currentNum, (typeof state !== 'undefined' && state && state.folio) ? state.folio : null);
  }

  function syncFolioCounterFromText(text) {
    if (!text) return;
    const match = String(text).match(/\d{3,6}/);
    if (match) {
      const num = parseInt(match[0], 10);
      if (!isNaN(num) && num >= FOLIO_START_NUM) {
        setFolioNumber(num);
      }
    }
  }

  function getFormattedCurrentDate() {
    const meses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    const d = new Date();
    return `${d.getDate()} de ${meses[d.getMonth()]} de ${d.getFullYear()}`;
  }

  function getSuggestedEventDate() {
    const d = new Date();
    d.setDate(d.getDate() + 21); // 3 semanas después
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function formatDateForDisplay(isoDateString) {
    if (!isoDateString) return 'Por confirmar';
    try {
      const parts = isoDateString.split('-');
      if (parts.length === 3) {
        const meses = [
          'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
          'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        const day = parseInt(parts[2], 10);
        const monthIndex = parseInt(parts[1], 10) - 1;
        const year = parts[0];
        return `${day} de ${meses[monthIndex]} de ${year}`;
      }
      return isoDateString;
    } catch (e) {
      return isoDateString;
    }
  }

  function formatMoney(amount) {
    const num = Number(amount) || 0;
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2
    }).format(num);
  }

  // =========================================================================
  // GESTIÓN Y COMBINACIÓN DE PAQUETES (SELECCIÓN MÚLTIPLE FLEXIBLE)
  // =========================================================================
  function agregarPaquete(paqueteKey) {
    const paquete = PAQUETES[paqueteKey];
    if (!paquete) return;

    if (!Array.isArray(state.paquetesSeleccionados)) {
      state.paquetesSeleccionados = [];
    }

    state.paquetesSeleccionados.push(paqueteKey);

    const batchId = 'pkg_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
    paquete.items.forEach((itemDef, itemIdx) => {
      const unitPrice = typeof itemDef.precio === 'function' ? itemDef.precio(state.zona) : itemDef.precio;
      state.items.push({
        id: 'item_' + Date.now() + '_' + paqueteKey + '_' + itemIdx + '_' + Math.floor(Math.random() * 1000),
        paqueteKey: paqueteKey,
        batchId: batchId,
        itemIndex: itemIdx,
        cant: itemDef.cant,
        titulo: itemDef.titulo,
        descripcion: itemDef.descripcion,
        horario: itemDef.horario,
        precioUnitario: unitPrice
      });
    });

    state.paqueteSeleccionado = state.paquetesSeleccionados.length > 0 ? state.paquetesSeleccionados[0] : 'custom';

    if (state.zona === 'otras_zonas' && state.flete === 0) {
      state.flete = 350;
    }

    showToast(`¡Sumado al contrato: ${paquete.badge}!`, 'success');
    renderAll();
  }

  function removerPaquetePorClave(paqueteKey) {
    if (!Array.isArray(state.paquetesSeleccionados)) return;
    const idx = state.paquetesSeleccionados.indexOf(paqueteKey);
    if (idx >= 0) {
      state.paquetesSeleccionados.splice(idx, 1);
      state.items = state.items.filter(it => it.paqueteKey !== paqueteKey);
    }
    state.paqueteSeleccionado = state.paquetesSeleccionados.length > 0 ? state.paquetesSeleccionados[0] : 'custom';
    showToast(`Paquete retirado del contrato.`, 'info');
    renderAll();
  }

  function limpiarTodosLosPaquetes() {
    state.paquetesSeleccionados = [];
    state.items = state.items.filter(it => !it.paqueteKey);
    state.paqueteSeleccionado = 'custom';
    showToast('Se limpiaron los paquetes del contrato.', 'info');
    renderAll();
  }

  function togglePaquete(paqueteKey) {
    const paquete = PAQUETES[paqueteKey];
    if (!paquete) return;

    if (!Array.isArray(state.paquetesSeleccionados)) {
      state.paquetesSeleccionados = [];
    }

    const idx = state.paquetesSeleccionados.indexOf(paqueteKey);

    if (idx >= 0) {
      // Si ya está agregado, quitarlo
      removerPaquetePorClave(paqueteKey);
    } else {
      // Si no está agregado, sumarlo
      agregarPaquete(paqueteKey);
    }
  }

  // Compatibilidad legacy de carga directa
  function cargarItemsDePaquete(paqueteKey, zona) {
    state.paquetesSeleccionados = [paqueteKey];
    state.paqueteSeleccionado = paqueteKey;
    const paquete = PAQUETES[paqueteKey];
    if (!paquete) return;

    state.items = paquete.items.map((itemDef, index) => {
      const unitPrice = typeof itemDef.precio === 'function' ? itemDef.precio(zona) : itemDef.precio;
      return {
        id: 'item_' + Date.now() + '_' + paqueteKey + '_' + index,
        paqueteKey: paqueteKey,
        itemIndex: index,
        cant: itemDef.cant,
        titulo: itemDef.titulo,
        descripcion: itemDef.descripcion,
        horario: itemDef.horario,
        precioUnitario: unitPrice
      };
    });

    if (zona === 'otras_zonas') {
      state.flete = 350;
    } else {
      state.flete = 0;
    }
  }

  // =========================================================================
  // RENDERIZADO DEL PANEL Y LA HOJA
  // =========================================================================
  function renderAll() {
    renderFormInputs();
    renderSidebarItems();
    renderActivePackages();
    renderSheet();
    updateCalculations();
  }

  function renderActivePackages() {
    if (!dom.activePackagesWrap || !dom.activePackagesList) return;
    const seleccionados = Array.isArray(state.paquetesSeleccionados) ? state.paquetesSeleccionados : [];

    if (seleccionados.length === 0) {
      dom.activePackagesWrap.style.display = 'none';
      dom.activePackagesList.innerHTML = '';
      return;
    }

    dom.activePackagesWrap.style.display = 'block';
    dom.activePackagesList.innerHTML = '';

    // Contar ocurrencias de paquetes acumulados
    const counts = {};
    seleccionados.forEach(k => {
      counts[k] = (counts[k] || 0) + 1;
    });

    Object.entries(counts).forEach(([pkgKey, count]) => {
      const pkg = PAQUETES[pkgKey];
      if (!pkg) return;

      const badge = document.createElement('span');
      badge.className = 'active-pkg-badge';
      const labelCount = count > 1 ? ` (${count}x)` : '';
      badge.innerHTML = `
        <span>📦 ${escapeHtml(pkg.badge)}${labelCount}</span>
        <button type="button" class="btn-remove-pkg" data-pkg="${pkgKey}" title="Quitar este paquete">✕</button>
      `;
      dom.activePackagesList.appendChild(badge);
    });
  }

  function renderFormInputs() {
    if (dom.inpFolio) dom.inpFolio.value = state.folio;
    if (dom.inpFechaEmision) dom.inpFechaEmision.value = state.fechaEmision;
    if (dom.selZona) dom.selZona.value = state.zona;
    if (dom.inpClienteNombre) dom.inpClienteNombre.value = state.clienteNombre;
    if (dom.inpClienteTelefono) dom.inpClienteTelefono.value = state.clienteTelefono;
    if (dom.inpClienteEmail) dom.inpClienteEmail.value = state.clienteEmail;
    if (dom.inpFestejado) dom.inpFestejado.value = state.festejado;
    if (dom.inpEdadFestejado) dom.inpEdadFestejado.value = state.edadFestejado;
    if (dom.inpTipoFestejo) dom.inpTipoFestejo.value = state.tipoFestejo;
    if (dom.inpTematica) dom.inpTematica.value = state.tematica;
    if (dom.inpColoresGlobos) dom.inpColoresGlobos.value = state.coloresGlobos;
    if (dom.inpTipoLetrero) dom.inpTipoLetrero.value = state.tipoLetrero;
    if (dom.inpFechaEvento) dom.inpFechaEvento.value = state.fechaEvento;
    if (dom.inpLugarEvento) dom.inpLugarEvento.value = state.lugarEvento;
    if (dom.inpHoraMontaje) dom.inpHoraMontaje.value = state.horaMontaje;
    if (dom.inpHoraEvento) dom.inpHoraEvento.value = state.horaEvento;
    if (dom.inpHoraDesmontaje) dom.inpHoraDesmontaje.value = state.horaDesmontaje;
    if (dom.inpFlete) dom.inpFlete.value = state.flete;
    if (dom.inpDescuento) dom.inpDescuento.value = state.descuento;
    if (dom.inpAnticipoPct && document.activeElement !== dom.inpAnticipoPct) dom.inpAnticipoPct.value = state.anticipoPorcentaje;
    if (dom.inpAnticipoMonto && document.activeElement !== dom.inpAnticipoMonto) dom.inpAnticipoMonto.value = state.anticipoMonto;
    if (dom.inpNotasBancarias) dom.inpNotasBancarias.value = state.notasBancarias;

    // Actualizar botones de preset con soporte multi-selección
    const presetMap = {
      paquete1: dom.btnPreset1,
      paquete2: dom.btnPreset2,
      paquete3: dom.btnPreset3,
      paquete_invitaciones: dom.btnPresetInvitaciones,
      paquete_fotografia: dom.btnPresetFotografia
    };

    const seleccionados = Array.isArray(state.paquetesSeleccionados) ? state.paquetesSeleccionados : [state.paqueteSeleccionado];

    Object.entries(presetMap).forEach(([key, btn]) => {
      if (!btn) return;
      if (seleccionados.includes(key)) {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    });
  }

  function renderSidebarItems() {
    if (!dom.itemsContainer) return;
    dom.itemsContainer.innerHTML = '';

    state.items.forEach((item, index) => {
      const row = document.createElement('div');
      row.className = 'item-edit-row';
      row.innerHTML = `
        <input type="number" min="1" max="500" value="${item.cant}" data-index="${index}" data-field="cant" style="text-align: center; font-weight: 700;">
        <div>
          <input type="text" value="${escapeHtml(item.titulo)}" data-index="${index}" data-field="titulo" style="font-weight: 600; margin-bottom: 4px;" placeholder="Título del concepto">
          <input type="text" value="${escapeHtml(item.descripcion)}" data-index="${index}" data-field="descripcion" style="font-size: 0.72rem; color: #CBD5E1;" placeholder="Descripción técnica / inclusiones">
          <div style="display: flex; gap: 6px; margin-top: 4px;">
            <input type="text" value="${escapeHtml(item.horario)}" data-index="${index}" data-field="horario" style="font-size: 0.72rem;" placeholder="Horario / Vigencia">
          </div>
        </div>
        <div>
          <label style="font-size: 0.65rem;">Precio c/u</label>
          <input type="number" min="0" step="50" value="${item.precioUnitario}" data-index="${index}" data-field="precioUnitario" style="text-align: right; font-weight: 700;">
        </div>
        <button type="button" class="btn-remove-item" data-index="${index}" title="Eliminar concepto">
          <i class="bi bi-trash3-fill"></i>
        </button>
      `;
      dom.itemsContainer.appendChild(row);
    });
  }

  function renderSheet() {
    // Encabezado
    if (dom.sheetFolio) dom.sheetFolio.textContent = state.folio;
    if (dom.sheetFechaEmision) dom.sheetFechaEmision.textContent = state.fechaEmision;

    // Comparecientes
    if (dom.sheetClienteNombre) dom.sheetClienteNombre.textContent = state.clienteNombre || 'Nombre del Cliente';
    if (dom.sheetClienteTelefono) dom.sheetClienteTelefono.textContent = state.clienteTelefono || '81-0000-0000';
    if (dom.sheetLugarEvento) dom.sheetLugarEvento.textContent = state.lugarEvento || 'Salón o Domicilio por confirmar';
    if (dom.sheetFechaEvento) dom.sheetFechaEvento.textContent = formatDateForDisplay(state.fechaEvento);
    if (dom.sheetSignCliente) dom.sheetSignCliente.textContent = state.clienteNombre || 'Nombre del Cliente';

    // Festejado y Temática
    if (dom.sheetFestejadoInfo) {
      dom.sheetFestejadoInfo.textContent = `${state.festejado || 'Festejado'} (${state.edadFestejado || 'Cumpleaños'}) · ${state.tipoFestejo}`;
    }
    if (dom.sheetTematicaInfo) {
      dom.sheetTematicaInfo.textContent = `Temática: ${state.tematica} | Paleta: ${state.coloresGlobos} | Letrero: ${state.tipoLetrero}`;
    }
    if (dom.sheetHorariosInfo) {
      dom.sheetHorariosInfo.textContent = `Montaje: ${state.horaMontaje} | Evento: ${state.horaEvento} | Desmontaje: ${state.horaDesmontaje}`;
    }

    if (dom.sheetBankInfo) {
      dom.sheetBankInfo.textContent = state.notasBancarias;
    }

    // Tabla de la Hoja
    if (dom.sheetTableBody) {
      dom.sheetTableBody.innerHTML = '';
      state.items.forEach(item => {
        const totalLinea = (Number(item.cant) || 1) * (Number(item.precioUnitario) || 0);
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td class="col-center" style="font-weight: 700;">${item.cant}</td>
          <td>
            <span class="item-title-text">${escapeHtml(item.titulo)}</span>
            <span class="item-desc-text">${escapeHtml(item.descripcion)}</span>
          </td>
          <td class="col-center" style="font-size: 0.75rem; color: #475569;">${escapeHtml(item.horario)}</td>
          <td class="col-right" style="font-weight: 700; color: #0E0B18;">${formatMoney(totalLinea)}</td>
        `;
        dom.sheetTableBody.appendChild(tr);
      });
    }
  }

  function updateCalculations() {
    let subtotal = 0;
    state.items.forEach(item => {
      subtotal += (Number(item.cant) || 1) * (Number(item.precioUnitario) || 0);
    });

    const flete = Number(state.flete) || 0;
    const descuento = Number(state.descuento) || 0;
    const total = Math.max(0, subtotal + flete - descuento);

    let anticipo = 0;
    let pct = 50;

    if (state.anticipoModo === 'monto') {
      anticipo = Math.min(total, Math.max(0, Number(state.anticipoMonto) || 0));
      pct = total > 0 ? Math.round((anticipo / total) * 100) : 0;
      state.anticipoPorcentaje = pct;
    } else {
      pct = Number(state.anticipoPorcentaje) || 50;
      anticipo = Math.round(total * (pct / 100));
      state.anticipoMonto = anticipo;
    }

    const saldo = Math.max(0, total - anticipo);

    // Sincronizar inputs de anticipo sin interrumpir el foco del usuario
    if (dom.inpAnticipoPct && document.activeElement !== dom.inpAnticipoPct) {
      dom.inpAnticipoPct.value = pct;
    }
    if (dom.inpAnticipoMonto && document.activeElement !== dom.inpAnticipoMonto) {
      dom.inpAnticipoMonto.value = anticipo;
    }

    // Actualizar Sidebar
    if (dom.sideSubtotal) dom.sideSubtotal.textContent = formatMoney(subtotal);
    if (dom.sideFlete) dom.sideFlete.textContent = formatMoney(flete);
    if (dom.sideDescuento) dom.sideDescuento.textContent = formatMoney(descuento);
    if (dom.sideTotal) dom.sideTotal.textContent = formatMoney(total);
    if (dom.sideAnticipo) dom.sideAnticipo.textContent = formatMoney(anticipo);
    if (dom.sideSaldo) dom.sideSaldo.textContent = formatMoney(saldo);

    // Actualizar Hoja Membretada Oficial
    if (dom.sheetSubtotalVal) dom.sheetSubtotalVal.textContent = formatMoney(subtotal);
    if (dom.sheetFleteVal) dom.sheetFleteVal.textContent = formatMoney(flete);
    if (dom.sheetTotalVal) dom.sheetTotalVal.textContent = formatMoney(total);
    if (dom.sheetAnticipoVal) dom.sheetAnticipoVal.textContent = formatMoney(anticipo);
    if (dom.sheetSaldoVal) dom.sheetSaldoVal.textContent = formatMoney(saldo);
    if (dom.sheetAnticipoLabel) dom.sheetAnticipoLabel.textContent = `${pct}%`;

    // Desglose de Descuento en la Hoja (visible sólo si descuento > 0)
    if (dom.sheetDescuentoRow && dom.sheetDescuentoVal) {
      if (descuento > 0) {
        dom.sheetDescuentoRow.style.display = 'flex';
        dom.sheetDescuentoVal.textContent = '-' + formatMoney(descuento);
      } else {
        dom.sheetDescuentoRow.style.display = 'none';
      }
    }

    // Actualizar Barra Flotante en Móviles (Sticky Live Bar)
    if (dom.mBarTotal) dom.mBarTotal.textContent = formatMoney(total);
    if (dom.mBarAnticipo) dom.mBarAnticipo.textContent = formatMoney(anticipo);

    // Auto-guardado en LocalStorage
    saveToStorage();
  }

  // =========================================================================
  // EVENT LISTENERS & VINCULACIÓN REACTIVA EN VIVO
  // =========================================================================
  function setupEventListeners() {
    // Inputs del formulario con sincronización multievento (input, change, keyup, paste)
    const bindInput = (el, key, isNumber = false) => {
      if (!el) return;
      ['input', 'change', 'keyup', 'paste'].forEach(evt => {
        el.addEventListener(evt, e => {
          state[key] = isNumber ? Number(e.target.value) || 0 : e.target.value;
          renderSheet();
          updateCalculations();
        });
      });
    };

    bindInput(dom.inpFolio, 'folio');
    if (dom.inpFolio) {
      ['input', 'change'].forEach(evt => {
        dom.inpFolio.addEventListener(evt, e => {
          syncFolioCounterFromText(e.target.value);
        });
      });
    }
    bindInput(dom.inpFechaEmision, 'fechaEmision');
    bindInput(dom.inpClienteNombre, 'clienteNombre');
    bindInput(dom.inpClienteTelefono, 'clienteTelefono');
    bindInput(dom.inpClienteEmail, 'clienteEmail');
    bindInput(dom.inpFestejado, 'festejado');
    bindInput(dom.inpEdadFestejado, 'edadFestejado');
    bindInput(dom.inpTipoFestejo, 'tipoFestejo');
    bindInput(dom.inpTematica, 'tematica');
    bindInput(dom.inpColoresGlobos, 'coloresGlobos');
    bindInput(dom.inpTipoLetrero, 'tipoLetrero');
    bindInput(dom.inpFechaEvento, 'fechaEvento');
    bindInput(dom.inpLugarEvento, 'lugarEvento');
    bindInput(dom.inpHoraMontaje, 'horaMontaje');
    bindInput(dom.inpHoraEvento, 'horaEvento');
    bindInput(dom.inpHoraDesmontaje, 'horaDesmontaje');
    bindInput(dom.inpFlete, 'flete', true);
    bindInput(dom.inpDescuento, 'descuento', true);
    bindInput(dom.inpNotasBancarias, 'notasBancarias');

    // Botón para limpiar descuento a $0
    if (dom.btnClearDescuento) {
      dom.btnClearDescuento.addEventListener('click', () => {
        state.descuento = 0;
        if (dom.inpDescuento) dom.inpDescuento.value = 0;
        renderSheet();
        updateCalculations();
        showToast('Descuento eliminado ($0). Total actualizado.', 'info');
      });
    }

    // Sincronización dual de Anticipo (% y $ MXN)
    if (dom.inpAnticipoPct) {
      ['input', 'change', 'keyup'].forEach(evt => {
        dom.inpAnticipoPct.addEventListener(evt, e => {
          state.anticipoModo = 'porcentaje';
          state.anticipoPorcentaje = Number(e.target.value) || 0;
          updateCalculations();
        });
      });
    }

    if (dom.inpAnticipoMonto) {
      ['input', 'change', 'keyup'].forEach(evt => {
        dom.inpAnticipoMonto.addEventListener(evt, e => {
          state.anticipoModo = 'monto';
          state.anticipoMonto = Number(e.target.value) || 0;
          updateCalculations();
        });
      });
    }

    // Sincronización bidireccional desde la hoja membretada hacia el formulario (contenteditable)
    const bindContentEditable = (sheetEl, key, inputEl) => {
      if (!sheetEl) return;
      ['input', 'keyup', 'blur'].forEach(evt => {
        sheetEl.addEventListener(evt, () => {
          const val = sheetEl.innerText.trim();
          state[key] = val;
          if (inputEl && document.activeElement !== inputEl) {
            inputEl.value = val;
          }
          if (key === 'clienteNombre' && dom.sheetSignCliente && document.activeElement !== dom.sheetSignCliente) {
            dom.sheetSignCliente.textContent = val;
          }
          updateCalculations();
        });
      });
    };

    bindContentEditable(dom.sheetClienteNombre, 'clienteNombre', dom.inpClienteNombre);
    bindContentEditable(dom.sheetClienteTelefono, 'clienteTelefono', dom.inpClienteTelefono);
    bindContentEditable(dom.sheetLugarEvento, 'lugarEvento', dom.inpLugarEvento);
    bindContentEditable(dom.sheetSignCliente, 'clienteNombre', dom.inpClienteNombre);
    bindContentEditable(dom.sheetFolio, 'folio', dom.inpFolio);
    if (dom.sheetFolio) {
      ['input', 'blur'].forEach(evt => {
        dom.sheetFolio.addEventListener(evt, () => {
          syncFolioCounterFromText(dom.sheetFolio.textContent);
        });
      });
    }
    bindContentEditable(dom.sheetFechaEmision, 'fechaEmision', dom.inpFechaEmision);

    // Cambio de Zona de Flete / Tarifas (actualiza todos los paquetes activos)
    if (dom.selZona) {
      dom.selZona.addEventListener('change', e => {
        state.zona = e.target.value;
        state.items.forEach(it => {
          if (it.paqueteKey && PAQUETES[it.paqueteKey]) {
            const itemDef = PAQUETES[it.paqueteKey].items[it.itemIndex];
            if (itemDef && typeof itemDef.precio === 'function') {
              it.precioUnitario = itemDef.precio(state.zona);
            }
          }
        });

        if (state.zona === 'otras_zonas') {
          state.flete = 350;
        } else if (state.flete === 350) {
          state.flete = 0;
        }
        renderAll();
      });
    }

    // Botones de presets oficiales (Selección Múltiple Combinable en 1 clic)
    if (dom.btnPreset1) {
      dom.btnPreset1.addEventListener('click', () => {
        togglePaquete('paquete1');
      });
    }
    if (dom.btnPreset2) {
      dom.btnPreset2.addEventListener('click', () => {
        togglePaquete('paquete2');
      });
    }
    if (dom.btnPreset3) {
      dom.btnPreset3.addEventListener('click', () => {
        togglePaquete('paquete3');
      });
    }
    if (dom.btnPresetInvitaciones) {
      dom.btnPresetInvitaciones.addEventListener('click', () => {
        togglePaquete('paquete_invitaciones');
      });
    }
    if (dom.btnPresetFotografia) {
      dom.btnPresetFotografia.addEventListener('click', () => {
        togglePaquete('paquete_fotografia');
      });
    }

    // Barra de agregar paquetes rápidos al contrato
    if (dom.btnQuickAddPackage && dom.selQuickAddPackage) {
      dom.btnQuickAddPackage.addEventListener('click', () => {
        agregarPaquete(dom.selQuickAddPackage.value);
      });
    }

    // Botón para limpiar todos los paquetes del contrato
    if (dom.btnClearAllPackages) {
      dom.btnClearAllPackages.addEventListener('click', () => {
        limpiarTodosLosPaquetes();
      });
    }

    // Botón en Sección 5 para abrir / hacer foco en selector de paquetes
    if (dom.btnOpenAddPackage) {
      dom.btnOpenAddPackage.addEventListener('click', () => {
        if (dom.selQuickAddPackage) {
          dom.selQuickAddPackage.scrollIntoView({ behavior: 'smooth', block: 'center' });
          dom.selQuickAddPackage.focus();
          dom.selQuickAddPackage.style.outline = '2px solid var(--turquoise-neon)';
          setTimeout(() => {
            dom.selQuickAddPackage.style.outline = '';
          }, 1500);
        }
      });
    }

    // Delegación de eventos para badges de paquetes activos (eliminar paquete con botón ✕)
    if (dom.activePackagesList) {
      dom.activePackagesList.addEventListener('click', e => {
        const btn = e.target.closest('.btn-remove-pkg');
        if (btn) {
          const pkgKey = btn.dataset.pkg;
          if (pkgKey) {
            removerPaquetePorClave(pkgKey);
          }
        }
      });
    }

    // Botones de navegación y scroll en móvil
    if (dom.btnScrollToSheet) {
      dom.btnScrollToSheet.addEventListener('click', () => {
        const sheet = document.getElementById('contractSheet');
        if (sheet) sheet.scrollIntoView({ behavior: 'smooth' });
      });
    }
    if (dom.btnScrollToForm) {
      dom.btnScrollToForm.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Edición de items en el panel lateral
    if (dom.itemsContainer) {
      dom.itemsContainer.addEventListener('input', e => {
        const index = e.target.dataset.index;
        const field = e.target.dataset.field;
        if (index !== undefined && field && state.items[index]) {
          state.items[index][field] = (field === 'cant' || field === 'precioUnitario')
            ? Number(e.target.value) || 0
            : e.target.value;
          renderSheet();
          updateCalculations();
        }
      });

      dom.itemsContainer.addEventListener('click', e => {
        const btn = e.target.closest('.btn-remove-item');
        if (btn) {
          const index = btn.dataset.index;
          if (index !== undefined) {
            state.items.splice(index, 1);
            state.paqueteSeleccionado = 'custom';
            renderSidebarItems();
            renderSheet();
            updateCalculations();
          }
        }
      });
    }

    // Botón agregar concepto manual
    if (dom.btnAddItem) {
      dom.btnAddItem.addEventListener('click', () => {
        state.items.push({
          id: 'item_' + Date.now(),
          cant: 1,
          titulo: 'Servicio / Mobiliario Adicional',
          descripcion: 'Especificaciones del mobiliario o decoración solicitada.',
          horario: 'Evento Completo',
          precioUnitario: 500
        });
        state.paqueteSeleccionado = 'custom';
        renderSidebarItems();
        renderSheet();
        updateCalculations();
      });
    }

    // Botones de adicionales rápidos (chips)
    document.querySelectorAll('.btn-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const cant = Number(chip.dataset.cant) || 1;
        const titulo = chip.dataset.titulo || 'Adicional';
        const desc = chip.dataset.desc || '';
        const precio = Number(chip.dataset.precio) || 0;
        const horario = chip.dataset.horario || 'Evento Completo';

        state.items.push({
          id: 'item_' + Date.now(),
          cant: cant,
          titulo: titulo,
          descripcion: desc,
          horario: horario,
          precioUnitario: precio
        });
        state.paqueteSeleccionado = 'custom';
        renderSidebarItems();
        renderSheet();
        updateCalculations();
      });
    });

    // Botón nuevo folio (incrementa el consecutivo: 00691 -> 00692 -> 00693...)
    if (dom.btnNewFolio) {
      dom.btnNewFolio.addEventListener('click', () => {
        state.folio = generateFolio(true);
        if (dom.inpFolio) dom.inpFolio.value = state.folio;
        renderSheet();
        updateCalculations();
        showToast(`Nuevo Folio Consecutivo: ${state.folio}`, 'info');
      });
    }

    // Botón Imprimir / PDF
    if (dom.btnPrint) {
      dom.btnPrint.addEventListener('click', () => {
        window.print();
      });
    }

    // Botón Descargar PDF directo
    if (dom.btnDownloadPdf) {
      dom.btnDownloadPdf.addEventListener('click', () => {
        triggerPdfExport();
      });
    }

    // Botón WhatsApp
    if (dom.btnWhatsApp) {
      dom.btnWhatsApp.addEventListener('click', () => {
        enviarPorWhatsApp();
      });
    }

    // Botón Copiar Resumen
    if (dom.btnCopySummary) {
      dom.btnCopySummary.addEventListener('click', () => {
        copiarResumenAlPortapapeles();
      });
    }

    // Botón Reset / Nuevo Contrato
    if (dom.btnReset) {
      dom.btnReset.addEventListener('click', () => {
        if (confirm('¿Deseas reiniciar el formulario a un contrato nuevo? Se generará un nuevo folio consecutivo.')) {
          localStorage.removeItem('nancy_contrato_draft');
          state.folio = generateFolio(true);
          state.fechaEmision = getFormattedCurrentDate();
          state.descuento = 0;
          cargarItemsDePaquete('paquete1', state.zona);
          renderAll();
          showToast(`Nuevo Contrato Iniciado: ${state.folio}`, 'success');
        }
      });
    }
  }

  // =========================================================================
  // EXPORTACIÓN A PDF Y WHATSAPP
  // =========================================================================
  function triggerPdfExport() {
    const btn = dom.btnDownloadPdf;
    const originalHtml = btn ? btn.innerHTML : '';
    if (btn) {
      btn.innerHTML = '<i class="bi bi-hourglass-split"></i> Generando PDF...';
      btn.disabled = true;
      btn.style.opacity = '0.75';
    }

    const cleanClientName = (state.clienteNombre || 'Cliente').replace(/[^a-zA-Z0-9]/g, '_');
    const filename = `Contrato_NancyEventos_${state.folio}_${cleanClientName}.pdf`;

    // Si tenemos el Data URI del logo, lo inyectamos directamente para evitar que el canvas se considere "tainted" por file:///
    if (window.NANCY_LOGO_DATA_URI) {
      const emblem = document.querySelector('.sheet-emblem-img');
      if (emblem) emblem.src = window.NANCY_LOGO_DATA_URI;
    }

    // Función para restaurar botón
    const restoreBtn = () => {
      if (btn) {
        btn.innerHTML = originalHtml;
        btn.disabled = false;
        btn.style.opacity = '1';
      }
    };

    // Si la librería html2pdf está disponible
    if (typeof window.html2pdf === 'function') {
      const opt = {
        margin: [6, 6, 6, 6],
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          logging: false,
          scrollY: 0,
          scrollX: 0
        },
        jsPDF: { unit: 'mm', format: 'letter', orientation: 'portrait' }
      };

      try {
        const worker = window.html2pdf().set(opt).from(sheetEl);

        // Intentar guardar con temporizador de seguridad (fallback a impresión tras 4.5 segundos si el navegador bloquea blobs en file:///)
        let finished = false;

        const downloadTimer = setTimeout(() => {
          if (!finished) {
            finished = true;
            console.warn('html2pdf tardó demasiado o fue bloqueado por file:///. Activando diálogo nativo...');
            restoreBtn();
            window.print();
          }
        }, 4500);

        worker.save().then(() => {
          if (!finished) {
            finished = true;
            clearTimeout(downloadTimer);
            restoreBtn();
          }
        }).catch(err => {
          if (!finished) {
            finished = true;
            clearTimeout(downloadTimer);
            console.warn('html2pdf save error, usando diálogo de impresión:', err);
            restoreBtn();
            window.print();
          }
        });
      } catch (err) {
        console.warn('Excepción al invocar html2pdf:', err);
        restoreBtn();
        window.print();
      }
    } else {
      restoreBtn();
      window.print();
    }
  }

  function buildWhatsAppMessage() {
    let subtotal = 0;
    state.items.forEach(item => {
      subtotal += (Number(item.cant) || 1) * (Number(item.precioUnitario) || 0);
    });
    const flete = Number(state.flete) || 0;
    const descuento = Number(state.descuento) || 0;
    const total = Math.max(0, subtotal + flete - descuento);

    let anticipo = 0;
    let pct = 50;
    if (state.anticipoModo === 'monto') {
      anticipo = Math.min(total, Math.max(0, Number(state.anticipoMonto) || 0));
      pct = total > 0 ? Math.round((anticipo / total) * 100) : 0;
    } else {
      pct = Number(state.anticipoPorcentaje) || 50;
      anticipo = Math.round(total * (pct / 100));
    }
    const saldo = Math.max(0, total - anticipo);

    const fechaFestejo = formatDateForDisplay(state.fechaEvento);
    const itemsText = state.items.map(it => `  • ${it.cant}x ${it.titulo} (${formatMoney((Number(it.cant) || 1) * (Number(it.precioUnitario) || 0))})`).join('\n');

    const desgloseExtra = [];
    if (flete > 0) desgloseExtra.push(`🚚 *Flete / Logística:* ${formatMoney(flete)} MXN`);
    if (descuento > 0) desgloseExtra.push(`🎁 *Descuento Especial Aplicado:* -${formatMoney(descuento)} MXN`);
    const extraStr = desgloseExtra.length > 0 ? '\n' + desgloseExtra.join('\n') : '';

    return `¡Hola ${state.clienteNombre}! 🎈 Te saluda Nancy Eventos.

Adjunto tu Contrato Oficial de Servicio con Folio *${state.folio}* para el festejo de *${state.festejado}* (${state.edadFestejado}) el día *${fechaFestejo}*.

📍 *Lugar:* ${state.lugarEvento}
🎨 *Temática:* ${state.tematica}
⏰ *Montaje:* ${state.horaMontaje}

📋 *Servicios y Mobiliario:*
${itemsText}
${extraStr}
💰 *Inversión Total:* ${formatMoney(total)} MXN
🔒 *Anticipo de Reserva (${pct}%):* ${formatMoney(anticipo)} MXN
💵 *Saldo restante al montaje:* ${formatMoney(saldo)} MXN

💳 *Datos para Transferencia / Depósito:*
${state.notasBancarias}

En cuanto nos compartas tu comprobante, tu fecha queda formalmente blindada en nuestra agenda. ¡Muchas gracias por tu confianza! ✨`;
  }

  function enviarPorWhatsApp() {
    const rawPhone = (state.clienteTelefono || '').replace(/[^0-9]/g, '');
    let cleanPhone = rawPhone;
    if (cleanPhone.length === 10) {
      cleanPhone = '52' + cleanPhone;
    }

    const msg = buildWhatsAppMessage();
    const encoded = encodeURIComponent(msg);
    const targetUrl = cleanPhone.length >= 10
      ? `https://wa.me/${cleanPhone}?text=${encoded}`
      : `https://wa.me/528110626302?text=${encoded}`;

    window.open(targetUrl, '_blank');
  }

  function copiarResumenAlPortapapeles() {
    const msg = buildWhatsAppMessage();
    navigator.clipboard.writeText(msg).then(() => {
      alert('¡Resumen del contrato copiado al portapapeles! Listo para pegarlo en WhatsApp.');
    }).catch(() => {
      prompt('Copia el texto del contrato:', msg);
    });
  }

  // =========================================================================
  // PERSISTENCIA (LOCALSTORAGE)
  // =========================================================================
  function saveToStorage() {
    try {
      localStorage.setItem('nancy_contrato_draft', JSON.stringify(state));
    } catch (e) {
      // Ignorar errores de cuota o modo privado
    }
  }

  function loadFromStorage() {
    try {
      const saved = localStorage.getItem('nancy_contrato_draft');
      if (saved) {
        const parsed = JSON.parse(saved);
        Object.assign(state, parsed);

        // Migración hacia selección múltiple de paquetes
        if (!Array.isArray(state.paquetesSeleccionados)) {
          state.paquetesSeleccionados = state.paqueteSeleccionado ? [state.paqueteSeleccionado] : ['paquete1'];
        }

        // Limpieza automática del descuento fantasma ($2,500) atascado de pruebas previas
        if (state.descuento === 2500) {
          state.descuento = 0;
        }

        // Migración hacia serie consecutiva oficial (empieza en 00691 y sube)
        const folioDigits = String(state.folio || '').match(/\d{3,6}/);
        const currentFolioNum = folioDigits ? parseInt(folioDigits[0], 10) : 0;
        if (currentFolioNum < FOLIO_START_NUM) {
          state.folio = generateFolio(false); // Asigna CTR-2026-00691
        } else {
          setFolioNumber(currentFolioNum);
        }
      }
    } catch (e) {
      // Usar estado inicial si falla
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // =========================================================================
  // SISTEMA DE NOTIFICACIONES TOAST (FEEDBACK EN TIEMPO REAL)
  // =========================================================================
  function showToast(message, type = 'info') {
    if (!message) return;
    try {
      let toastContainer = document.getElementById('nancyToastContainer');
      if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'nancyToastContainer';
        toastContainer.className = 'nancy-toast-container';
        document.body.appendChild(toastContainer);
      }

      const toast = document.createElement('div');
      toast.className = `nancy-toast nancy-toast-${type}`;
      const iconClass = type === 'success' ? 'bi-check-circle-fill' : type === 'warning' ? 'bi-exclamation-triangle-fill' : 'bi-info-circle-fill';
      toast.innerHTML = `
        <i class="bi ${iconClass}"></i>
        <span class="nancy-toast-text">${escapeHtml(message)}</span>
      `;

      toastContainer.appendChild(toast);

      setTimeout(() => {
        toast.classList.add('nancy-toast-hiding');
        setTimeout(() => {
          if (toast.parentNode) toast.remove();
        }, 300);
      }, 3500);
    } catch (e) {
      console.log('Toast:', message);
    }
  }

  // =========================================================================
  // CONTROLADOR DE SEGURIDAD Y ACCESO POR PIN (NANCY EVENTOS)
  // =========================================================================
  const MASTER_PIN = '1062';
  const AUTH_STORAGE_KEY = 'nancy_eventos_auth_v1';
  let currentPin = '';

  function initSecurity() {
    const authOverlay = document.getElementById('authOverlay');
    const pinDots = document.querySelectorAll('#pinDots .pin-dot');
    const pinStatusMsg = document.getElementById('pinStatusMsg');
    const chkRemember = document.getElementById('chkRememberDevice');
    const btnLockApp = document.getElementById('btnLockApp');
    const keypadButtons = document.querySelectorAll('.key-btn');
    const authCard = authOverlay ? authOverlay.querySelector('.auth-card') : null;

    function updateDots() {
      pinDots.forEach((dot, index) => {
        if (index < currentPin.length) {
          dot.classList.add('filled');
        } else {
          dot.classList.remove('filled', 'success');
        }
      });
    }

    function unlockApp(isFromMagicLink) {
      document.body.classList.add('authenticated');
      if (chkRemember && chkRemember.checked) {
        try {
          localStorage.setItem(AUTH_STORAGE_KEY, 'authenticated');
        } catch (e) {
          // localStorage no disponible en modo ultra incógnito
        }
      }
      if (isFromMagicLink) {
        showToast('¡Bienvenida Nancy! Sesión recordada en este dispositivo.');
      }
    }

    function lockApp() {
      try {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      } catch (e) {}
      document.body.classList.remove('authenticated');
      currentPin = '';
      updateDots();
      if (pinStatusMsg) {
        pinStatusMsg.textContent = 'Sesión cerrada. Ingresa tu PIN para volver a entrar.';
        pinStatusMsg.classList.remove('success');
      }
    }

    function validatePin() {
      if (currentPin === MASTER_PIN) {
        pinDots.forEach(dot => dot.classList.add('success'));
        if (pinStatusMsg) {
          pinStatusMsg.textContent = '¡PIN Correcto! Accediendo...';
          pinStatusMsg.classList.add('success');
        }
        setTimeout(() => {
          unlockApp(false);
          currentPin = '';
          updateDots();
          if (pinStatusMsg) pinStatusMsg.textContent = '';
        }, 250);
      } else {
        if (authCard) {
          authCard.classList.remove('shake');
          void authCard.offsetWidth; // Forzar reflow para reiniciar animación
          authCard.classList.add('shake');
        }
        if (pinStatusMsg) {
          pinStatusMsg.textContent = 'PIN incorrecto. Intenta nuevamente.';
          pinStatusMsg.classList.remove('success');
        }
        setTimeout(() => {
          currentPin = '';
          updateDots();
        }, 350);
      }
    }

    function handleKeyPress(key) {
      if (document.body.classList.contains('authenticated')) return;

      if (key === 'clear') {
        currentPin = '';
        updateDots();
        if (pinStatusMsg) pinStatusMsg.textContent = '';
        return;
      }

      if (key === 'enter') {
        if (currentPin.length > 0) validatePin();
        return;
      }

      if (/^[0-9]$/.test(key)) {
        if (currentPin.length < 4) {
          currentPin += key;
          updateDots();
          if (pinStatusMsg) pinStatusMsg.textContent = '';
          if (currentPin.length === 4) {
            validatePin();
          }
        }
      }
    }

    // Configurar botones del teclado en pantalla
    keypadButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const key = btn.getAttribute('data-key');
        handleKeyPress(key);
      });
    });

    // Soporte para teclado físico o teclado nativo de móvil
    window.addEventListener('keydown', (e) => {
      if (document.body.classList.contains('authenticated')) return;
      if (e.key >= '0' && e.key <= '9') {
        handleKeyPress(e.key);
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        handleKeyPress('clear');
      } else if (e.key === 'Enter') {
        handleKeyPress('enter');
      }
    });

    // Botón de Bloqueo en la barra superior
    if (btnLockApp) {
      btnLockApp.addEventListener('click', () => {
        if (confirm('¿Deseas bloquear el acceso a los contratos en este dispositivo?')) {
          lockApp();
        }
      });
    }

    // 1. Verificar si viene por Enlace Mágico (URL Query: ?pin=1062 o ?key=1062)
    const urlParams = new URLSearchParams(window.location.search);
    const queryPin = urlParams.get('pin') || urlParams.get('key');

    if (queryPin && queryPin.trim() === MASTER_PIN) {
      // Remover el PIN de la barra de direcciones para que no sea visible
      try {
        const cleanUrl = window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
      } catch (e) {}

      unlockApp(true);
      return;
    }

    // 2. Verificar si ya estaba autenticado en este dispositivo
    try {
      const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
      if (savedAuth === 'authenticated') {
        document.body.classList.add('authenticated');
        return;
      }
    } catch (e) {}

    // Si no está autenticado, mantener el bloqueo activo
    document.body.classList.remove('authenticated');
  }

  // =========================================================================
  // CONTROLADOR PWA (PROGRESSIVE WEB APP) & SOPORTE MÓVIL OFFLINE
  // =========================================================================
  function initPwa() {
    // 1. Registro de Service Worker para soporte Offline y carga ultra rápida
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then(reg => {
            console.log('Nancy Contratos PWA: ServiceWorker registrado en', reg.scope);
          })
          .catch(err => {
            console.warn('ServiceWorker no disponible en este entorno:', err.message);
          });
      });
    }

    // 2. Banner de instalación nativa (Chrome / Android / Desktop)
    let deferredPrompt;
    const btnInstall = document.getElementById('btnInstallPwa');

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      if (btnInstall) {
        btnInstall.style.display = 'inline-flex';
      }
    });

    if (btnInstall) {
      btnInstall.addEventListener('click', async () => {
        if (!deferredPrompt) {
          showToast('Para instalar: abre el menú de tu navegador y selecciona "Instalar aplicación" o "Agregar a pantalla principal".');
          return;
        }
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          showToast('¡Nancy Contratos se instaló en tu dispositivo!');
        }
        deferredPrompt = null;
        btnInstall.style.display = 'none';
      });
    }

    window.addEventListener('appinstalled', () => {
      if (btnInstall) btnInstall.style.display = 'none';
      showToast('¡Nancy Contratos instalada con éxito!');
    });

    // 3. Detección y Guía visual para iPhone / iPad (Safari iOS)
    const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

    if (isIos && !isStandalone) {
      const dismissed = localStorage.getItem('nancy_ios_pwa_toast_dismissed');
      if (!dismissed) {
        setTimeout(showIosInstallBanner, 1500);
      }
    }
  }

  function showIosInstallBanner() {
    const toast = document.createElement('div');
    toast.className = 'ios-install-toast';
    toast.innerHTML = `
      <div>
        <strong style="color: var(--turquoise-neon); display: block; margin-bottom: 2px;">📲 Nancy: Instálala como App en tu iPhone:</strong>
        Toca el botón <strong>Compartir</strong> <i class="bi bi-box-arrow-up"></i> y luego <strong>"Agregar a inicio"</strong> ➕
      </div>
      <button type="button" style="background: none; border: none; color: #FFF; font-size: 1.3rem; cursor: pointer; padding: 4px; line-height: 1;" title="Cerrar">&times;</button>
    `;
    toast.querySelector('button').addEventListener('click', () => {
      localStorage.setItem('nancy_ios_pwa_toast_dismissed', 'true');
      toast.remove();
    });
    document.body.appendChild(toast);
  }

  // =========================================================================
  // INICIALIZACIÓN BLINDADA (CICLO DE VIDA SEGURO)
  // =========================================================================
  function initApp() {
    try { initDom(); } catch (e) { console.error('Nancy Contratos: Error en initDom:', e); }
    try {
      if (window.NANCY_LOGO_DATA_URI) {
        document.querySelectorAll('.sheet-emblem-img, .header-brand-logo, .auth-logo').forEach(img => {
          img.src = window.NANCY_LOGO_DATA_URI;
        });
      }
    } catch (e) { console.error('Nancy Contratos: Error en logo:', e); }
    try { initSecurity(); } catch (e) { console.error('Nancy Contratos: Error en initSecurity:', e); }
    try { initPwa(); } catch (e) { console.error('Nancy Contratos: Error en initPwa:', e); }
    try { loadFromStorage(); } catch (e) { console.error('Nancy Contratos: Error en loadFromStorage:', e); }
    try { renderAll(); } catch (e) { console.error('Nancy Contratos: Error en renderAll:', e); }
    try { setupEventListeners(); } catch (e) { console.error('Nancy Contratos: Error en setupEventListeners:', e); }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    // Si el DOM ya cargó (por cache o scripts diferidos)
    initApp();
  }

})();
