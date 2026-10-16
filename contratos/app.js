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
          titulo: 'Paquete 1: Aro Decorado con Globos High-Shine & Servicio de Caballetes Infantil (1 Hora)',
          descripcion: 'Aro metálico profesional con arco orgánico de globos (2 a 3 tonos de látex alta durabilidad con tratamiento de brillo High-Shine), letrero temático a elegir (Luz LED Neón o MDF calado) y mesita cilíndrica para pastel. Incluye servicio de arte con 5 caballetes dobles de madera (10 plazas infantiles simultáneas), pinturas vinílicas no tóxicas ilimitadas, dibujos temáticos, pinceles, recipientes con agua, toallitas húmedas limpiadoras y 1 persona de Staff de atención continua por 1 hora.',
          horario: 'Evento Completo / 1 Hr Caballetes',
          precio: function(zona) {
            return zona === 'juarez_guadalupe' ? 2000 : 2500;
          }
        }
      ]
    },

    paquete2: {
      nombre: 'Paquete 2: Elotes, Tostitos Preparados & Decoración Completa',
      badge: 'Elotes + Tostitos + Deco',
      precios: {
        juarez_guadalupe: 4000,
        monterrey: 4200,
        otras_zonas: 4400
      },
      items: [
        {
          cant: 1,
          titulo: 'Paquete 2: Barra de Snacks (25 Elotes + 25 Tostitos) & Decoración Escenográfica Completa',
          descripcion: 'Barra de antojitos calientes con 25 vasos de elote desgranado al vapor en el evento + 25 bolsas de Tostitos preparados en barquitos biodegradables con 7 aderezos (crema, mayonesa, chipotle, chile en polvo, queso cheddar caliente, salsa botanera y salsa casera) y 5 toppings crujientes (cacahuates, Cheetos, Ruffles, Doritos y queso rallado). Incluye decoración con Aro Decorado o Mampara Escenográfica con arco orgánico de globos High-Shine, letrero LED Neón o MDF temático y mesita para pastel.',
          horario: 'Evento Completo',
          precio: function(zona) {
            return zona === 'juarez_guadalupe' ? 4000 : 4200;
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
          titulo: 'Paquete 3: Taller Creativo de Arte (2 Horas), Caballete de Bienvenida & Lote de 30 Yesitos',
          descripcion: 'Taller infantil continuo de 2 horas con 5 caballetes dobles de madera (10 plazas simultáneas), 10 mandilitos protectores lavables, pinturas vinílicas no tóxicas y dibujos ilimitados con 1 persona de Staff. Incluye caballete de bienvenida con fotografía/póster temático enmarcado con arco orgánico de globos, más lote de 30 figuras de yeso cerámico empacadas individualmente en celofán con listón, pincel y botecito de pintura como souvenir para llevar a casa.',
          horario: '2 Horas de Taller',
          precio: function(zona) {
            return zona === 'juarez_guadalupe' ? 1900 : 2200;
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

  function generateFolio(advance = false, template = null) {
    let currentNum = getCurrentFolioNumber();
    if (advance) {
      currentNum += 1;
      setFolioNumber(currentNum);
    } else {
      setFolioNumber(currentNum);
    }
    return formatFolioString(currentNum, template);
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

  // =========================================================================
  // ESTADO DE LA APLICACIÓN (INICIO 100% EN BLANCO POR DEFECTO)
  // =========================================================================
  const state = {
    folio: generateFolio(),
    fechaEmision: getFormattedCurrentDate(),
    zona: 'monterrey',
    paquetesSeleccionados: [],
    paqueteSeleccionado: 'custom',
    clienteNombre: '',
    clienteTelefono: '',
    clienteEmail: '',
    festejado: '',
    edadFestejado: '',
    tipoFestejo: '',
    tematica: '',
    coloresGlobos: '',
    tipoLetrero: '',
    fechaEvento: '',
    lugarEvento: '',
    horaMontaje: '',
    horaEvento: '',
    horaDesmontaje: '',
    items: [],
    flete: 0,
    descuento: 0,
    anticipoPorcentaje: 50,
    anticipoMonto: 0,
    anticipoModo: 'porcentaje',
    notasBancarias: 'Banco: BBVA / Banorte | Beneficiaria: Nancy García (Nancy Eventos) | Cuenta / CLABE: 012 580 00123456789 0'
  };

  function resetStateToBlank(advanceFolio = false) {
    state.folio = generateFolio(advanceFolio, state.folio);
    state.fechaEmision = getFormattedCurrentDate();
    state.zona = 'monterrey';
    state.paquetesSeleccionados = [];
    state.paqueteSeleccionado = 'custom';
    state.clienteNombre = '';
    state.clienteTelefono = '';
    state.clienteEmail = '';
    state.festejado = '';
    state.edadFestejado = '';
    state.tipoFestejo = '';
    state.tematica = '';
    state.coloresGlobos = '';
    state.tipoLetrero = '';
    state.fechaEvento = '';
    state.lugarEvento = '';
    state.horaMontaje = '';
    state.horaEvento = '';
    state.horaDesmontaje = '';
    state.items = [];
    state.flete = 0;
    state.descuento = 0;
    state.anticipoPorcentaje = 50;
    state.anticipoMonto = 0;
    state.anticipoModo = 'porcentaje';
  }

  function limpiarContratoCompleto(advanceFolio = false, showNotification = true) {
    try {
      localStorage.removeItem('nancy_contrato_draft');
    } catch (e) {}

    resetStateToBlank(advanceFolio);

    // Limpiar explícitamente los campos del formulario en el DOM
    if (dom.inpClienteNombre) dom.inpClienteNombre.value = '';
    if (dom.inpClienteTelefono) dom.inpClienteTelefono.value = '';
    if (dom.inpClienteEmail) dom.inpClienteEmail.value = '';
    if (dom.inpFestejado) dom.inpFestejado.value = '';
    if (dom.inpEdadFestejado) dom.inpEdadFestejado.value = '';
    if (dom.inpTipoFestejo) dom.inpTipoFestejo.value = '';
    if (dom.inpTematica) dom.inpTematica.value = '';
    if (dom.inpColoresGlobos) dom.inpColoresGlobos.value = '';
    if (dom.inpTipoLetrero) dom.inpTipoLetrero.value = '';
    if (dom.inpFechaEvento) dom.inpFechaEvento.value = '';
    if (dom.inpLugarEvento) dom.inpLugarEvento.value = '';
    if (dom.inpHoraMontaje) dom.inpHoraMontaje.value = '';
    if (dom.inpHoraEvento) dom.inpHoraEvento.value = '';
    if (dom.inpHoraDesmontaje) dom.inpHoraDesmontaje.value = '';
    if (dom.inpFlete) dom.inpFlete.value = 0;
    if (dom.inpDescuento) dom.inpDescuento.value = 0;
    if (dom.inpAnticipoPct) dom.inpAnticipoPct.value = 50;
    if (dom.inpAnticipoMonto) dom.inpAnticipoMonto.value = '';

    // Desmarcar todos los botones de paquetes
    document.querySelectorAll('.btn-preset').forEach(btn => {
      btn.classList.remove('active');
      btn.setAttribute('aria-pressed', 'false');
    });

    renderAll();
    try { switchMobileView('form'); } catch (e) {}

    if (showNotification) {
      showToast('🗑️ Contrato limpiado: El documento está 100% en blanco para empezar de cero.', 'success');
    }
  }

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
    dom.btnClearContract = document.getElementById('btnClearContract');
    dom.btnSidebarClearContract = document.getElementById('btnSidebarClearContract');
    dom.btnClearItemsSection = document.getElementById('btnClearItemsSection');
    dom.btnMobileClear = document.getElementById('btnMobileClear');

    // Elementos de la barra flotante y navegación móvil
    dom.mBarTotal = document.getElementById('mBarTotal');
    dom.mBarAnticipo = document.getElementById('mBarAnticipo');
    dom.btnScrollToForm = document.getElementById('btnScrollToForm');
    dom.btnScrollToSheet = document.getElementById('btnScrollToSheet');
    dom.btnMobilePdf = document.getElementById('btnMobilePdf');
    dom.btnMobileWhatsApp = document.getElementById('btnMobileWhatsApp');
    dom.btnToggleMobileView = document.getElementById('btnToggleMobileView');
    dom.toggleViewText = document.getElementById('toggleViewText');
    dom.tabBtnForm = document.getElementById('tabBtnForm');
    dom.tabBtnSheet = document.getElementById('tabBtnSheet');
    dom.workspaceContainer = document.getElementById('workspaceContainer');
  }

  // =========================================================================
  // CONTROLADOR DE NAVEGACIÓN MÓVIL POR PESTAÑAS (SEGMENTED VIEW)
  // =========================================================================
  function switchMobileView(view) {
    const isSheet = view === 'sheet';
    const container = dom.workspaceContainer || document.getElementById('workspaceContainer');

    if (container) {
      if (isSheet) {
        container.classList.remove('tab-form-active');
        container.classList.add('tab-sheet-active');
      } else {
        container.classList.remove('tab-sheet-active');
        container.classList.add('tab-form-active');
      }
    }

    if (dom.tabBtnForm) dom.tabBtnForm.classList.toggle('active', !isSheet);
    if (dom.tabBtnSheet) dom.tabBtnSheet.classList.toggle('active', isSheet);

    if (dom.toggleViewText) {
      dom.toggleViewText.textContent = isSheet ? 'Editar Datos' : 'Ver Hoja';
    }
    if (dom.btnToggleMobileView) {
      const icon = dom.btnToggleMobileView.querySelector('i');
      if (icon) {
        icon.className = isSheet ? 'bi bi-pencil-fill' : 'bi bi-eye-fill';
      }
      dom.btnToggleMobileView.classList.toggle('btn-primary', !isSheet);
      dom.btnToggleMobileView.classList.toggle('btn-dark', isSheet);
    }

    // Asegurar que WhatsApp y PDF siempre permanezcan activos y visibles en móvil
    if (dom.btnMobilePdf) dom.btnMobilePdf.style.display = 'inline-flex';
    if (dom.btnMobileWhatsApp) dom.btnMobileWhatsApp.style.display = 'inline-flex';

    // Desplazamiento suave al inicio de la pantalla al cambiar de pestaña
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {}
  }

  // =========================================================================
  // FORMATOS Y UTILIDADES
  // =========================================================================

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

    if (!Array.isArray(state.items) || state.items.length === 0) {
      return; // Completamente limpio en blanco
    }

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
    if (dom.sheetClienteNombre) {
      dom.sheetClienteNombre.textContent = state.clienteNombre || '________________________________________';
    }
    if (dom.sheetClienteTelefono) {
      dom.sheetClienteTelefono.textContent = state.clienteTelefono || '____________________';
    }
    if (dom.sheetLugarEvento) {
      dom.sheetLugarEvento.textContent = state.lugarEvento || 'Salón o Domicilio por confirmar';
    }
    if (dom.sheetFechaEvento) {
      dom.sheetFechaEvento.textContent = state.fechaEvento ? formatDateForDisplay(state.fechaEvento) : 'Fecha por confirmar';
    }
    if (dom.sheetSignCliente) {
      dom.sheetSignCliente.textContent = state.clienteNombre || 'Nombre y Firma del Cliente';
    }

    // Festejado y Temática
    if (dom.sheetFestejadoInfo) {
      if (state.festejado || state.edadFestejado || state.tipoFestejo) {
        const fest = state.festejado || 'Festejado/a';
        const edad = state.edadFestejado ? ` (${state.edadFestejado})` : '';
        const tipo = state.tipoFestejo ? ` · ${state.tipoFestejo}` : '';
        dom.sheetFestejadoInfo.textContent = `${fest}${edad}${tipo}`;
      } else {
        dom.sheetFestejadoInfo.textContent = 'Festejado/a: ____________________ · Celebración por definir';
      }
    }
    if (dom.sheetTematicaInfo) {
      if (state.tematica || state.coloresGlobos || state.tipoLetrero) {
        dom.sheetTematicaInfo.textContent = `Temática: ${state.tematica || 'Por definir'} | Paleta: ${state.coloresGlobos || 'Por definir'} | Letrero: ${state.tipoLetrero || 'Por definir'}`;
      } else {
        dom.sheetTematicaInfo.textContent = 'Temática: ____________________ | Paleta de Colores: ____________________ | Letrero: ____________________';
      }
    }
    if (dom.sheetHorariosInfo) {
      if (state.horaMontaje || state.horaEvento || state.horaDesmontaje) {
        dom.sheetHorariosInfo.textContent = `Montaje: ${state.horaMontaje || 'Por confirmar'} | Evento: ${state.horaEvento || 'Por confirmar'} | Desmontaje: ${state.horaDesmontaje || 'Por confirmar'}`;
      } else {
        dom.sheetHorariosInfo.textContent = 'Montaje: ____________________ | Evento: ____________________ | Desmontaje: ____________________';
      }
    }

    if (dom.sheetBankInfo) {
      dom.sheetBankInfo.textContent = state.notasBancarias;
    }

    // Tabla de la Hoja (100% en blanco cuando no hay items)
    if (dom.sheetTableBody) {
      dom.sheetTableBody.innerHTML = '';
      if (Array.isArray(state.items) && state.items.length > 0) {
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
        state.folio = generateFolio(true, state.folio);
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

    // Manejador central para Limpiar Contrato a documento en blanco de cero
    const handleLimpiarContrato = (e) => {
      if (e) e.preventDefault();
      limpiarContratoCompleto(false, true);
    };

    if (dom.btnClearContract) dom.btnClearContract.addEventListener('click', handleLimpiarContrato);
    if (dom.btnSidebarClearContract) dom.btnSidebarClearContract.addEventListener('click', handleLimpiarContrato);
    if (dom.btnClearItemsSection) dom.btnClearItemsSection.addEventListener('click', handleLimpiarContrato);
    if (dom.btnMobileClear) dom.btnMobileClear.addEventListener('click', handleLimpiarContrato);

    // Navegación móvil por pestañas y barra flotante contextual
    if (dom.tabBtnForm) dom.tabBtnForm.addEventListener('click', () => switchMobileView('form'));
    if (dom.tabBtnSheet) dom.tabBtnSheet.addEventListener('click', () => switchMobileView('sheet'));
    if (dom.btnScrollToForm) dom.btnScrollToForm.addEventListener('click', () => switchMobileView('form'));
    if (dom.btnScrollToSheet) dom.btnScrollToSheet.addEventListener('click', () => switchMobileView('sheet'));
    if (dom.btnMobilePdf) dom.btnMobilePdf.addEventListener('click', () => triggerPdfExport());
    if (dom.btnMobileWhatsApp) dom.btnMobileWhatsApp.addEventListener('click', () => enviarPorWhatsApp());
    if (dom.btnToggleMobileView) {
      dom.btnToggleMobileView.addEventListener('click', (e) => {
        if (e) e.preventDefault();
        const container = dom.workspaceContainer || document.getElementById('workspaceContainer');
        const isForm = container && container.classList.contains('tab-form-active');
        switchMobileView(isForm ? 'sheet' : 'form');
      });
    }

    // Botón Reset / Nuevo Folio
    if (dom.btnReset) {
      dom.btnReset.addEventListener('click', () => {
        limpiarContratoCompleto(true, true);
      });
    }
  }

  // =========================================================================
  // EXPORTACIÓN A PDF Y WHATSAPP
  // =========================================================================
  function triggerPdfExport() {
    const sheetTarget = dom.contractSheet || document.getElementById('contractSheet');
    if (!sheetTarget) {
      alert('No se encontró la hoja de contrato.');
      return;
    }

    // Activar clase para forzar dimensiones Letter imprenta aunque se genere desde móvil
    document.body.classList.add('pdf-exporting');

    const btn = dom.btnDownloadPdf;
    const mBtn = dom.btnMobilePdf;
    const originalHtml = btn ? btn.innerHTML : '';
    const originalMHtml = mBtn ? mBtn.innerHTML : '';

    if (btn) {
      btn.innerHTML = '<i class="bi bi-hourglass-split"></i> Generando PDF...';
      btn.disabled = true;
      btn.style.opacity = '0.75';
    }
    if (mBtn) {
      mBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> <span class="m-btn-text">Generando...</span>';
      mBtn.disabled = true;
      mBtn.style.opacity = '0.75';
    }

    const rawClient = (state.clienteNombre || '').trim();
    const sanitizedClient = rawClient.replace(/[\\/:*?"<>|]/g, '').trim();
    const filename = sanitizedClient ? `Contrato - ${sanitizedClient}.pdf` : 'Contrato.pdf';

    const originalDocTitle = document.title;
    document.title = sanitizedClient ? `Contrato - ${sanitizedClient}` : 'Contrato';

    // Si tenemos el Data URI del logo, lo inyectamos directamente para evitar que el canvas se considere "tainted" por file:///
    if (window.NANCY_LOGO_DATA_URI) {
      const emblem = document.querySelector('.sheet-emblem-img');
      if (emblem) emblem.src = window.NANCY_LOGO_DATA_URI;
    }

    // Función para restaurar botón y quitar modo exportación
    const restoreBtn = () => {
      document.body.classList.remove('pdf-exporting');
      document.title = originalDocTitle;
      if (btn) {
        btn.innerHTML = originalHtml;
        btn.disabled = false;
        btn.style.opacity = '1';
      }
      if (mBtn) {
        mBtn.innerHTML = originalMHtml;
        mBtn.disabled = false;
        mBtn.style.opacity = '1';
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
        const worker = window.html2pdf().set(opt).from(sheetTarget);

        // Intentar guardar con temporizador de seguridad (fallback a impresión tras 4.5 segundos si el navegador bloquea blobs en file:///)
        let finished = false;

        const downloadTimer = setTimeout(() => {
          if (!finished) {
            finished = true;
            console.warn('html2pdf tardó demasiado o fue bloqueado por el navegador. Activando diálogo nativo...');
            restoreBtn();
            window.print();
          }
        }, 4800);

        worker.outputPdf('blob').then(async (blob) => {
          if (!finished) {
            finished = true;
            clearTimeout(downloadTimer);
            restoreBtn();

            currentPdfBlob = blob;
            currentPdfFilename = filename;
            currentPdfFile = new File([blob], filename, { type: 'application/pdf' });
            if (currentPdfUrl) URL.revokeObjectURL(currentPdfUrl);
            currentPdfUrl = URL.createObjectURL(blob);

            // 1. Desplegar siempre el modal interactivo de entrega y guardado directo en móviles y escritorio
            openPdfDeliveryModal(currentPdfUrl, currentPdfFilename, currentPdfFile);

            // 2. En computadoras de escritorio (PC/Mac), disparar también la descarga automática directa a Descargas
            const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth <= 768;
            if (!isMobile) {
              const a = document.createElement('a');
              a.style.display = 'none';
              a.href = currentPdfUrl;
              a.download = currentPdfFilename;
              document.body.appendChild(a);
              a.click();
              setTimeout(() => { try { a.remove(); } catch(e){} }, 3000);
              showToast('¡Contrato descargado exitosamente en tu carpeta de Descargas!', 'success');
            } else {
              showToast('¡Contrato listo! Toca "Guardar en Archivos / Files".', 'success');
            }
          }
        }).catch(err => {
          if (!finished) {
            finished = true;
            clearTimeout(downloadTimer);
            console.warn('html2pdf outputPdf error, usando diálogo de impresión:', err);
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

  // =========================================================================
  // CONTROLADOR DEL MODAL DE ENTREGA Y GUARDADO DE PDF (SOLUCIÓN MÓVIL)
  // =========================================================================
  let currentPdfBlob = null;
  let currentPdfFile = null;
  let currentPdfFilename = 'Contrato.pdf';
  let currentPdfUrl = null;

  function openPdfDeliveryModal(blobUrl, filename, pdfFile) {
    const modal = document.getElementById('pdfDeliveryModal');
    const filenameEl = document.getElementById('pdfModalFilename');
    const btnOpen = document.getElementById('btnDeliveryOpenPdf');
    const btnSave = document.getElementById('btnDeliverySaveFiles');
    const btnWhatsApp = document.getElementById('btnDeliveryWhatsApp');
    const btnClose = document.getElementById('btnDeliveryClose');

    if (!modal) return;

    if (filenameEl) {
      filenameEl.innerHTML = `<i class="bi bi-file-earmark-pdf-fill"></i> ${filename}`;
    }

    if (btnOpen) {
      btnOpen.href = blobUrl;
      btnOpen.download = filename;
    }

    if (btnSave) {
      btnSave.onclick = async (e) => {
        e.preventDefault();
        // Al ejecutarse dentro del evento click del usuario, el navegador móvil respeta el user activation
        if (pdfFile && navigator.canShare && navigator.canShare({ files: [pdfFile] })) {
          try {
            await navigator.share({
              files: [pdfFile],
              title: filename,
              text: `Contrato Oficial Nancy Eventos: ${state.clienteNombre || 'Cliente'}`
            });
            showToast('¡Guardado en Archivos / Files exitosamente!', 'success');
            return;
          } catch (err) {
            if (err && err.name === 'AbortError') return;
            console.warn('Share error, procediendo a descarga directa:', err);
          }
        }

        // Descarga directa por enlace de respaldo
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = blobUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => { try { a.remove(); } catch(e){} }, 2000);
        showToast('Descarga iniciada. Revisa tu carpeta de Descargas.', 'info');
      };
    }

    if (btnWhatsApp) {
      btnWhatsApp.onclick = (e) => {
        e.preventDefault();
        enviarPorWhatsApp();
      };
    }

    if (btnClose) {
      btnClose.onclick = (e) => {
        e.preventDefault();
        closePdfDeliveryModal();
      };
    }

    modal.onclick = (e) => {
      if (e.target === modal) closePdfDeliveryModal();
    };

    modal.style.display = 'flex';
  }

  function closePdfDeliveryModal() {
    const modal = document.getElementById('pdfDeliveryModal');
    if (modal) modal.style.display = 'none';
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

    showToast('Abriendo WhatsApp con el contrato...', 'info');

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth <= 768;
    if (isMobile) {
      window.location.href = targetUrl;
    } else {
      const win = window.open(targetUrl, '_blank');
      if (!win || win.closed || typeof win.closed === 'undefined') {
        window.location.href = targetUrl;
      }
    }
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
    // Requerimiento explícito: La app debe iniciar SIEMPRE con documento en blanco de cero.
    // Eliminamos cualquier borrador residual para garantizar que Nancy empiece siempre en blanco.
    try {
      localStorage.removeItem('nancy_contrato_draft');
    } catch (e) {}

    // Garantizar que la serie de folio inicie en la numeración oficial (00691 y suba)
    const folioDigits = String(state.folio || '').match(/\d{3,6}/);
    const currentFolioNum = folioDigits ? parseInt(folioDigits[0], 10) : 0;
    if (currentFolioNum < FOLIO_START_NUM) {
      state.folio = generateFolio(false, state.folio);
    } else {
      setFolioNumber(currentFolioNum);
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
  // CONTROLADOR DE SEGURIDAD Y ACCESO (USUARIO & CONTRASEÑA OFICIAL)
  // =========================================================================
  const MASTER_USER = 'admin';
  const MASTER_PASS = 'nancylopuede';
  const AUTH_STORAGE_KEY = 'nancy_eventos_auth_v2';

  function initSecurity() {
    const authOverlay = document.getElementById('authOverlay');
    const authForm = document.getElementById('authLoginForm');
    const inpUser = document.getElementById('authUsername');
    const inpPass = document.getElementById('authPassword');
    const btnTogglePass = document.getElementById('btnTogglePassword');
    const authStatusMsg = document.getElementById('authStatusMsg');
    const chkRemember = document.getElementById('chkRememberDevice');
    const btnLockApp = document.getElementById('btnLockApp');
    const authCard = authOverlay ? authOverlay.querySelector('.auth-card') : null;

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
        showToast('¡Bienvenida Nancy! Sesión recordada en este dispositivo.', 'success');
      }
    }

    function lockApp() {
      try {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      } catch (e) {}
      document.body.classList.remove('authenticated');
      if (inpPass) inpPass.value = '';
      if (authStatusMsg) {
        authStatusMsg.textContent = 'Sesión cerrada. Ingresa tus credenciales para volver a entrar.';
        authStatusMsg.classList.remove('success');
      }
      if (inpUser) inpUser.focus();
    }

    function validateCredentials() {
      const user = (inpUser ? inpUser.value : '').trim().toLowerCase();
      const pass = (inpPass ? inpPass.value : '').trim();

      const isUserValid = user === MASTER_USER;
      const isPassValid = pass === MASTER_PASS;

      if (isUserValid && isPassValid) {
        if (authStatusMsg) {
          authStatusMsg.textContent = '¡Credenciales correctas! Accediendo...';
          authStatusMsg.classList.add('success');
        }
        setTimeout(() => {
          unlockApp(false);
          if (inpPass) inpPass.value = '';
          if (authStatusMsg) authStatusMsg.textContent = '';
        }, 250);
      } else {
        if (authCard) {
          authCard.classList.remove('shake');
          void authCard.offsetWidth; // Forzar reflow para reiniciar animación
          authCard.classList.add('shake');
        }
        if (authStatusMsg) {
          authStatusMsg.textContent = 'Usuario o contraseña incorrectos. Intenta nuevamente.';
          authStatusMsg.classList.remove('success');
        }
        if (inpPass) {
          inpPass.value = '';
          inpPass.focus();
        }
      }
    }

    // Toggle de visibilidad de contraseña
    if (btnTogglePass && inpPass) {
      btnTogglePass.addEventListener('click', (e) => {
        e.preventDefault();
        const isPassword = inpPass.type === 'password';
        inpPass.type = isPassword ? 'text' : 'password';
        const icon = btnTogglePass.querySelector('i');
        if (icon) {
          icon.className = isPassword ? 'bi bi-eye-fill' : 'bi bi-eye-slash-fill';
        }
      });
    }

    // Envío del formulario
    if (authForm) {
      authForm.addEventListener('submit', (e) => {
        e.preventDefault();
        validateCredentials();
      });
    }

    // Botón de Bloqueo en la barra superior
    if (btnLockApp) {
      btnLockApp.addEventListener('click', () => {
        if (confirm('¿Deseas bloquear el acceso a los contratos en este dispositivo?')) {
          lockApp();
        }
      });
    }

    // 1. Verificar si viene por Enlace Mágico / Parámetros URL (?u=admin&p=nancylopuede)
    const urlParams = new URLSearchParams(window.location.search);
    const qUser = (urlParams.get('u') || urlParams.get('user') || '').trim().toLowerCase();
    const qPass = (urlParams.get('p') || urlParams.get('pass') || urlParams.get('password') || '').trim();

    const isMagicUserPass = (qUser === MASTER_USER && qPass === MASTER_PASS) || (urlParams.get('key') === MASTER_PASS);

    if (isMagicUserPass) {
      // Limpiar parámetros de la barra de direcciones
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
    try { limpiarContratoCompleto(false, false); } catch (e) { console.error('Nancy Contratos: Error en limpiar inicial:', e); }
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
