$(function () {
  /* get radio id from url */
  const rid = decodeURIComponent(window.location.href.substring(window.location.href.lastIndexOf('?rid=') + '?rid='.length)).trim()

  /* import components */
  // footer
  $('.footer').load('../common/footer.html', function () {
    const script = document.createElement('script')
    $(script).attr('src', '../common/js/footer.js')
    $('body').append(script)

    // initialize bottom's min height
    setTimeout(() => {
      $('.bottom-content').css({
        minHeight: $('body').height() - $('.footer-in').height() - $('.main-top').height() - $('.bottom-header').height()
      })
      // fix iScroll
      mainScroll.refresh()
    }, 100)
  })

  /* main content */
  // fetch data from server
  DetailedAPI.getDjRadioDetail(rid)
    .then((data) => {
      // background image
      const img = new Image()
      img.src = data.data.picUrl
      $('.bg').html(img)

      // top
      $('.main-top').html(template('top_info', data.data))

      // bottom content default
      $('.content-default').html(template('bottom_content_default', data.data))

      // fix iScroll
      mainScroll.refresh()
    })
    .catch((err) => {
      console.error(err)
    })

  // main content iScroll
  const mainScroll = new IScroll('.main', {
    mouseWheel: false,
    probeType: 3
  })

  // sticky content top bar
  // content scroll after top bar stuck
  // background image zoom in
  const stickPosition = $('.main-top').height() - $('.header').height()
  mainScroll.on('scroll', function () {
    if (this.y <= -stickPosition) {
      const subContentOffsetY = Math.abs(this.y) - stickPosition

      // sticky content top bar
      $('.main-bottom').css({
        position: 'relative',
        top: subContentOffsetY
      })

      // scroll bottom content
      if ($('.bottom-content').hasClass('active')) {
        $('.content-list>.list-main').css({ transform: `translateY(${-subContentOffsetY}px)` })
      } else {
        $('.content-default').css({ transform: `translateY(${-subContentOffsetY}px)` })
      }
    } else {
      $('.main-bottom').css({ position: 'static' })
      $('.content-default').css({ transform: `translateY(0)` })
      $('.content-list>.list-main').css({ transform: `translateY(0)` })
    }

    // zoom in background image
    if (this.y > 0) {
      const scale = ($('.main').height() + this.y * 2) / $('.main').height() * 100
      $('.bg>img').css({ width: `${scale}%` })
    } else {
      $('.bg>img').css({ width: '100%' })
    }
  })

  // content top bar switch
  $('.bottom-header>p').click(function () {
    // change style
    $(this).addClass('active').siblings().removeClass('active')
    $('.bottom-header>.bottom-line').css({ left: $(this).find('span').position().left })

    // change content
    if ($(this).index() === 0) {
      $('.bottom-content').removeClass('active')
    } else {
      $('.bottom-content').addClass('active')

      // fetch program data from server on first time click
      if ($('.list-main>li').length === 0) {
        loadProgram(rid)
      }
    }

    // reset scroll
    $('.main-bottom').css({ position: 'static' })
    $('.content-default').css({ transform: `translateY(0)` })
    $('.content-list>.list-main').css({ transform: `translateY(0)` })
    // fix iScroll
    mainScroll.refresh()
    mainScroll.scrollTo(0, 0)
  })

  function loadProgram (rid, asc = false, limit = 30, offset = 0) {
    DetailedAPI.getDjRadioProgram(rid, asc, limit, offset)
      .then((data) => {
        // update program count
        $('.header-periodical').text(`共${data.count}期`)

        // bottom content list
        data.programs.forEach((program) => {
          program.scheduledPublishTime = formatDate('yyyy-MM-dd', new Date(program.scheduledPublishTime))
          program.listenerCount = formatNumber(program.listenerCount)
          const durationObj = formatTime(program.duration)
          program.duration = `${durationObj.minute}:${durationObj.second}`
        })
        $('.list-main').append(template('bottom_content_list', data))

        // fix iScroll
        mainScroll.refresh()
      })
      .catch((err) => {
        console.error(err)
      })
  }

  /* content list multiple select */
  // start multiple select
  $('.header-multiple-select').click(function () {
    $('.content-list').addClass('active')
    // enable select / deselect music
    $('body').delegate('.content-list>.list-main>li', 'click', selectMusic)
    // disable click to play
  })

  // finish multiple select
  $('.header-multiple-select-complete').click(function () {
    $('.content-list').removeClass('active')
    // disable select / deselect music
    $('body').undelegate('.content-list>.list-main>li', 'click', selectMusic)
    // enable click to play
  })

  // select / deselect all
  $('.header-select-all').click(function () {
    // deselect all
    if ($(this).hasClass('active')) {
      $('.content-list>.list-main>li').removeClass('active')
      $(this).removeClass('active')
    }
    // select all
    else {
      $('.content-list>.list-main>li').addClass('active')
      $(this).addClass('active')
    }
  })

  function selectMusic () {
    // deselect
    if ($(this).hasClass('active')) {
      $(this).removeClass('active')
      $('.header-select-all').removeClass('active')
    }
    // select
    else {
      $(this).addClass('active')
      // check if all songs are selected
      if ($('.content-list>.list-main>li').length === $('.content-list>.list-main>li.active').length) {
        $('.header-select-all').addClass('active')
      }
    }
  }

  // content list sort
  $('.header-sort').click(function () {
    if ($(this).hasClass('sorted')) {
      $('.list-main').html('')
      loadProgram(rid, false)
      $(this).removeClass('sorted')
    } else {
      $('.list-main').html('')
      loadProgram(rid, true)
      $(this).addClass('sorted')
    }

    // reset scroll
    $('.main-bottom').css({ position: 'static' })
    $('.content-list>.list-main').css({ transform: `translateY(0)` })
    // fix iScroll
    mainScroll.refresh()
    mainScroll.scrollTo(0, 0)
  })

  // click to play music
})