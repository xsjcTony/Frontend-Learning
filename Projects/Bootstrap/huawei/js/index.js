$(function () {
  // mobile navbar toggler
  $('.navbar-toggler').click(function () {
    $(this).toggleClass('on')
  })

  // login box toggler
  $('.login').hover(function () {
    $(this).addClass('on')
  }, function () {
    $(this).removeClass('on')
  })

  // sticky navbar
  // height of elements to be hide
  const headerHeight = $('.header-top').height() + $('.header-middle').height()
  // monitor page scroll
  $(window).scroll(function () {
    // height of scrolled out page
    const offsetY = $('html').scrollTop()
    // toggle
    if (offsetY >= headerHeight) {
      $('.header-top').removeClass('d-xl-block')
      $('.header-middle').hide()
    } else {
      $('.header-top').addClass('d-xl-block')
      $('.header-middle').show()
      $('body').css('padding-top', $('.header').height())
    }
  })
  $('body').css('padding-top', $('.header').height())

  // carousel
  const swiper = new Swiper('.swiper', {
    on: {
      init: function () {
        swiperAnimateCache(this)
        swiperAnimate(this)
      },
      slideChangeTransitionStart: function () {
        swiperAnimate(this)
      },
      slideChangeTransitionEnd: function () {
        const offsetY = this.activeIndex * 45
        $('.swiper-name>span').animate({ top: -offsetY }, 1000)
        $('.swiper-num>span').animate({ top: -offsetY }, 1000)
      }
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      bulletClass: 'my-bullet',
      bulletActiveClass: 'my-bullet-active'
    },
    effect: 'fade',
    autoplay: {
      delay: 3000
    }
  })
  swiper.autoplay.stop()

  // ScrollMagic
  const controller = new ScrollMagic.Controller()
  // section 1 Scene
  const scene1 = new ScrollMagic.Scene({
    triggerElement: '.trigger-section1',
    triggerHook: 'onLeave',
    duration: '110%'
  })
  scene1.setPin('.section1', { pushFollowers: false })
  scene1.setTween('.section1', 1, { opacity: 0.5 })
  controller.addScene(scene1)

  // section 2 text Scene
  const scene2 = new ScrollMagic.Scene({
    triggerElement: '.trigger-section2',
    triggerHook: 'onEnter'
  })
  scene2.setVelocity(['.section2-top>div:nth-of-type(2)', '.section2-top>div>p'], {
    top: '0px',
    opacity: '1'
  }, { duration: 500 })
  controller.addScene(scene2)

  // section 2 image Scene
  const scene3 = new ScrollMagic.Scene({
    triggerElement: '.trigger-section2',
    triggerHook: 'onLeave',
    offset: $('.section2-top').height() + parseInt($('.section2-top').css('padding-top')),
    duration: '100%'
  })
  scene3.setPin('.section2', { pushFollowers: false })
  let timeline = new TimelineMax()
  timeline.add([
    new TweenMax('.middle-left', 1, {
      transform: 'translateX(-100%)',
      opacity: 0
    }),
    new TweenMax('.middle-right', 1, {
      transform: 'translateX(100%)',
      opacity: 0
    }),
    new TweenMax('.middle-text', 1, {
      opacity: 1,
      delay: 0.4
    })
  ])
  timeline.add(new TweenMax('.middle-phone', 1, {
    opacity: 1
  }))
  scene3.setTween(timeline)
  controller.addScene(scene3)

  // carousel autoplay scene
  const scene4 = new ScrollMagic.Scene({
    triggerElement: '.section2-bottom',
    triggerHook: 'onCenter'
  })
  scene4.on('start', function (event) {
    if (event.scrollDirection === 'FORWARD') {
      swiper.autoplay.start()
    } else if (event.scrollDirection === 'REVERSE') {
      swiper.autoplay.stop()
    }
  })
  controller.addScene(scene4)
})