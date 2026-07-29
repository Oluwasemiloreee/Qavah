// Bootstrap navbar state + mobile close
(() => {
  const header = document.querySelector('.qavah-header');
  const collapseEl = document.getElementById('qavahNav');
  const setHeader = () => header?.classList.toggle('scrolled', window.scrollY > 24);
  setHeader(); window.addEventListener('scroll', setHeader, {passive:true});
  document.querySelectorAll('#qavahNav .nav-link').forEach(link => link.addEventListener('click', () => {
    if (window.innerWidth < 992 && collapseEl?.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(collapseEl).hide();
  }));
})();

// Events carousel controls
(() => {
  const track = document.getElementById('track');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('dots');

  if (!track || !prevBtn || !nextBtn) return;

  const cards = Array.from(track.querySelectorAll('.event-card'));
  let currentIndex = 0;
  let maxIndex = 0;
  let step = 0;

  function calculateCarousel() {
    if (!cards.length) return;

    const trackWrap = track.parentElement;
    const trackStyles = window.getComputedStyle(track);
    const gap = parseFloat(trackStyles.columnGap || trackStyles.gap) || 0;
    const cardWidth = cards[0].getBoundingClientRect().width;

    step = cardWidth + gap;

    const visibleCards = Math.max(
      1,
      Math.floor((trackWrap.clientWidth + gap) / step)
    );

    maxIndex = Math.max(0, cards.length - visibleCards);
    currentIndex = Math.min(currentIndex, maxIndex);

    createDots();
    updateCarousel();
  }

  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * step}px)`;

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === maxIndex;

    prevBtn.setAttribute('aria-disabled', String(prevBtn.disabled));
    nextBtn.setAttribute('aria-disabled', String(nextBtn.disabled));

    if (dotsContainer) {
      dotsContainer.querySelectorAll('.d').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
        dot.setAttribute('aria-current', index === currentIndex ? 'true' : 'false');
      });
    }
  }

  function createDots() {
    if (!dotsContainer) return;

    dotsContainer.innerHTML = '';

    for (let index = 0; index <= maxIndex; index += 1) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'd';
      dot.setAttribute('aria-label', `Go to event slide ${index + 1}`);
      dot.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
      });
      dotsContainer.appendChild(dot);
    }
  }

  nextBtn.addEventListener('click', () => {
    if (currentIndex < maxIndex) {
      currentIndex += 1;
      updateCarousel();
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex -= 1;
      updateCarousel();
    }
  });

  let resizeTimer;
  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(calculateCarousel, 120);
  });

  calculateCarousel();
})();

// copyright year
document.getElementById("year").textContent = new Date().getFullYear();
