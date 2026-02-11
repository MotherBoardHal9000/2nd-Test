const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("is-visible", entry.isIntersecting);
    });
  },
  { threshold: 0.2 },
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

let lenis = null;
let rafId = null;

function initLenis() {
  lenis = new Lenis({
    lerp: 0.08,
    smoothWheel: true,
    smoothTouch: false,
  });

  function raf(time) {
    lenis.raf(time);
    rafId = requestAnimationFrame(raf);
  }

  rafId = requestAnimationFrame(raf);
}

function destroyLenis() {
  if (!lenis) return;

  cancelAnimationFrame(rafId);
  lenis.destroy();
  lenis = null;
  rafId = null;
}

initLenis();

window.addEventListener("load", () => {
  gsap.registerPlugin(ScrollTrigger);

  const track = document.querySelector(".card-track");
  const section = document.querySelector(".horizontal-section");

  if (!track || !section) return;

  const SECTION_PADDING = 240;

  const getScrollWidth = () => track.scrollWidth - window.innerWidth + SECTION_PADDING;

  gsap.to(track, {
    x: () => -getScrollWidth(),
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: () => `+=${getScrollWidth()}`,
      scrub: 1.2,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  ScrollTrigger.refresh();
  window.addEventListener("resize", () => ScrollTrigger.refresh());
});

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  header.classList.toggle("is-hidden", window.scrollY >= 100);
});

const hamburgerBtns = document.querySelectorAll(".hamburger-button");
const mobileMenu = document.querySelector(".mobile-menu");

hamburgerBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const isOpened = mobileMenu.classList.toggle("is-opened");

    if (isOpened) {
      header.classList.add("is-hidden");
      document.body.classList.add("scroll-hide");

      destroyLenis();

      mobileMenu.scrollTop = 0;
    } else {
      header.classList.remove("is-hidden");
      document.body.classList.remove("scroll-hide");

      initLenis();
    }
  });
});

window.addEventListener("resize", () => {
  if (mobileMenu.classList.contains("is-opened") && window.innerWidth >= 751) {
    mobileMenu.classList.remove("is-opened");
    document.body.classList.remove("scroll-hide");

    header.classList.toggle("is-hidden", window.scrollY >= 100);

    initLenis();
  }
});

document.querySelectorAll(".mobile-nav-item").forEach((item) => {
  item.addEventListener("click", () => {
    const active = item.classList.contains("is-active");
    document.querySelectorAll(".mobile-nav-item").forEach((el) => el.classList.remove("is-active"));

    if (!active) item.classList.add("is-active");
  });
});

const languageSelectors = document.querySelectorAll(".language-selector");

languageSelectors.forEach((selector) => {
  selector.addEventListener("click", (e) => {
    e.stopPropagation();
    selector.classList.toggle("is-opened");
  });
});

document.addEventListener("click", () => {
  languageSelectors.forEach((selector) => selector.classList.remove("is-opened"));
});
