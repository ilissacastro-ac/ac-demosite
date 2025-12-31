document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  const hexWrappers = document.querySelectorAll('.hexagon-wrapper');
  const hexagons = document.querySelectorAll('.hexagon');

  let currentIndex = 0;
  let isInitial = true;
  let slideInterval = setInterval(nextSlide, 5000);

  function showSlide(index) {

    // FIX: prevent transition when clicking active hexagon
    if (index === currentIndex && !isInitial) return;

    slides.forEach((s, i) => {
      s.classList.remove('active', 'prev', 'next');

      if (i === currentIndex && !isInitial) {
        if (
          index > currentIndex ||
          (currentIndex === slides.length - 1 && index === 0)
        ) {
          s.classList.add('prev'); // move left
        } else {
          s.classList.add('next'); // move right
        }
      }

      if (i === index) {
        s.classList.add('active');
      }
    });

    // Update hexagon states
    hexWrappers.forEach(w => w.classList.remove('active'));
    hexagons.forEach(h => h.classList.remove('active'));

    hexWrappers[index].classList.add('active');
    hexagons[index].classList.add('active');

    currentIndex = index;
    isInitial = false;
  }

  function nextSlide() {
    const nextIndex = (currentIndex + 1) % slides.length;
    showSlide(nextIndex);
  }

  // Hexagon click
  hexWrappers.forEach((wrapper, i) => {
    wrapper.addEventListener('click', () => {
      showSlide(i);
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 5000);
    });
  });

  // Initial load
  showSlide(0);
});
