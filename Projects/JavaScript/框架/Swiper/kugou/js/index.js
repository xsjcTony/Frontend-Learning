window.onload = function () {
  const swiper = new Swiper('.swiper-container', {
    direction: 'vertical',
    on: {
      init: function () {
        swiperAnimateCache(this)
        swiperAnimate(this)
      },
      slideChangeTransitionEnd: function () {
        swiperAnimate(this)
      }
    }
  })
}