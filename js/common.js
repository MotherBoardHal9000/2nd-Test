const scrollUpBtns = document.querySelectorAll(".scroll-up");

scrollUpBtns.forEach((scrollUpBtn) => {
  scrollUpBtn.addEventListener("click", () => {
    lenis.scrollTo(0, {
      duration: 3,
    });
  });
});
