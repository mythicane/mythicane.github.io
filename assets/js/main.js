'use strict';

/* ---------- hero word cycler ---------- */

(function initWordCycle() {
  const el = document.querySelector('.cycle-word');
  if (!el) return;
  const words = (el.dataset.words || el.textContent).split(',').map((w) => w.trim());
  if (words.length < 2) return;

  let i = words.indexOf(el.textContent.trim());
  if (i < 0) i = 0;

  setInterval(() => {
    el.classList.add('swap');
    setTimeout(() => {
      i = (i + 1) % words.length;
      el.textContent = words[i];
      el.classList.remove('swap');
    }, 320);
  }, 2200);
})();

/* ---------- overlay menu ---------- */

(function initNav() {
  const btn = document.querySelector('.menu-btn');
  const overlay = document.querySelector('.overlay-nav');
  if (!btn || !overlay) return;

  const close = () => document.body.classList.remove('nav-open');
  btn.addEventListener('click', () => document.body.classList.toggle('nav-open'));
  overlay.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  // mark current page in the overlay nav
  const here = location.pathname.split('/').pop() || 'index.html';
  overlay.querySelectorAll('a[href]').forEach((a) => {
    const target = a.getAttribute('href').split('/').pop();
    if (target === here) a.classList.add('current');
  });
})();

/* ---------- reveal-on-scroll ---------- */

(function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('in-view'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
  );
  items.forEach((el, i) => {
    el.style.setProperty('--i', i % 8);
    io.observe(el);
  });
})();

/* ---------- hero parallax (subtle, background only) ---------- */

(function initParallax() {
  const bg = document.querySelector('.hero-bg .kenburns, .hero-bg video');
  if (!bg) return;
  let ticking = false;
  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        bg.style.transform = `translateY(${y * 0.18}px) scale(1.02)`;
        ticking = false;
      });
    },
    { passive: true }
  );
})();

/* ---------- timeline scroll progress ---------- */

(function initTimeline() {
  const axis = document.querySelector('.timeline-axis');
  const fill = document.querySelector('.timeline-axis-fill');
  const entries = document.querySelectorAll('.timeline-entry');
  if (!axis || !entries.length) return;

  const io = new IntersectionObserver(
    (list) => {
      list.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('in-view');
      });
    },
    { threshold: 0.4 }
  );
  entries.forEach((el) => io.observe(el));

  function updateFill() {
    const rect = axis.getBoundingClientRect();
    const vh = window.innerHeight;
    const visibleTop = Math.min(Math.max(vh * 0.5 - rect.top, 0), rect.height);
    const pct = rect.height > 0 ? (visibleTop / rect.height) * 100 : 0;
    if (fill) fill.style.setProperty('--progress', pct + '%');
  }

  let ticking = false;
  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateFill();
        ticking = false;
      });
    },
    { passive: true }
  );
  window.addEventListener('resize', updateFill);
  updateFill();
})();

/* ---------- document buttons (CV, Statement of Purpose): switch on once the PDF exists ---------- */

(function initDocButtons() {
  if (!window.fetch) return;
  document.querySelectorAll('.cv-btn.is-pending').forEach((btn) => {
    fetch(btn.getAttribute('href'), { method: 'HEAD' })
      .then((r) => {
        if (r.ok) { btn.classList.remove('is-pending'); btn.removeAttribute('aria-disabled'); }
      })
      .catch(() => {});
  });
})();

/* ---------- poster lightbox ---------- */

(function initLightbox() {
  const cards = Array.from(document.querySelectorAll('.poster-card'));
  const lightbox = document.querySelector('.lightbox');
  if (!cards.length || !lightbox) return;

  const frame = lightbox.querySelector('.lightbox-frame');
  const titleEl = lightbox.querySelector('h3');
  const descEl = lightbox.querySelector('p');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');

  let index = 0;

  function render() {
    const card = cards[index];
    const title = card.dataset.title || '';
    const desc = card.dataset.desc || '';
    const c1 = card.dataset.c1;
    const c2 = card.dataset.c2;
    titleEl.textContent = title;
    descEl.textContent = desc;
    if (c1) frame.style.setProperty('--pc1', c1);
    if (c2) frame.style.setProperty('--pc2', c2);
  }

  function open(i) {
    index = i;
    render();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function step(delta) {
    index = (index + delta + cards.length) % cards.length;
    render();
  }

  cards.forEach((card, i) => card.addEventListener('click', () => open(i)));
  closeBtn.addEventListener('click', close);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });
  prevBtn.addEventListener('click', () => step(-1));
  nextBtn.addEventListener('click', () => step(1));
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });
})();

/* ---------- footer year ---------- */

document.querySelectorAll('.js-year').forEach((el) => {
  el.textContent = new Date().getFullYear();
});
