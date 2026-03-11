/* ═══════════════════════════════════════════════════════════════
   script.js — Louis Gourseaud Portfolio
   ═══════════════════════════════════════════════════════════════ */

// ─── Mobile nav toggle ────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});

// Close menu when a nav link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

// ─── Navbar scroll shadow ─────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.background = window.scrollY > 20
    ? 'rgba(10, 14, 26, 0.95)'
    : 'rgba(10, 14, 26, 0.8)';
}, { passive: true });

// ─── Active nav link on scroll ────────────────────────────────
const sections = document.querySelectorAll('section[id]');

function setActiveLink() {
  const scrollY = window.scrollY + 80;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = navLinks.querySelector(`a[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active-link', scrollY >= top && scrollY < top + height);
    }
  });
}

window.addEventListener('scroll', setActiveLink, { passive: true });

// ─── Intersection Observer — scroll reveals ───────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

// Add reveal class to section content blocks
const revealTargets = [
  '.about-text',
  '.about-cards',
  '.timeline',
  '.skills-grid',
  '.lang-grid',
  '.achievements-grid',
  '.contact-intro',
  '.contact-cards',
];

revealTargets.forEach(selector => {
  document.querySelectorAll(selector).forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });
});

// Stagger reveal for grid children
const staggerTargets = [
  '.lang-grid',
  '.achievements-grid',
  '.about-cards',
  '.skills-grid',
];

staggerTargets.forEach(selector => {
  document.querySelectorAll(selector).forEach(el => {
    el.classList.remove('reveal');
    el.classList.add('reveal-stagger');
    revealObserver.observe(el);
  });
});

// ─── Animate language bars on scroll ─────────────────────────
const langBarObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.lang-fill').forEach(fill => {
        const target = fill.style.getPropertyValue('--w');
        fill.style.width = '0%';
        requestAnimationFrame(() => {
          setTimeout(() => { fill.style.width = target; }, 80);
        });
      });
      langBarObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.lang-grid').forEach(el => {
  // Pre-set widths to 0 so animation fires on entry
  el.querySelectorAll('.lang-fill').forEach(fill => {
    const originalW = getComputedStyle(fill).getPropertyValue('--w').trim();
    if (originalW) fill.setAttribute('data-w', originalW);
    fill.style.width = '0%';
  });
  langBarObserver.observe(el);
});

// ─── Smooth active-link underline (CSS helper class) ─────────
document.head.insertAdjacentHTML('beforeend', `
  <style>
    .active-link { color: #e2e8f0 !important; }
    .active-link::after { width: 100% !important; }
  </style>
`);

// ─── Keyboard accessibility: skip to content ─────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'Tab') document.body.classList.add('keyboard-nav');
});
document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-nav');
});
