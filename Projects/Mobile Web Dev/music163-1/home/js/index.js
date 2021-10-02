$(function () {
  /* import components */
  // header
  $('.header').load('../common/header.html', function () {
    const script = document.createElement('script')
    $(script).attr('src', '../common/js/header.js')
    $('body').append(script)
  })

  // footer
  $('.footer').load('../common/footer.html', function () {
    const script = document.createElement('script')
    $(script).attr('src', '../common/js/footer.js')
    $('body').append(script)
  })

  /* main content */
  // pull down & pull up refresh
  const logoLength = $('#refresh_logo').get(0).getTotalLength()
  const bottomHeight = $('.pull-up').height()
  let isPulledDown = false
  let isPulledUp = false
  let isRefreshing = false
  $('#refresh_logo').css({
    'stroke-dasharray': logoLength,
    'stroke-dashoffset': logoLength
  })

  // initialize iScroll
  const myScroll = new IScroll('.main', {
    mouseWheel: false,
    scrollbars: false,
    probeType: 3
  })

  let maxOffsetY = myScroll.maxScrollY - bottomHeight

  myScroll.on('scroll', function () {
    // pull down
    if (this.y >= 0) {
      const dashOffset = logoLength - this.y
      if (dashOffset >= 0 && !isPulledDown) {
        $('#refresh_logo').css({ 'stroke-dashoffset': dashOffset })
      } else {
        $('#refresh_logo').css({ 'stroke-dashoffset': 0 })
        this.minScrollY = 126
        isPulledDown = true
      }
    }
    // pull up
    else if (this.y <= maxOffsetY) {
      this.maxScrollY = maxOffsetY
      if (!isPulledUp) {
        $('.pull-up>span').html('松手加载更多')
        isPulledUp = true
      }
    }
  })

  myScroll.on('scrollEnd', function () {
    // pulled down
    if (isPulledDown && !isRefreshing) {
      isRefreshing = true
      refreshDown()
    }
    // pulled up
    else if (isPulledUp && !isRefreshing) {
      isRefreshing = true
      $('.pull-up>span').html('加载中...')
      refreshUp()
    }
  })

  function refreshDown () {
    setTimeout(() => {
      console.log('top data refreshed')
      isPulledDown = false
      isRefreshing = false
      myScroll.minScrollY = 0
      myScroll.scrollTo(0, 0)
    }, 3000)
  }

  function refreshUp () {
    setTimeout(() => {
      console.log('bottom data loaded')
      $('.pull-up>span').html('上拉加载更多')
      isPulledUp = false
      isRefreshing = false
      myScroll.maxScrollY = maxOffsetY + bottomHeight
      myScroll.scrollTo(0, myScroll.maxScrollY)
    }, 3000)
  }

  // home => carousel
  const mySwiper = new Swiper('.swiper', {
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      bulletClass: 'my-bullet',
      bulletActiveClass: 'my-bullet-active'
    },
    observer: true,
    observeParents: true,
    observeSlideChildren: true
  })

  HomeAPI.getBanner()
    .then((data) => {
      // add carousel pages
      const html = template('banner_slide', data)
      $('.swiper-wrapper').html(html)
      // fix swiper loop
      mySwiper.loopCreate()
      mySwiper.slideTo(1)
    })
    .catch((err) => {
      console.error(err)
    })

  // home => navigation
  $('.nav-date').html(new Date().getDate())

  // home => recommended playlist
  HomeAPI.getRecommend(6)
    .then((data) => {
      data.title = '推荐歌单'
      data.subTitle = '歌单广场'
      data.result.forEach((obj) => {
        obj.width = 216 / 100
        obj.playCount = formatNumber(obj.playCount)
      })
      // add playlists
      const html = template('category', data)
      $('.recommend').html(html)
      $('.recommend .category-title').forEach((item) => {
        $clamp(item, { clamp: 2 })
      })
    })
    .catch((err) => {
      console.error(err)
    })

  // home => exclusive content
  HomeAPI.getExclusive()
    .then((data) => {
      data.title = '独家放送'
      data.subTitle = '网易出品'
      data.result.forEach((obj, index) => {
        obj.width = 334 / 100
        if (index === 2) {
          obj.width = 690 / 100
        }
      })
      // add contents
      const html = template('category', data)
      $('.exclusive').html(html)
      $('.exclusive .category-title').forEach((item) => {
        $clamp(item, { clamp: 2 })
      })
    })
    .catch((err) => {
      console.error(err)
    })

  // home => latest album
  HomeAPI.getAlbum(6)
    .then((data) => {
      data.title = '新碟新歌'
      data.subTitle = '更多新碟'
      data.result = data['albums']
      data.result.forEach((obj) => {
        obj.artistName = obj['artist']['name']
        obj.width = 216 / 100
      })
      // add albums
      const html = template('category', data)
      $('.album').html(html)
      $('.album .category-title').forEach((item) => {
        $clamp(item, { clamp: 1 })
      })
      $('.album .category-singer').forEach((item) => {
        $clamp(item, { clamp: 1 })
      })
    })
    .catch((err) => {
      console.error(err)
    })

  // home => recommended mv
  HomeAPI.getMV(6)
    .then((data) => {
      data.title = '推荐MV'
      data.subTitle = '更多MV'
      data.result.forEach((obj) => {
        obj.width = 334 / 100
      })
      // add mvs
      const html = template('category', data)
      $('.mv').html(html)
      $('.mv .category-title').forEach((item) => {
        $clamp(item, { clamp: 1 })
      })
      $('.mv .category-singer').forEach((item) => {
        $clamp(item, { clamp: 1 })
      })
    })
    .catch((err) => {
      console.error(err)
    })

  // home => broadcast
  HomeAPI.getBroadcast()
    .then((data) => {
      data.title = '主播电台'
      data.subTitle = '更多主播'
      data.result.forEach((obj) => {
        obj.width = 216 / 100
      })
      // add albums
      const html = template('category', data)
      $('.broadcast').html(html)
      $('.broadcast .category-title').forEach((item) => {
        $clamp(item, { clamp: 2 })
      })
    })
    .catch((err) => {
      console.error(err)
    })
})