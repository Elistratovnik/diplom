const SLIDER_OBJECT_OPTIONS = {
    loop: false,
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
        spaceBetween: 8,
      },

      1000: {
        loop: true,
        slidesPerGroup: 3,
        slidesPerView: 3,
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
