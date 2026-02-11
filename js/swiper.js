window.addEventListener("DOMContentLoaded", () => {
  const swiperEl = document.querySelector(".swiper");

  const swiper = new Swiper(".swiper", {
    loop: true,
    slidesPerView: 1,
    speed: 1000,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    allowTouchMove: true,
  });

  let wheelDelta = 0;
  let isAnimating = false;
  const THRESHOLD = 50;

  swiperEl.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();

      if (isAnimating) return;

      wheelDelta += e.deltaY;

      if (wheelDelta > THRESHOLD) {
        isAnimating = true;
        swiper.slideNext();
        reset();
      } else if (wheelDelta < -THRESHOLD) {
        isAnimating = true;
        swiper.slidePrev();
        reset();
      }
    },
    { passive: false },
  );

  function reset() {
    wheelDelta = 0;
    setTimeout(() => {
      isAnimating = false;
    }, swiper.params.speed + 100);
  }
});
