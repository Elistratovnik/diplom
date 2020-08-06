import 'swiper/swiper-bundle.css';
import "../pages/about.css";
import Swiper, { Navigation, Pagination } from 'swiper';

Swiper.use([Navigation, Pagination]);
var mySwiper = new Swiper('.swiper-container', {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 40,
  breakpoints: {
    680: {
      spaceBetween: 8,
    },

    768: {
      slidesPerView: 2,
      loop: false,
      spaceBetween: 8,
      centeredSlides: false,
    },

    1000: {
      slidesPerView: 3,
      centeredSlides: true,
      spaceBetween: 16,
    }
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
})
