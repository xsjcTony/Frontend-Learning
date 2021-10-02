$(function () {
  // classes for tabs
  class View {
    constructor (myScroll, params = { offset: 0, limit: 30 }) {
      this.myScroll = myScroll
      this.offset = params.offset
      this.limit = params.limit
    }
  }

  class Comprehensive extends View {
    constructor (myScroll, params) {
      super(myScroll, params)
      this.name = 'comprehensive'
      this.type = 1018
    }

    initData (keywords) {
      /* fetch comprehensive data from server */
      SearchAPI.getSearch(keywords, this.offset, this.limit, this.type)
        .then((data) => {
          // generate comprehensive tab container
          $('.comprehensive').html(template('comprehensive_item', data.result))

          /* fill in data for each sector */
          // single song
          if (data.result.song) {
            data.result.song.songs.forEach((song) => {
              song.artists = song.ar
              song.album = song.al
            })
            $('.comprehensive>.single>.list').html(template('single_item', data.result.song))
          }
          // playlist
          if (data.result.playList) {
            data.result.playList.playlists = data.result.playList.playLists
            $('.comprehensive>.playlist>.list').html(template('playlist_item', data.result.playList))
          }
          // video
          if (data.result.new_mlog) {
            data.result.new_mlog.videos = data.result.new_mlog.resources
            $('.comprehensive>.video>.list').html(template(('video_item'), data.result.new_mlog))
          }
          // artist
          if (data.result.artist) {
            $('.comprehensive>.singer>.list').html(template(('singer_item'), data.result.artist))
          }
          // album
          if (data.result.album) {
            $('.comprehensive>.album>.list').html(template(('album_item'), data.result.album))
          }
          // circle => change to dj radio (no data from server)
          if (data.result.circle) {
            $('.comprehensive-category.dj').append($(`<div class="comprehensive-bottom" data-name="dj">查看全部主播电台 &gt;</div>`))
          }
          // relative search
          if (data.result.sim_query) {
            $('.comprehensive>.relative>.list').html(template(('relative_item'), data.result.sim_query))
          }
          // user
          if (data.result.user) {
            data.result.user.userprofiles = data.result.user.users
            $('.comprehensive>.user>.list').html(template(('user_item'), data.result.user))
          }

          /* click to view more handler */
          $('.comprehensive-bottom').click(function () {
            $('.nav>ul>.' + $(this).data('name').trim()).triggerHandler('click')
          })

          /* fix iScroll */
          this.myScroll.refresh()
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }

  class Single extends View {
    constructor (myScroll, params) {
      super(myScroll, params)
      this.name = 'single'
      this.type = 1
      this.result = 'songs'
      this.more = true
    }

    initData (keywords) {
      /* multiple select */
      // show multiple select
      $('.multiple-select').click(function () {
        $('.single-top').addClass('active')
        $('.main-in>.single>.list').addClass('active')
        // enable select / deselect single song
        $('body').delegate('.main-in>.single>.list>li', 'click', selectSong)
        // disable click to play
        $('body').undelegate('.main-in>.single>.list>li', 'click', playSong)
      })

      // hide multiple select
      $('.multiple-select-complete').click(function () {
        $('.single-top').removeClass('active')
        $('.main-in>.single>.list').removeClass('active')
        // disable select / deselect single song
        $('body').undelegate('.main-in>.single>.list>li', 'click', selectSong)
        // enable click to play
        $('body').delegate('.main-in>.single>.list>li', 'click', playSong)
      })

      // select / deselected all
      $('.select-all').click(function () {
        // deselect all
        if ($(this).hasClass('active')) {
          $('.main-in>.single>.list>li').removeClass('active')
          $(this).removeClass('active')
        }
        // select all
        else {
          $('.main-in>.single>.list>li').addClass('active')
          $(this).addClass('active')
        }
      })

      function selectSong () {
        // deselect
        if ($(this).hasClass('active')) {
          $(this).removeClass('active')
          $('.select-all').removeClass('active')
        }
        // select
        else {
          $(this).addClass('active')
          // check if all songs are selected
          if ($('.main-in>.single>.list>li').length === $('.main-in>.single>.list>li.active').length) {
            $('.select-all').addClass('active')
          }
        }
      }

      /* play single song (jump to player) */
      $('body').delegate('.main-in>.single>.list>li', 'click', playSong)

      function playSong () {
        const id = this.dataset.songId
        const name = $(this).find('.song-name').text()
        const singer = $(this).find('.song-singer').text()

        setSong(id, name, singer)
        window.location.href = '../player/index.html'
      }

      /* sticky top bar */
      this.myScroll.on('scroll', function () {
        if (this.y < 0) {
          $('.single-top').css({ top: -this.y })
        } else {
          $('.single-top').css({ top: 0 })
        }
      })

      /* play all songs */
      $('.main-in>.single .play-all').click(function () {
        let songs = null

        // has selected songs => play those songs
        if ($('.main-in>.single>.list>li').hasClass('active')) {
          songs = $('.main-in>.single>.list>li.active')
        }
        // no selected songs => play all
        else {
          songs = $('.main-in>.single>.list>li')
        }

        songs.get().reverse().forEach((song) => {
          const id = song.dataset.songId
          const name = $(song).find('.song-name').text()
          const singer = $(song).find('.song-singer').text()

          setSong(id, name, singer)
        })

        window.location.href = '../player/index.html'
      })

      /* fetch songs from server */
      SearchAPI.getSearch(keywords)
        .then((data) => {
          $('.main-in>.single>.list').html(template('single_item', data.result))
          // fix iScroll
          this.myScroll.refresh()
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }

  class Video extends View {
    constructor (myScroll, params) {
      super(myScroll, params)
      this.name = 'video'
      this.type = 1014
      this.result = 'videos'
      this.more = true
    }

    initData (keywords) {
      /* fetch videos from server */
      SearchAPI.getSearch(keywords, 0, 30, 1014)
        .then((data) => {
          data.result.videos.forEach((obj) => {
            obj.playTime = formatNumber(obj.playTime)
            const time = formatTime(obj.durationms)
            obj.durationms = `${time.minute}:${time.second}`
          })
          $('.main-in>.video>.list').html(template('video_item', data.result))
          $('.video-title').forEach((item) => {
            $clamp(item, { clamp: 2 })
          })
          $('.video-info').forEach((item) => {
            $clamp(item, { clamp: 1 })
          })
          // fix iScroll
          this.myScroll.refresh()
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }

  class Singer extends View {
    constructor (myScroll, params) {
      super(myScroll, params)
      this.name = 'singer'
      this.type = 100
      this.result = 'artists'
      this.more = true
    }

    initData (keywords) {
      /* fetch singers from server */
      SearchAPI.getSearch(keywords, 0, 30, 100)
        .then((data) => {
          $('.main-in>.singer>.list').html(template('singer_item', data.result))
          // fix iScroll
          this.myScroll.refresh()
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }

  class Album extends View {
    constructor (myScroll, params) {
      super(myScroll, params)
      this.name = 'album'
      this.type = 10
      this.result = 'albums'
      this.more = true
    }

    initData (keywords) {
      /* fetch albums from server */
      SearchAPI.getSearch(keywords, 0, 30, 10)
        .then((data) => {
          data.result.albums.forEach((obj) => {
            obj.publishTime = formatDate('yyyy-MM-dd', new Date(obj.publishTime))
          })
          $('.main-in>.album>.list').html(template('album_item', data.result))
          // fix iScroll
          this.myScroll.refresh()
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }

  class Playlist extends View {
    constructor (myScroll, params) {
      super(myScroll, params)
      this.name = 'playlist'
      this.type = 1000
      this.result = 'playlists'
      this.more = true
    }

    initData (keywords) {
      /* fetch playlists from server */
      SearchAPI.getSearch(keywords, 0, 30, 1000)
        .then((data) => {
          data.result.playlists.forEach((obj) => {
            obj.playCount = formatNumber(obj.playCount)
          })
          $('.main-in>.playlist>.list').html(template('playlist_item', data.result))
          // fix iScroll
          this.myScroll.refresh()
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }

  class DjRadio extends View {
    constructor (myScroll, params) {
      super(myScroll, params)
      this.name = 'dj'
      this.type = 1009
      this.result = 'djRadios'
      this.more = true
    }

    initData (keywords) {
      /* fetch DJ radios from server */
      SearchAPI.getSearch(keywords, 0, 30, 1009)
        .then((data) => {
          data.result.djRadios.forEach((obj) => {
            obj.playCount = formatNumber(obj.playCount)
          })
          $('.main-in>.dj>.list').html(template('dj_item', data.result))
          // fix iScroll
          this.myScroll.refresh()
        })
        .catch((err) => {
          console.error(err)
        })

      /* go to dj program detail page */
      $('body').delegate('.main-in>.dj>.list>li', 'click', function () {
        window.location.href = '../djDetail/index.html?rid=' + this.dataset.djradioId
      })
    }
  }

  class User extends View {
    constructor (myScroll, params) {
      super(myScroll, params)
      this.name = 'user'
      this.type = 1002
      this.result = 'users'
      this.more = true
    }

    initData (keywords) {
      /* fetch users from server */
      SearchAPI.getSearch(keywords, 0, 30, 1002)
        .then((data) => {
          $('.main-in>.user>.list').html(template('user_item', data.result))
          // fix iScroll
          this.myScroll.refresh()
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }

  /* import components */
  // footer
  $('.footer').load('../common/footer.html', function () {
    const script = document.createElement('script')
    $(script).attr('src', '../common/js/footer.js')
    $('body').append(script)
    // calculate & set main container height
    setTimeout(() => {
      $('.main').css({
        height: $('body').height() - $('.header').height() - $('.nav').height() - $('.footer-in').height()
      })
      // fix iScroll
      myScroll.refresh()
    }, 50)
  })

  /* header */
  const keywords = initHeader()

  function initHeader () { // fetch data from GET http request
    const keywords = decodeURIComponent(window.location.href.substring(window.location.href.lastIndexOf('keywords=') + 'keywords='.length)).trim()

    // fill in the input box in header
    $('.search-box>input').val(keywords)

    // go back handler
    $('.go-back').click(function () {
      window.history.back()
    })
    $('.clear-text').click(function () {
      window.history.back()
    })

    return keywords
  }

  /* scroll initialization */
  // variables
  let isRefreshing = true
  let index = 0
  let isPulledUp = false

  const myScroll = initScroll()

  function initScroll () {
    // initialize iScroll
    const myScroll = new IScroll('.main', {
      mouseWheel: true,
      scrollbars: false,
      probeType: 3
    })

    // pull up to load more
    myScroll.on('scroll', function () {
      if (this.y < myScroll.maxScrollY) {
        if (!isPulledUp) {
          $('.pull-up>span').html('松手加载更多')
          isPulledUp = true
        }
      }
    })

    myScroll.on('scrollEnd', function () {
      if (isPulledUp && !isRefreshing) {
        isRefreshing = true
        $('.pull-up>span').html('加载中...')
        refreshUp()
      }
    })

    // pull up to load more handler
    function refreshUp () {
      /* single song => add more songs from server */
      SearchAPI.getSearch(keywords, $('.main-in>.' + views[index].name + '>.list>li').length, views[index].limit, views[index].type)
        .then((data) => {
          // append data only if exists
          if (data.result[views[index].result]) {
            $('.main-in>.' + views[index].name + '>.list').append(template(views[index].name + '_item', data.result))
            $('.pull-up>span').html('上拉加载更多')
            isRefreshing = false
          } else {
            $('.pull-up>span').html('上拉加载更多')
            $('.pull-up').hide()
            views[index].more = false
          }
          isPulledUp = false
          // fix iScroll
          myScroll.refresh()
        })
        .catch((err) => {
          console.error(err)
        })
    }

    return myScroll
  }

  /* navigation */
  const views = [
    new Comprehensive(myScroll),
    new Single(myScroll),
    new Video(myScroll),
    new Singer(myScroll),
    new Album(myScroll),
    new Playlist(myScroll),
    new DjRadio(myScroll),
    new User(myScroll)
  ]

  initNavigation()

  function initNavigation () { // calculate width of <ul>
    let ulWidth = 0
    $('.nav>ul>li').forEach((li) => {
      ulWidth += $(li).width()
    })
    $('.nav>ul').css({ width: ulWidth + parseInt($('.nav').css('padding-left')) * 2 })

    // initialize iScroll
    const navScroll = new IScroll('.nav', {
      mouseWheel: false,
      scrollbars: false,
      scrollX: true,
      scrollY: false
    })

    // switch between tabs
    $('.nav>ul>li').click(function () {
      // return if current tab is clicked
      if ($(this).hasClass('active')) {
        return
      }

      // navigation scroll
      let offsetX = $('.nav').width() / 2 - parseInt($(this).position().left) - parseInt($('.nav').css('padding-left')) - $(this).width() / 2
      offsetX = offsetX > 0 ? 0 : offsetX
      offsetX = offsetX < navScroll.maxScrollX ? navScroll.maxScrollX : offsetX
      navScroll.scrollTo(offsetX, 0, 200, IScroll.utils.ease.quadratic)

      // exit selection - main => single song
      if ($(this).html() !== '单曲') {
        $('.multiple-select-complete').triggerHandler('click')
      }

      // toggle active class
      $(this).addClass('active').siblings().removeClass('active')

      // underline animation
      $('.nav>ul>span').animate({
        left: $(this).position().left,
        width: $(this).width()
      }, 200)

      // toggle main content active class
      $('.main-in>div').removeClass('active').eq($(this).index()).addClass('active')

      // initialize clicked tab
      index = $(this).index()

      if (index === 0) {
        $('.pull-up').hide()
        isRefreshing = true
      } else {
        if (views[index].more) {
          $('.pull-up').show()
          isRefreshing = false
        } else {
          $('.pull-up').hide()
          isRefreshing = true
        }
      }

      if (views[index].initData) {
        $('.pull-up>span').html('加载中...')
        views[index].initData(keywords)
      }
      delete views[index].initData

      if (index === 1) {
        $('.single-top').css({ top: 0 })
      }

      // fix iScroll
      myScroll.refresh()
      myScroll.scrollTo(0, 0)
    })
  }

  // init comprehensive tab by default
  views[0].initData(keywords)
})