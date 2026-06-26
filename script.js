(() => {
  const track = document.getElementById('slidesTrack');
  const arrow = document.getElementById('pageArrow');
  const dots = Array.from(document.querySelectorAll('.dot'));

  if (!track || !arrow || dots.length === 0) {
    return;
  }

  let currentSlide = 0;
  let touchStartX = 0;
  let touchEndX = 0;
  const slideCount = dots.length;

  function updateSlider() {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });

    const isSecondPage = currentSlide === 1;
    arrow.classList.toggle('is-left', isSecondPage);
    arrow.textContent = isSecondPage ? '‹' : '›';
    arrow.setAttribute('aria-label', isSecondPage ? 'Previous letter page' : 'Next letter page');
  }

  function goToSlide(index) {
    currentSlide = (index + slideCount) % slideCount;
    updateSlider();
  }

  arrow.addEventListener('click', () => {
    if (currentSlide === 0) {
      goToSlide(1);
      return;
    }

    goToSlide(0);
  });

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const index = Number(dot.dataset.slide);
      goToSlide(index);
    });
  });

  track.addEventListener('touchstart', (event) => {
    touchStartX = event.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', (event) => {
    touchEndX = event.changedTouches[0].screenX;
    const delta = touchStartX - touchEndX;

    if (Math.abs(delta) < 45) {
      return;
    }

    if (delta > 0) {
      goToSlide(currentSlide + 1);
      return;
    }

    goToSlide(currentSlide - 1);
  }, { passive: true });

  updateSlider();
})();