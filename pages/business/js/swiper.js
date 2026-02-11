window.addEventListener("DOMContentLoaded", () => {
  new Swiper(".swiper", {
    slidesPerView: 4,
    spaceBetween: 30,
    centeredSlides: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      type: "fraction",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    breakpoints: {
      0: {
        slidesPerView: 1.2,
        spaceBetween: 16,
        centeredSlides: true,
      },

      750: {
        slidesPerView: 1.6,
        spaceBetween: 20,
        centeredSlides: true,
      },

      1024: {
        slidesPerView: 4,
        spaceBetween: 30,
        centeredSlides: true,
      },
    },
  });
});
