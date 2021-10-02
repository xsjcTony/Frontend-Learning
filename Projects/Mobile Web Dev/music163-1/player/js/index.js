$(function () {
  /* get songs from session storage */
  let songs = getSongs()
  let ids = songs.map(song => song.id)

  let discSwiper = null

  // Song initialization
  MusicAPI.getSongDetail(ids.join(','))
    .then((data) => {
      for (let i = 0; i < data.songs.length; i++) {
        const song = data.songs[i]

        const slide = $(`<div class="swiper-slide">
                             <div class="disc-image">
                                 <img src="${song.al.picUrl}" alt>
                             </div>
                         </div>`)

        $('.swiper-wrapper').append(slide)

        // store cover image into global song list
        songs[i].picUrl = song.al.picUrl
      }

      // initialize disc swiper
      discSwiper = new Swiper('.swiper', {
        loop: true,
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        on: {
          slideChangeTransitionEnd: function () {
            initSong(this.realIndex)
          }
        }
      })
    })
    .catch((err) => {
      console.error(err)
    })

  function initSong (index) {
    /* current song */
    const song = songs[index]

    /* header info */
    // title
    $('.header-title').text(song.name)
    // singer
    $('.header-singer').text(song.singer)

    $('.bg').css({ backgroundImage: `url(${song.picUrl})` })

    player.playMusic(index)

    /* lyric */
    // initialize song lyric
    MusicAPI.getSongLyric(song.id)
      .then((data) => {
        // clear lyric list
        $('.lyric-list').html('')
        // fill in lyric
        const lyric = parseLyric(data.lrc.lyric)
        for (const time in lyric) {
          const timestamp = formatTime(time)
          const timeStr = `${timestamp.minute}:${timestamp.second}`
          const li = $(`<li data-timestamp="${time}" data-time-second="${timeStr}">${lyric[time]}</li>`)
          $('.lyric-list').append(li)
        }
        $('.lyric-list>li:first-of-type').addClass('active')
        // fix lyric iScroll
        $('.lyric-list').height(($('.lyric-list>li').length - 1) * $('.lyric-list>li').height() + $('.lyric-bottom').height())
        lyricScroll.refresh()
      })
      .catch((err) => {
        console.error(err)
      })
  }

  // create Player instance
  const player = new Player($('audio'), songs)

  /* header */
  // back to last page
  $('.go-back').click(() => {
    window.history.back()
  })

  /* footer */
  // previous song
  $('.footer-bottom>.previous').click(function () {
    discSwiper.slideToLoop(player.getPreviousIndex(), 300, false)
    initSong(player.getPreviousIndex())
  })

  // next song
  $('.footer-bottom>.next').click(function () {
    discSwiper.slideToLoop(player.getNextIndex(), 300, false)
    initSong(player.getNextIndex())
  })

  // click list button to open modal
  $('.footer-bottom>.list').click(function () {
    $('.modal').css({ display: 'block' })

    // fill in modal list
    if ($('.modal-middle>li').length !== songs.length) {
      $('.modal-middle').html('')
      songs.forEach((song) => {
        const li = $(`<li>
                        <p>${song.name}&nbsp;<span>- ${song.singer}</span></p>
                        <img src="images/player-it666-close.png" class="delete-song" alt>
                    </li>`)
        $('.modal-middle').append(li)
      })
      $('.modal-top-left>span').text(`列表循环 (${songs.length})`)

      // click cross icon to remove song
      $('.delete-song').click(function () {
        const index = $(this).parent().index()

        // delete from session storage
        const length = deleteSong(index)

        // delete from modal
        $(this).parent().remove()

        // update song count in modal
        $('.modal-top-left>span').text(`列表循环 (${length})`)

        // update global song list
        songs = getSongs()
        ids = songs.map(song => song.id)

        // remove corresponding swiper slider
        discSwiper.removeSlide(index)

        // initialize next available song
        initSong(player.currentIndex)

        // refresh modal iScroll
        modalScroll.refresh()

        // check if all songs are removed
        if (length === 0) {
          $('.modal-top-right>.clear-all').click()
        }
      })
    }

    modalScroll.refresh()
  })

  // change play mode
  $('.footer-bottom>.play-mode').click(function () {
    switch (player.playMode) {
      // list loop
      case 'loop':
        player.playMode = 'one'
        $('.footer-bottom>.play-mode>img').attr('src', 'images/player-it666-one.png')
        break
      // single song loop
      case 'one':
        player.playMode = 'random'
        $('.footer-bottom>.play-mode>img').attr('src', 'images/player-it666-random.png')
        break
      // random play
      case 'random':
        player.playMode = 'loop'
        $('.footer-bottom>.play-mode>img').attr('src', 'images/player-it666-loop.png')
        break
      default:
        break
    }
  })

  /* song list modal */
  // modal iScroll
  const modalScroll = new IScroll('.modal-list', {
    mouseWheel: false,
    scrollbars: false
  })

  // click close to close modal
  $('.modal-bottom').click(function () {
    $('.modal').css({ display: 'none' })
  })

  // clear song list
  $('.modal-top-right>.clear-all').click(function () {
    sessionStorage.removeItem('songs')
    window.location.href = '../home/index.html'
  })

  /* main */
  // variables
  const audio = $('audio').get(0)
  let currentLyricIndex = 0
  let selectedLyricIndex = 0


  // initialize lyric iScroll
  const lyricScroll = new IScroll('.lyric-bottom', {
    mouseWheel: false,
    scrollbars: false,
    probeType: 3
  })

  // switch between default view & lyric
  $('.main-in').click(function () {
    if ($(this).hasClass('active')) {
      $(this).removeClass('active')
    } else {
      $(this).addClass('active')
      // fix lyric iScroll
      $('.lyric-list').height($('.lyric-list>li').length * $('.lyric-list>li').height())
      lyricScroll.refresh()
      lyricScroll.scrollTo(0, -currentLyricIndex * $('.lyric-list>li').height(), 200)

      // hide timeline
      $('.lyric-timeline').css({ display: 'none' })

      // remove highlight
      $('.lyric-list>li').removeClass('selected')

      $('.lyric-list').get(0).isDrag = false
    }
  })

  // play / pause music
  let firstTime = true
  player.musicCanPlay(function (duration, totalTimeStr) {
    if (!player.songInitialized) {
      player.songInitialized = true
    } else {
      return
    }

    // fill in song duration
    $('.total-time').text(totalTimeStr)

    // play button clickable
    $('.footer-bottom>.play').click(function () {
      // pause animation
      if ($(this).hasClass('active')) {
        // change to play icon
        $(this).removeClass('active')

        // pause disc animations
        $('.default-user>img').css({ transform: 'translateX(-0.627rem) rotate(-30deg)' })
        $('.disc-image').css({ animationPlayState: 'paused' })
      }
      // play / resume animation
      else {
        // change to pause icon (music playing)
        $(this).addClass('active')

        // resume disc animations
        $('.default-user>img').css({ transform: 'translateX(-0.627rem)' })
        $('.disc-image').css({ animationPlayState: 'running' })
      }

      // play / pause music
      player.playMusic(player.currentIndex)
    })

    // automatically play music if not first time
    if (firstTime) {
      firstTime = false
      return
    }
    $('.footer-bottom>.play').click()
  })

  // music end
  player.musicEnded(function (index) {
    discSwiper.slideToLoop(index, 300, false)
    initSong(index)
  })

  /* music progress bar */
  // initialize music progress bar
  const musicProgressBar = new Progress($('.progress-bar'), $('.progress-line'), $('.progress-dot'))
  musicProgressBar.progressClick(function (value) {
    player.musicJumpTo(value)
  })
  musicProgressBar.progressMove(false, function (value) {
    player.musicJumpTo(value)
  })

  // progress bar in sync with music
  player.musicTimeUpdate(function (currentTime, duration, currentTimeStr) {
    // set current time text
    $('.current-time').text(currentTimeStr)
    // sync progress bar
    musicProgressBar.setProgress(currentTime / duration)
  })

  /* volume bar */
  // initialize volume bar
  const volumeBar = new Progress($('.volume-progress-bar'), $('.volume-progress-line'), $('.volume-progress-dot'))
  volumeBar.progressClick(function (value) {
    player.setVolume(value)
    volumeBar.setProgress(value)
  })
  volumeBar.progressMove(false, function (value) {
    player.setVolume(value)
    volumeBar.setProgress(value)
  })

  // mute / unmute button (trumpet) handler
  $('.lyric-top>img').click(function () {
    const volume = player.getVolume()
    if (volume !== 0) {
      player.setVolume(0)
      volumeBar.setProgress(0)
    } else {
      player.setVolume(player.defaultVolume)
      volumeBar.setProgress(player.defaultVolume)
    }

    // stop propagation
    return false
  })

  /* Lyric */
  // lyric in sync with music
  player.musicTimeUpdate(function (currentTime) {
    currentTime = currentTime.toFixed(3) * 1000
    const lyrics = $('.lyric-list>li')
    lyrics.each(function (index, lyric) {
      if (index === lyrics.length - 1) {
        currentLyricIndex = index
        // toggle highlight
        $(this).addClass('active').siblings().removeClass('active')

        return false
      }

      if (currentTime >= lyric.dataset.timestamp && currentTime < lyrics.get(index + 1).dataset.timestamp) {
        if (currentLyricIndex !== index) {
          currentLyricIndex = index
          // toggle highlight
          $(this).addClass('active').siblings().removeClass('active')
        }

        return false
      }
    })

    // scroll to current lyric
    if (!$('.lyric-list').get(0).isDrag) {
      lyricScroll.scrollTo(0, -currentLyricIndex * $('.lyric-list>li').height(), 200)
    }
  })

  // lyric scroll
  $('.lyric-list').on('touchstart', function () {
    $('.lyric-list').get(0).isDrag = true
  })

  // jump to current lyric
  $('.lyric-timeline>img').click(function () {
    // jump music to current lyric's timestamp
    audio.currentTime = $('.lyric-list>li').get(selectedLyricIndex).dataset.timestamp / 1000
    if (!$('.footer-bottom>.play').hasClass('active')) {
      $('.footer-bottom>.play').click()
    }

    // hide timeline
    $('.lyric-timeline').css({ display: 'none' })

    // remove highlight
    $('.lyric-list>li').removeClass('selected')

    $('.lyric-list').get(0).isDrag = false

    // stop propagation
    return false
  })

  let reSyncLyric = null

  lyricScroll.on('scroll', function () {
    if ($('.lyric-list').get(0).isDrag) {
      if (reSyncLyric) {
        clearTimeout(reSyncLyric)
      }

      // show timeline
      $('.lyric-timeline').css({ display: 'flex' })
    }

    // calculate selected lyric index
    let index = Math.round((this.y) / $('.lyric-list>li').height())
    index = index > 0 ? 0 : Math.abs(index)
    index = index < -($('.lyric-list>li').length - 1) ? -($('.lyric-list>li').length - 1) : Math.abs(index)
    index = index > $('.lyric-list>li').length - 1 ? $('.lyric-list>li').length - 1 : index

    if (index === 0 && selectedLyricIndex !== index || index && selectedLyricIndex !== index) {
      selectedLyricIndex = index

      // highlight lyric on the line
      $('.lyric-list>li').eq(selectedLyricIndex).addClass('selected').siblings().removeClass('selected')

      // change timestamp
      $('.lyric-timeline>span').text($('.lyric-list>li').get(selectedLyricIndex).dataset.timeSecond)
    }
  })

  lyricScroll.on('scrollEnd', function () {
    // snap to each line or lyric
    this.scrollTo(0, Math.round(this.y / $('.lyric-list>li').height()) * $('.lyric-list>li').height())

    // re-sync lyric with music
    if ($('.lyric-list').get(0).isDrag) {
      reSyncLyric = setTimeout(() => {
        // hide timeline
        $('.lyric-timeline').css({ display: 'none' })

        // remove highlight
        $('.lyric-list>li').removeClass('selected')

        $('.lyric-list').get(0).isDrag = false
      }, 2000)
    }
  })

  function parseLyric (str) {
    // split lyric string into Array
    const lyrics = str.split('\n')
    // get rid of the last empty string
    lyrics.pop()

    // regular expression for timestamp
    const timestampRegex = /\[\d*:\d*\.\d*]/g
    const minuteRegex = /\[\d*/i
    const secondRegex = /:\d*/i
    const milliSecondRegex = /\d*]/i

    // lyric object to be returned
    const lyricObj = {}

    for (const lyric of lyrics) {
      /* time stamp */
      // get timestamp string
      const timeStamp = lyric.match(timestampRegex)[0]
      // get minute
      const minute = timeStamp.match(minuteRegex)[0].substring(1)
      // get second
      const second = timeStamp.match(secondRegex)[0].substring(1)
      // get millisecond
      const milliSecond = timeStamp.match(milliSecondRegex)[0].slice(0, -1)
      // convert timestamp  milliseconds
      const time = parseInt(minute) * 60 * 1000 + parseInt(second) * 1000 + parseInt(milliSecond)

      /* fill lyric into object */
      lyricObj[time] = lyric.replace(timestampRegex, '').trim()
    }

    return lyricObj
  }
})