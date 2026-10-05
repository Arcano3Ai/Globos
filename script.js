/* ==========================================================================
   LUXURY BALLOON & EVENT AGENCY PLATFORM — INTERACTIVE DEMO SCRIPTS
   "Creamos momentos que se quedan contigo"
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive modules
  initThemeSwitcher();
  initHeaderScroll();
  initMobileMenu();
  initHeroCanvas();
  initHeroParallax();
  initAudioPlayer();
  initVideoModal();
  initBeforeAfterSlider();
  initPortfolioFilter();
  initLightboxModal();
  initInteractiveConfigurator();
  initNancyAIStudio();
  initQuoteFormWhatsApp();
  initScrollAnimations();
  initCollapsibleSections();
  initFaqAccordion();
});

/* --------------------------------------------------------------------------
   -1. Live Color Theme Switcher for Prospective Buyers
   -------------------------------------------------------------------------- */
function initThemeSwitcher() {
  const themeBtns = document.querySelectorAll('.theme-switcher-btn');

  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      themeBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');

      const theme = btn.getAttribute('data-theme');
      document.body.classList.remove('theme-royal-purple', 'theme-rose-champagne');

      if (theme === 'royal-purple') {
        document.body.classList.add('theme-royal-purple');
      } else if (theme === 'rose-champagne') {
        document.body.classList.add('theme-rose-champagne');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   1. Header Scroll Effect
   -------------------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* --------------------------------------------------------------------------
   2. Mobile Menu Toggle
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (toggle && navMenu) {
    // Inject mobile backdrop overlay if not present
    let backdrop = document.querySelector('.nav-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'nav-backdrop';
      document.body.appendChild(backdrop);
    }

    function closeMenu() {
      navMenu.classList.remove('active');
      document.body.classList.remove('menu-open');
      const icon = toggle.querySelector('i');
      if (icon) {
        icon.classList.remove('bi-x');
        icon.classList.add('bi-list');
      }
    }

    function openMenu() {
      navMenu.classList.add('active');
      document.body.classList.add('menu-open');
      const icon = toggle.querySelector('i');
      if (icon) {
        icon.classList.remove('bi-list');
        icon.classList.add('bi-x');
      }
    }

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (navMenu.classList.contains('active')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    backdrop.addEventListener('click', () => {
      closeMenu();
    });

    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        closeMenu();
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            const headerHeight = document.querySelector('.header')?.offsetHeight || 70;
            const topPos = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            window.scrollTo({
              top: topPos,
              behavior: 'smooth'
            });
          }
        }
      });
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !toggle.contains(e.target)) {
        closeMenu();
      }
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMenu();
      }
    });
  }
}

/* --------------------------------------------------------------------------
   3. Ambient Music Player Toggle (Electric Pulse)
   -------------------------------------------------------------------------- */
function initAudioPlayer() {
  const audioBtn = document.getElementById('audioToggleBtn');
  const audio = document.getElementById('ambientAudio');

  if (!audioBtn || !audio) return;

  let isPlaying = false;
  try {
    audio.volume = 0.55;
  } catch (e) {
    // Ignore if not supported yet
  }

  audioBtn.addEventListener('click', () => {
    if (!isPlaying) {
      audio.play().then(() => {
        isPlaying = true;
        audioBtn.classList.add('playing');
        const label = audioBtn.querySelector('.audio-label');
        if (label) label.textContent = 'PAUSAR MÚSICA';
        audioBtn.setAttribute('title', 'Pausar música ambiental (Electric Pulse)');
      }).catch(err => {
        console.log('Audio playback prevented by browser policy:', err);
      });
    } else {
      audio.pause();
      isPlaying = false;
      audioBtn.classList.remove('playing');
      const label = audioBtn.querySelector('.audio-label');
      if (label) label.textContent = 'MÚSICA';
      audioBtn.setAttribute('title', 'Reproducir música ambiental (Electric Pulse)');
    }
  });
}

/* --------------------------------------------------------------------------
   4. Video Lightbox Modal with Close Functionality (X / Backdrop / ESC)
   -------------------------------------------------------------------------- */
function initVideoModal() {
  const modal = document.getElementById('videoModal');
  const backdrop = document.getElementById('videoModalBackdrop');
  const closeBtn = document.getElementById('closeVideoModalBtn');
  const videoPlayer = document.getElementById('modalVideoPlayer');
  
  const openShowreelBtn = document.getElementById('openVideoShowreelContainer');
  const openHeroVideoBtn = document.getElementById('openHeroVideoBtn');
  const bgVideo = openShowreelBtn ? openShowreelBtn.querySelector('video') : null;

  if (!modal || !videoPlayer) return;

  function openVideo() {
    modal.classList.add('active');
    if (bgVideo) bgVideo.pause();
    videoPlayer.currentTime = 0;
    videoPlayer.play().catch(err => console.log('Autoplay prevented:', err));
  }

  function closeVideo() {
    modal.classList.remove('active');
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
    if (bgVideo) bgVideo.play().catch(() => {});
  }

  if (openShowreelBtn) openShowreelBtn.addEventListener('click', openVideo);
  if (openHeroVideoBtn) openHeroVideoBtn.addEventListener('click', openVideo);

  if (closeBtn) closeBtn.addEventListener('click', closeVideo);
  if (backdrop) backdrop.addEventListener('click', closeVideo);

  // Close on Escape Key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeVideo();
    }
  });
}

/* --------------------------------------------------------------------------
   5. Floating Festive 3D Luxury Balloons Hero Canvas ("Queremos Fiesta")
   -------------------------------------------------------------------------- */
function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let balloons = [];

  function resize() {
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  // Vibrant Party Balloon Palette with realistic 3D highlight & knot colors
  const BALLOON_PALETTES = [
    { base: '230, 0, 103', light: '255, 110, 180', shadow: '150, 0, 65', knot: '#990042' },     // Fiesta Fuchsia
    { base: '225, 175, 45', light: '255, 240, 150', shadow: '140, 100, 15', knot: '#8C640A' },    // Luxury Gold
    { base: '138, 43, 226', light: '210, 155, 255', shadow: '80, 15, 140', knot: '#550E96' },    // Electric Violet
    { base: '0, 215, 190', light: '170, 255, 245', shadow: '0, 125, 110', knot: '#007A6B' },     // Neon Turquoise
    { base: '240, 120, 145', light: '255, 210, 220', shadow: '160, 50, 75', knot: '#A6324D' },   // Rose Gold
    { base: '242, 244, 250', light: '255, 255, 255', shadow: '185, 190, 205', knot: '#B5BAC9' }  // Glossy Pearl White
  ];

  class FestiveBalloon {
    constructor(randomY = false) {
      this.reset(randomY);
    }

    reset(randomY = false) {
      this.x = Math.random() * width;
      this.y = randomY ? Math.random() * height : height + Math.random() * 150 + 40;
      this.radius = Math.random() * 20 + 15; // 15px to 35px
      this.speedY = Math.random() * 0.75 + 0.55; // 0.55 to 1.3
      this.wobbleSpeed = Math.random() * 0.025 + 0.015;
      this.wobblePhase = Math.random() * Math.PI * 2;
      this.wobbleAmp = Math.random() * 0.6 + 0.3;
      this.opacity = Math.random() * 0.18 + 0.82; // 0.82 to 1.0 (Crisp & vivid party balloons!)
      this.palette = BALLOON_PALETTES[Math.floor(Math.random() * BALLOON_PALETTES.length)];
      this.stringLength = this.radius * (Math.random() * 0.5 + 1.3);
    }

    update() {
      this.y -= this.speedY;
      this.wobblePhase += this.wobbleSpeed;
      this.x += Math.sin(this.wobblePhase) * this.wobbleAmp;

      if (this.y < -this.radius * 2 - this.stringLength) {
        this.reset(false);
      }
    }

    draw() {
      const rx = this.radius;
      const ry = this.radius * 1.24; // Classic egg / oval balloon geometry
      const angle = Math.sin(this.wobblePhase) * 0.08;

      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(angle);

      // 1. Hanging undulating ribbon / string
      ctx.beginPath();
      ctx.moveTo(0, ry + 4);
      const sLen = this.stringLength;
      ctx.bezierCurveTo(
        Math.sin(this.wobblePhase * 1.4) * 8, ry + sLen * 0.35,
        -Math.sin(this.wobblePhase * 1.4) * 8, ry + sLen * 0.7,
        Math.sin(this.wobblePhase) * 5, ry + sLen
      );
      ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity * 0.6})`;
      ctx.lineWidth = 1.3;
      ctx.stroke();

      // 2. Balloon knot (nudo en la base)
      ctx.beginPath();
      ctx.moveTo(-rx * 0.14, ry);
      ctx.lineTo(rx * 0.14, ry);
      ctx.lineTo(rx * 0.24, ry + 5);
      ctx.lineTo(-rx * 0.24, ry + 5);
      ctx.closePath();
      ctx.fillStyle = this.palette.knot;
      ctx.fill();

      // 3. Balloon Body (Egg/Teardrop shape)
      ctx.beginPath();
      ctx.moveTo(0, -ry);
      ctx.bezierCurveTo(rx * 1.15, -ry, rx * 1.25, ry * 0.5, 0, ry);
      ctx.bezierCurveTo(-rx * 1.25, ry * 0.5, -rx * 1.15, -ry, 0, -ry);
      ctx.closePath();

      // 3D Spherical Volume Gradient
      const grad = ctx.createRadialGradient(
        -rx * 0.32, -ry * 0.35, rx * 0.1,
        0, 0, ry
      );
      grad.addColorStop(0, `rgba(${this.palette.light}, ${this.opacity})`);
      grad.addColorStop(0.55, `rgba(${this.palette.base}, ${this.opacity})`);
      grad.addColorStop(1, `rgba(${this.palette.shadow}, ${this.opacity})`);

      ctx.fillStyle = grad;
      ctx.fill();

      // 4. Metallic Specular Gloss Reflection (Curved reflection arc)
      ctx.beginPath();
      ctx.ellipse(-rx * 0.32, -ry * 0.38, rx * 0.32, ry * 0.18, -Math.PI / 4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.68})`;
      ctx.fill();

      // Secondary micro-glint
      ctx.beginPath();
      ctx.arc(-rx * 0.15, -ry * 0.62, rx * 0.08, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.85})`;
      ctx.fill();

      ctx.restore();
    }
  }

  // Create adaptive party balloons: 20 on mobile to save CPU/battery, 42 on desktop
  const isMobile = window.innerWidth < 640;
  const balloonCount = isMobile ? 20 : 42;
  for (let i = 0; i < balloonCount; i++) {
    balloons.push(new FestiveBalloon(true));
  }

  // Energy & Battery Saver: Pause animation when offscreen or tab hidden (iOS & Android optimization)
  let isCanvasVisible = true;
  let isDocVisible = !document.hidden;
  let animationFrameId = null;

  function animate() {
    if (!isCanvasVisible || !isDocVisible) {
      animationFrameId = null;
      return;
    }
    ctx.clearRect(0, 0, width, height);
    balloons.forEach(b => {
      b.update();
      b.draw();
    });
    animationFrameId = requestAnimationFrame(animate);
  }

  function startAnimation() {
    if (!animationFrameId && isCanvasVisible && isDocVisible) {
      animationFrameId = requestAnimationFrame(animate);
    }
  }

  // IntersectionObserver to stop rendering when scrolled past hero
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isCanvasVisible = entry.isIntersecting;
        if (isCanvasVisible) {
          startAnimation();
        }
      });
    }, { threshold: 0.05 });
    observer.observe(canvas);
  }

  // Page visibility API listener
  document.addEventListener('visibilitychange', () => {
    isDocVisible = !document.hidden;
    if (isDocVisible) {
      startAnimation();
    }
  });

  startAnimation();
}

/* --------------------------------------------------------------------------
   5.1. Hero Background Parallax Scroll Effect
   -------------------------------------------------------------------------- */
function initHeroParallax() {
  const hero = document.getElementById('hero');
  const heroBg = document.querySelector('.hero-bg-img');
  if (!hero || !heroBg) return;

  let ticking = false;

  function updateParallax() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const heroHeight = hero.offsetHeight;

    if (scrollY <= heroHeight + 80) {
      // Smooth luxury depth parallax translation
      const translateY = scrollY * 0.36;
      heroBg.style.transform = `translate3d(0, ${translateY}px, 0)`;
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });

  updateParallax();
}

/* --------------------------------------------------------------------------
   6. Interactive Before / After Draggable Comparison Slider (Pixel-Perfect)
   -------------------------------------------------------------------------- */
function initBeforeAfterSlider() {
  const container = document.getElementById('baContainer');
  const beforeWrap = document.getElementById('baBeforeWrap');
  const beforeImg = document.getElementById('baBeforeImg');
  const handle = document.getElementById('baHandle');

  if (!container || !beforeWrap || !handle) return;

  let isDragging = false;

  // Responsive width adjustment for inner before image
  function syncBeforeImgWidth() {
    if (beforeImg && container) {
      beforeImg.style.width = `${container.offsetWidth}px`;
    }
  }

  window.addEventListener('resize', syncBeforeImgWidth);
  window.addEventListener('load', syncBeforeImgWidth);
  setTimeout(syncBeforeImgWidth, 100);
  setTimeout(syncBeforeImgWidth, 500);

  function updateSliderPosition(clientX) {
    const rect = container.getBoundingClientRect();
    let x = clientX - rect.left;
    if (x < 0) x = 0;
    if (x > rect.width) x = rect.width;

    const percentage = (x / rect.width) * 100;
    beforeWrap.style.width = `${percentage}%`;
    handle.style.left = `${percentage}%`;
  }

  // Mouse events
  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    updateSliderPosition(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updateSliderPosition(e.clientX);
  });

  // Touch events for Mobile
  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    updateSliderPosition(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    updateSliderPosition(e.touches[0].clientX);
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   7. Portfolio Filtering & Lightbox Modal
   -------------------------------------------------------------------------- */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      items.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCat === filterValue) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.9)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

function initLightboxModal() {
  const modal = document.getElementById('lightboxModal');
  const modalImg = document.getElementById('lightboxImg');
  const modalTitle = document.getElementById('lightboxTitle');
  const modalCat = document.getElementById('lightboxCategory');
  const closeBtn = document.getElementById('lightboxClose');
  const modalCta = document.getElementById('lightboxCta');

  if (!modal) return;

  document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', () => {
      const imgEl = item.querySelector('.portfolio-img');
      if (!imgEl) return;
      const img = imgEl.src;
      const title = item.getAttribute('data-title') || imgEl.alt || 'Montaje Nancy García';
      const cat = item.getAttribute('data-category-name') || 'GALERÍA DE FOTOS';

      modalImg.src = img;
      modalTitle.textContent = title;
      modalCat.textContent = cat;

      modal.classList.add('active');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  if (modalCta) {
    modalCta.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }
}

/* --------------------------------------------------------------------------
   8. Interactive Event Visual Configurator
   -------------------------------------------------------------------------- */
function initInteractiveConfigurator() {
  const configOpts = document.querySelectorAll('.config-opt:not(.theme-switcher-btn)');
  const summaryBtn = document.getElementById('configBuildBtn');

  const selectedState = {
    eventType: 'Cumpleaños / Infantil',
    palette: 'Champagne, Marfil, Sage & Oro Cromado (Sampetrino Luxury)',
    style: '🎈 División 01: Decoración · Globos · Detalles',
    budget: '$12,500 - $28,000 MXN (Montaje Completo & Ambientación)'
  };

  configOpts.forEach(opt => {
    opt.addEventListener('click', () => {
      const parentGroup = opt.closest('.config-step-group');
      if (!parentGroup) return;

      parentGroup.querySelectorAll('.config-opt').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');

      const groupType = parentGroup.getAttribute('data-group');
      const val = opt.getAttribute('data-value');
      selectedState[groupType] = val;
    });
  });

  if (summaryBtn) {
    summaryBtn.addEventListener('click', () => {
      // Direct WhatsApp redirect with configurator details
      const waText = 
`👑 *COTIZACIÓN INTEGRAL — NANCY GARCÍA EVENTOS* 👑
-----------------------------------------
🎯 *Tipo de Evento:* ${selectedState.eventType}
🎨 *Paleta Seleccionada:* ${selectedState.palette}
✨ *División / Servicio:* ${selectedState.style}
💰 *Rango de Inversión:* ${selectedState.budget}

Hola Nancy! Me interesa cotizar y agendar estos servicios con Nancy García Eventos para nuestro festejo en San Pedro Garza García / Monterrey.`;

      const encodedMsg = encodeURIComponent(waText);
      const waNumber = '528110626302';
      const waUrl = `https://wa.me/${waNumber}?text=${encodedMsg}`;
      window.open(waUrl, '_blank');
    });
  }
}

/* --------------------------------------------------------------------------
   9. Quote Form & Automated WhatsApp Message Builder
   -------------------------------------------------------------------------- */
function initQuoteFormWhatsApp() {
  const form = document.getElementById('quoteForm');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('qName').value.trim();
    const phone = document.getElementById('qPhone').value.trim();
    const eventType = document.getElementById('qEventType').value;
    const date = document.getElementById('qDate') ? document.getElementById('qDate').value : '';
    const location = document.getElementById('qLocation') ? document.getElementById('qLocation').value.trim() : '';
    const message = document.getElementById('qMessage').value.trim();

    if (!name || !phone) {
      alert('Por favor completa tu Nombre y Teléfono/WhatsApp para comunicarnos contigo.');
      return;
    }

    // Structured message template for Nancy García Eventos
    const waText = 
`💖 *SOLICITUD DE COTIZACIÓN — NANCY GARCÍA EVENTOS* 💖
-----------------------------------------
👤 *Nombre:* ${name}
📱 *WhatsApp del Cliente:* ${phone}
🎨 *División o Servicio:* ${eventType}
📅 *Fecha del Evento:* ${date || 'Por definir'}
📍 *Ubicación / Municipio:* ${location || 'No especificada'}

📝 *Detalles del Festejo:*
${message || 'Sin mensaje adicional.'}

-----------------------------------------
Enviado desde Nancy García Eventos Oficial`;

    const encodedMsg = encodeURIComponent(waText);
    const waNumber = '528110626302';
    const waUrl = `https://wa.me/${waNumber}?text=${encodedMsg}`;

    // Open WhatsApp in new tab
    window.open(waUrl, '_blank');
  });
}

/* --------------------------------------------------------------------------
   10. Scroll Reveal Animations (Intersection Observer)
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.glass-card, .exp-card, .division-card, .all-divisions-banner, .service-card, .process-step, .testi-card, .config-box, .form-box, .video-container').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
  });

  // Inject helper CSS class dynamically
  const style = document.createElement('style');
  style.textContent = `
    .animate-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
}

/* --------------------------------------------------------------------------
   11. Collapsible & Expandable Text System (Audio Requerimiento)
   -------------------------------------------------------------------------- */
function initCollapsibleSections() {
  const toggleBtns = document.querySelectorAll('.btn-toggle-expand');

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-target');
      if (!targetId) return;

      const targetContent = document.getElementById(targetId);
      if (!targetContent) return;

      const isExpanded = targetContent.classList.contains('expanded');
      const labelSpan = btn.querySelector('.toggle-text');

      if (isExpanded) {
        targetContent.classList.remove('expanded');
        btn.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
        if (labelSpan) {
          const defaultText = btn.getAttribute('data-default-text');
          labelSpan.textContent = defaultText || 'Ver detalles';
        }
      } else {
        if (!btn.getAttribute('data-default-text') && labelSpan) {
          btn.setAttribute('data-default-text', labelSpan.textContent);
        }
        targetContent.classList.add('expanded');
        btn.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
        if (labelSpan) {
          labelSpan.textContent = 'Ocultar detalles';
        }
      }
    });
  });
}

/* --------------------------------------------------------------------------
   12. Interactive FAQ Accordion
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close other open FAQ items to keep page clean
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const btn = otherItem.querySelector('.faq-question');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        }
      });

      if (!isActive) {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      } else {
        item.classList.remove('active');
        questionBtn.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   13. NANCY AI EVENT STYLIST & ESTIMATOR ENGINE
   Motor de Inteligencia Artificial & Planificador Multiplataforma
   Optimizado para iOS, Android y Desktop con Haptic Feedback y Catálogo Real
   -------------------------------------------------------------------------- */
function initNancyAIStudio() {
  const aiSection = document.getElementById('nancy-ai');
  if (!aiSection) return;

  // Touch Haptic Feedback Helper (Android & iOS WebKit Vibration API)
  function triggerHaptic(pattern = [12, 24]) {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch (e) {
        // Safe fallback if unsupported
      }
    }
  }

  // State Management
  const aiState = {
    eventType: 'infantil',
    eventLabel: 'Cumpleaños Infantil',
    zone: 'spgg',
    zoneLabel: 'San Pedro Garza García',
    flete: 250,
    guests: 'medio',
    guestsLabel: '25 - 50 personas',
    services: {
      globos: true,
      yesitos: true,
      nieves: false,
      mobiliario: false,
      neon: false
    },
    themePrompt: ''
  };

  // DOM Elements
  const typeChips = aiSection.querySelectorAll('#aiEventTypeGroup .ai-chip');
  const zoneSelect = document.getElementById('aiZoneSelect');
  const guestsChips = aiSection.querySelectorAll('#aiGuestsGroup .ai-chip');
  const quickThemeBtns = aiSection.querySelectorAll('.ai-quick-btn');
  const themeInput = document.getElementById('aiThemePrompt');
  const generateBtn = document.getElementById('aiGenerateBtn');
  const btnText = document.getElementById('aiBtnText');
  const spinner = document.getElementById('aiSpinner');
  const sendWhatsAppBtn = document.getElementById('aiSendWhatsAppBtn');

  // Service Checkboxes
  const srvGlobos = document.getElementById('aiSrvGlobos');
  const srvYesitos = document.getElementById('aiSrvYesitos');
  const srvNieves = document.getElementById('aiSrvNieves');
  const srvMobiliario = document.getElementById('aiSrvMobiliario');
  const srvNeon = document.getElementById('aiSrvNeon');

  // Result Blueprint Elements
  const resTitle = document.getElementById('aiResultTitle');
  const resSubtitle = document.getElementById('aiResultSubtitle');
  const resPaletteName = document.getElementById('aiPaletteName');
  const resSwatchesRow = document.getElementById('aiSwatchesRow');
  const resSpecsList = document.getElementById('aiSpecsList');
  const resPriceEstimate = document.getElementById('aiPriceEstimate');
  const resPriceNote = document.getElementById('aiPriceNote');
  const resDiscountTag = document.getElementById('aiDiscountTag');
  const resBaseCost = document.getElementById('aiBaseCost');
  const resFleteCost = document.getElementById('aiFleteCost');
  const resDepositCost = document.getElementById('aiDepositCost');

  // 1. Event Type Chip Selection
  typeChips.forEach(chip => {
    chip.addEventListener('click', () => {
      triggerHaptic(15);
      typeChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      aiState.eventType = chip.getAttribute('data-type');
      aiState.eventLabel = chip.getAttribute('data-label');
      updatePalettePreviewLive();
    });
  });

  // 2. Zone Selection
  if (zoneSelect) {
    zoneSelect.addEventListener('change', () => {
      triggerHaptic(10);
      const selectedOption = zoneSelect.options[zoneSelect.selectedIndex];
      aiState.zone = zoneSelect.value;
      aiState.zoneLabel = selectedOption.text.split('(')[0].trim();
      aiState.flete = parseInt(selectedOption.getAttribute('data-flete') || '250', 10);
      computeQuote(false);
    });
  }

  // 3. Guests Chip Selection
  guestsChips.forEach(chip => {
    chip.addEventListener('click', () => {
      triggerHaptic(15);
      guestsChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      aiState.guests = chip.getAttribute('data-guests');
      aiState.guestsLabel = chip.getAttribute('data-label');
      computeQuote(false);
    });
  });

  // 4. Checklist Checkboxes
  const syncCheckPill = (checkbox) => {
    if (!checkbox) return;
    const parentPill = checkbox.closest('.ai-check-pill');
    if (parentPill) {
      if (checkbox.checked) {
        parentPill.classList.add('active');
      } else {
        parentPill.classList.remove('active');
      }
    }
  };

  [srvGlobos, srvYesitos, srvNieves, srvMobiliario, srvNeon].forEach(cb => {
    if (!cb) return;
    cb.addEventListener('change', () => {
      triggerHaptic(12);
      syncCheckPill(cb);
      aiState.services.globos = srvGlobos?.checked || false;
      aiState.services.yesitos = srvYesitos?.checked || false;
      aiState.services.nieves = srvNieves?.checked || false;
      aiState.services.mobiliario = srvMobiliario?.checked || false;
      aiState.services.neon = srvNeon?.checked || false;
      computeQuote(false);
    });
  });

  // 5. Quick Theme Presets
  quickThemeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      triggerHaptic(15);
      const preset = btn.getAttribute('data-preset');
      if (themeInput) {
        themeInput.value = preset;
        aiState.themePrompt = preset;
      }
      updatePalettePreviewLive();
      computeQuote(true);
    });
  });

  if (themeInput) {
    themeInput.addEventListener('input', () => {
      aiState.themePrompt = themeInput.value.trim();
    });
  }

  // Color Palettes Catalog
  const PALETTES_CATALOG = {
    safari: {
      name: 'Safari Chic (Salvia, Oro Cromo & Marfil)',
      swatches: [
        { name: 'Salvia', hex: '#3A5A40' },
        { name: 'Oro Cromo', hex: '#D4AF37' },
        { name: 'Marfil Seda', hex: '#FFFDD0' },
        { name: 'Blanco Nieve', hex: '#FFFFFF' }
      ]
    },
    neon: {
      name: 'Neón Glow Party (Fucsia, Morado & Cromo)',
      swatches: [
        { name: 'Neón Fucsia', hex: '#FF007F' },
        { name: 'Violeta Neón', hex: '#9B5DE5' },
        { name: 'Turquesa Glow', hex: '#00F5D4' },
        { name: 'Oro Metálico', hex: '#E1AF2D' }
      ]
    },
    pastel: {
      name: 'Pastel Dreamland (Rosa, Menta & Crema)',
      swatches: [
        { name: 'Rosa Pastel', hex: '#FFB7B2' },
        { name: 'Menta Suave', hex: '#B5EAD7' },
        { name: 'Crema Champán', hex: '#FFFFD1' },
        { name: 'Lila Claro', hex: '#E2D4F0' }
      ]
    },
    gala: {
      name: 'Sampetrino Luxury (Oro, Champagne & Marfil)',
      swatches: [
        { name: 'Oro Cromo', hex: '#D4AF37' },
        { name: 'Champagne', hex: '#F7E7CE' },
        { name: 'Marfil Seda', hex: '#FFFDD0' },
        { name: 'Blanco Perla', hex: '#FFFFFF' }
      ]
    },
    bautizo: {
      name: 'Pureza Celestial (Blanco, Oro Rosa & Salvia)',
      swatches: [
        { name: 'Blanco Seda', hex: '#FFFFFF' },
        { name: 'Oro Rosa', hex: '#B76E79' },
        { name: 'Crema Marfil', hex: '#FFFFF0' },
        { name: 'Salvia Suave', hex: '#A3B18A' }
      ]
    },
    dino: {
      name: 'Dino Chic Aventura (Verde Olivo, Marrón & Cromo)',
      swatches: [
        { name: 'Verde Olivo', hex: '#556B2F' },
        { name: 'Oro Cromo', hex: '#D4AF37' },
        { name: 'Arena Tostada', hex: '#D2B48C' },
        { name: 'Blanco Mate', hex: '#F8F9FA' }
      ]
    },
    corporativo: {
      name: 'Vanguardia Corporativa (Azul Índigo, Oro & Plata)',
      swatches: [
        { name: 'Azul Índigo', hex: '#1D3557' },
        { name: 'Oro Metálico', hex: '#D4AF37' },
        { name: 'Platino', hex: '#E0E1DD' },
        { name: 'Blanco Puro', hex: '#FFFFFF' }
      ]
    }
  };

  // Determine Palette by Type and Prompt Semantics
  function detectBestPalette() {
    const text = (aiState.themePrompt + ' ' + aiState.eventType).toLowerCase();
    if (text.includes('safari') || text.includes('salvia') || text.includes('selva')) return PALETTES_CATALOG.safari;
    if (text.includes('neón') || text.includes('neon') || text.includes('glow') || text.includes('xv')) return PALETTES_CATALOG.neon;
    if (text.includes('dino') || text.includes('dinosaurio')) return PALETTES_CATALOG.dino;
    if (text.includes('pastel') || text.includes('princesa') || text.includes('arcoíris') || text.includes('rainbow')) return PALETTES_CATALOG.pastel;
    if (text.includes('boda') || text.includes('civil') || text.includes('gala')) return PALETTES_CATALOG.gala;
    if (text.includes('bautizo') || text.includes('comunión') || text.includes('baby')) return PALETTES_CATALOG.bautizo;
    if (text.includes('corporativo') || text.includes('empresa') || text.includes('inauguración')) return PALETTES_CATALOG.corporativo;
    
    // Fallback based on event type
    if (aiState.eventType === 'xv') return PALETTES_CATALOG.neon;
    if (aiState.eventType === 'boda') return PALETTES_CATALOG.gala;
    if (aiState.eventType === 'bautizo' || aiState.eventType === 'babyshower') return PALETTES_CATALOG.bautizo;
    if (aiState.eventType === 'corporativo') return PALETTES_CATALOG.corporativo;
    return PALETTES_CATALOG.safari;
  }

  function renderSwatches(palette) {
    if (!resSwatchesRow || !palette) return;
    resSwatchesRow.innerHTML = '';
    palette.swatches.forEach(sw => {
      const div = document.createElement('div');
      div.className = 'ai-swatch';
      div.style.background = sw.hex;
      div.setAttribute('title', `${sw.name} (${sw.hex})`);
      div.innerHTML = `<span class="swatch-name">${sw.name}</span>`;
      resSwatchesRow.appendChild(div);
    });
    if (resPaletteName) {
      resPaletteName.textContent = palette.name;
    }
  }

  function updatePalettePreviewLive() {
    const palette = detectBestPalette();
    renderSwatches(palette);
  }

  // 6. Compute Comprehensive AI Package & Quote
  function computeQuote(animateVisual = true) {
    const palette = detectBestPalette();
    renderSwatches(palette);

    let title = '';
    let summary = '';
    let specs = [];
    let basePrice = 0;
    let savings = 0;

    const hasGlobos = aiState.services.globos;
    const hasYesitos = aiState.services.yesitos;
    const hasNieves = aiState.services.nieves;
    const hasMobiliario = aiState.services.mobiliario;
    const hasNeon = aiState.services.neon;

    // A. Ambos Globos y Yesitos (Combo Estrella)
    if (hasGlobos && hasYesitos) {
      title = 'Celebración Total VIP Nancy García';
      summary = `Propuesta integral curada por IA en tonalidades ${palette.name}. Fusiona escenografía monumental de globos de hasta 6 metros con zona de arte de caballetes y yesitos temáticos empacados para recuerdo.`;
      basePrice = 6400;
      savings = 950;
      specs = [
        'Arco orgánico desestructurado de 5.0 a 6.0 metros con tratamiento High-Shine para brillo y durabilidad.',
        'Mampara arqueada o circular de gala con vinil personalizado con el nombre del festejado(a).',
        'Set de 3 Cilindros blancos MDF de soporte para pastel y repostería.',
        'Zona de arte: 6 Caballetes dobles de madera (12 plazas simultáneas) + 12 banquitos barnizados + mandiles, pinceles, godetes y pinturas vinílicas lavables.',
        '40 Yesitos temáticos cerámicos empacados individualmente en celofán para regalo de los niños.',
        'Bouquet de globos con número gigante de foil metálico de helio para el/la cumpleañero(a).',
        'Letrero luminoso Neón LED ("Happy Birthday", "Let\'s Party" u "Oh Baby") incluido.'
      ];
    } 
    // B. Solo Yesitos & Caballetes
    else if (hasYesitos && !hasGlobos) {
      title = 'Fiesta Creativa Nancy García (Caballetes & Arte)';
      summary = `Experiencia infantil interactiva en colores ${palette.name}. Los pequeños pintan sus propias figuras cerámicas y lienzos guiados por estaciones de arte profesionales de madera.`;
      basePrice = 2450;
      savings = 450;
      specs = [
        '4 Estaciones de Caballete Infantil Doble Cara de madera (8 plazas simultáneas).',
        '8 Banquitos infantiles de madera barnizada y mandiles plásticos protectores.',
        'Dotación de pinturas vinílicas no tóxicas, pinceles de diversos calibres y godetes lavables.',
        '25 Yesitos temáticos para pintar según la temática del festejo, con bolsita individual.',
        'Montaje, supervisión inicial, desmontaje y limpieza completa de estaciones de arte.'
      ];
    }
    // C. Solo Globos
    else if (hasGlobos && !hasYesitos) {
      title = 'Escenografía Mágica (Backdrop & Globos)';
      summary = `Montaje escenográfico de alto impacto visual con paleta ${palette.name}. Ideal para mesa principal de pastel, área de fotos o entrada de salón.`;
      basePrice = 3800;
      savings = 600;
      specs = [
        'Arco orgánico desestructurado de 4.5 a 5.0 metros con globos de látex biodegradables calidad premium.',
        'Tratamiento High-Shine para brillo deslumbrante y máxima resistencia al calor de Monterrey.',
        'Mampara arqueada con vinil personalizado en tipografía caligráfica con nombre de gala.',
        'Set de 3 Cilindros de MDF para pastel y postres.',
        'Letrero luminoso Neón LED a elección con dimmer de intensidad.'
      ];
    }
    // D. Servicios a la Carta
    else {
      title = 'Experiencia a la Medida Nancy García';
      summary = `Configuración personalizada con servicios especializados en paleta ${palette.name}.`;
      basePrice = 1800;
      savings = 300;
      specs = [
        'Coordinación directa de logística y montaje con Nancy García.',
        'Materiales de alta durabilidad adaptados a locaciones en interior o exteriores en SPGG/Monterrey.'
      ];
    }

    // Add-on Barra de Nieves si está marcado
    if (hasNieves) {
      basePrice += 1600;
      specs.push('Barra de Nieve de Garrafa Estilo Jalisco: 50 porciones servidas en vaso con chamoy líquido y en polvo, más Tostitos preparados con elote desgranado.');
    }

    // Add-on Mobiliario si está marcado y no estaba incluido
    if (hasMobiliario && !hasGlobos) {
      basePrice += 650;
      specs.push('Renta de Set de 3 Cilindros MDF de repostería y mampara circular.');
    }

    // Add-on Neón si está marcado y no estaba incluido
    if (hasNeon && !hasGlobos) {
      basePrice += 350;
      specs.push('Renta de Letrero Neón LED con transformador de bajo consumo.');
    }

    // Adjust for guests dimension
    if (aiState.guests === 'grande') {
      basePrice += 800;
      specs.push('Ampliación de material y plazas infantiles para aforo de 50 a 90 personas.');
    } else if (aiState.guests === 'monumental') {
      basePrice += 1600;
      specs.push('Escala monumental para 100+ personas con soporte y personal de montaje extendido.');
    }

    const flete = aiState.flete;
    const total = basePrice + flete;
    const deposit = Math.round(total * 0.5);

    // Update DOM
    if (resTitle) resTitle.textContent = title;
    if (resSubtitle) resSubtitle.textContent = summary;

    if (resSpecsList) {
      resSpecsList.innerHTML = '';
      specs.forEach(s => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="bi bi-check-circle-fill"></i> ${s}`;
        resSpecsList.appendChild(li);
      });
    }

    if (resPriceEstimate) {
      resPriceEstimate.innerHTML = `$${total.toLocaleString('es-MX')} <span class="ai-price-currency">MXN</span>`;
    }
    if (resPriceNote) {
      resPriceNote.textContent = `*Incluye flete y logística de montaje en ${aiState.zoneLabel}`;
    }
    if (resDiscountTag) {
      resDiscountTag.textContent = savings > 0 ? `~$${savings.toLocaleString('es-MX')} MXN` : 'PRECIO PREFERENCIAL';
    }
    if (resBaseCost) {
      resBaseCost.textContent = `$${basePrice.toLocaleString('es-MX')} MXN`;
    }
    if (resFleteCost) {
      resFleteCost.textContent = `$${flete.toLocaleString('es-MX')} MXN (${aiState.zoneLabel})`;
    }
    if (resDepositCost) {
      resDepositCost.textContent = `$${deposit.toLocaleString('es-MX')} MXN (50%)`;
    }

    // WhatsApp Message Formatter
    if (sendWhatsAppBtn) {
      sendWhatsAppBtn.onclick = () => {
        triggerHaptic([20, 40, 20]);
        const themeText = aiState.themePrompt ? aiState.themePrompt : palette.name;
        const msg = 
`👑 *PROPUESTA NANCY AI · COTIZACIÓN PERSONALIZADA* 👑
------------------------------------------------
🎯 *Tipo de Festejo:* ${aiState.eventLabel}
📍 *Municipio / Zona:* ${aiState.zoneLabel} (Flete: $${flete} MXN)
👥 *Dimensión Invitados:* ${aiState.guestsLabel}
🎨 *Temática / Mood:* ${themeText}
💎 *Paleta Cromática Sugerida:* ${palette.name}
📦 *Paquete / Configuración:* ${title}
💰 *Inversión Total Estimada:* $${total.toLocaleString('es-MX')} MXN
💵 *Anticipo Sugerido (50%):* $${deposit.toLocaleString('es-MX')} MXN

✨ *Servicios Incluidos:*
${specs.slice(0, 4).map(s => '• ' + s).join('\n')}

Hola Nancy García! Generé esta cotización personalizada con su Asistente de Inteligencia Artificial en su web oficial y deseo apartar la fecha para mi evento.`;

        const waUrl = `https://wa.me/528110626302?text=${encodeURIComponent(msg)}`;
        window.open(waUrl, '_blank');
      };
    }
  }

  // 7. Generate Button Click with AI Simulation Animation
  if (generateBtn) {
    generateBtn.addEventListener('click', () => {
      triggerHaptic([20, 30, 20]);
      if (spinner && btnText) {
        spinner.style.display = 'inline-block';
        btnText.textContent = 'PROCESANDO CON NANCY AI...';
        generateBtn.disabled = true;
      }

      setTimeout(() => {
        computeQuote(true);
        if (spinner && btnText) {
          spinner.style.display = 'none';
          btnText.textContent = 'GENERAR NUEVA PROPUESTA CON IA';
          generateBtn.disabled = false;
        }

        // Smooth scroll into result on mobile screens
        if (window.innerWidth < 992) {
          const resultCard = document.getElementById('aiResultCard');
          if (resultCard) {
            resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }
      }, 420);
    });
  }

  // Initial Calculation
  computeQuote(false);
}

