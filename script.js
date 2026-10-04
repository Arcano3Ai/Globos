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

  // Create 45 festive party balloons distributed across the hero
  for (let i = 0; i < 45; i++) {
    balloons.push(new FestiveBalloon(true));
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    balloons.forEach(b => {
      b.update();
      b.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
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
