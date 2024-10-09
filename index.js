import Swiper from "swiper/swiper-bundle";
import "swiper/css/bundle";

// import Swiper from "swiper";
// import "swiper/css";

// init Swiper:
export const swiper = new Swiper(".swiper", {
  // Optional parameters
  // slidesPerView: 3,
  // spaceBetween: 24,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  on: {
    init: function () {
      console.log("swiper initialized");
    },
  },
  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    clickable: true,
    dynamicBullets: true,
  },
  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
    dragClass: "swiper-scrollbar-drag",
    dragSize: 80,
  },
});
// console.log("swiper initialized");
