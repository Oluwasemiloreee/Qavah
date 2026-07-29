(() => {
  'use strict';
  const header = document.querySelector('header');
  const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 18);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const targets = document.querySelectorAll('main section, .event-card, .product-card, .info-card, .gallery-item, .pillar');
  targets.forEach((el, index) => {
    el.classList.add('reveal-ready');
    el.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
  });
  if (reduceMotion || !('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
    targets.forEach(el => observer.observe(el));
  }

  document.querySelectorAll('.navbar-collapse .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const menu = document.querySelector('.navbar-collapse.show');
      if (menu && window.bootstrap) window.bootstrap.Collapse.getOrCreateInstance(menu).hide();
    });
  });

  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', () => {
      form.querySelector(':invalid')?.focus();
    });
  });
})();
