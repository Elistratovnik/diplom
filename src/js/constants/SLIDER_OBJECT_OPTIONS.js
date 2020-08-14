const SLIDER_OBJECT_OPTIONS = {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 40,
    slidesPerGroup: 1,
    breakpoints: {
      680: {
        spaceBetween: 8,
      },

      768: {
        slidesPerGroup: 2,
        slidesPerView: 2,
        loop: false,
        spaceBetween: 8,
        centeredSlides: false,
      },

      1000: {
        slidesPerGroup: 3,
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
}

export default SLIDER_OBJECT_OPTIONS
