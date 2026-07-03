/* ══════════════════════════════════════════
   BARRA DE PROGRESO DE LECTURA
══════════════════════════════════════════ */
const prog = document.getElementById('scroll-prog');

window.addEventListener('scroll', () => {
  const scrolled = document.documentElement.scrollTop;
  const total    = document.documentElement.scrollHeight - window.innerHeight;
  prog.style.transform = `scaleX(${scrolled / total})`;
});

/* ══════════════════════════════════════════
   RESALTAR ENLACE ACTIVO EN SIDEBAR
══════════════════════════════════════════ */
const sections = document.querySelectorAll('[id]');
const navLinks  = document.querySelectorAll('#sidenav a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const active = document.querySelector(`#sidenav a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, {
  threshold: 0.25,
  rootMargin: '-10% 0px -60% 0px'
});

sections.forEach(section => sectionObserver.observe(section));

/* ══════════════════════════════════════════
   MENÚ HAMBURGER (MÓVIL)
══════════════════════════════════════════ */
const hamburger = document.getElementById('hamburger');
const sidenav   = document.getElementById('sidenav');
const overlay   = document.getElementById('overlay');

function openMenu() {
  sidenav.classList.add('open');
  overlay.classList.add('show');
  hamburger.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  sidenav.classList.remove('open');
  overlay.classList.remove('show');
  hamburger.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  sidenav.classList.contains('open') ? closeMenu() : openMenu();
});

overlay.addEventListener('click', closeMenu);

// Cerrar al hacer clic en un enlace del menú (móvil)
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) closeMenu();
  });
});

/* ══════════════════════════════════════════
   ANIMACIÓN DE BARRAS DE PROGRESO
   (se activan cuando entran en pantalla)
══════════════════════════════════════════ */
const progressFills = document.querySelectorAll('.progress-fill');

const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
    }
  });
}, { threshold: 0.3 });

progressFills.forEach(fill => {
  fill.style.animationPlayState = 'paused';
  progressObserver.observe(fill);
});