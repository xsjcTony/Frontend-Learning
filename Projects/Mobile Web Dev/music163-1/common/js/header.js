$(function () {
  /* header */
  let isTyping = false

  // monitor header search bar onfocus
  $('.header-center-wrapper>input').focus(function () {
    $('.header-in').addClass('active')
    $('.header-container').show()
    if (!isTyping) {
      $('.search-ad').show()
      $('.search-history').show()
      $('.search-hot').show()
      $('.search-current').hide()
      initSearchList()
    }
  })

  // monitor cancel button onclick
  $('.header-cancel').click(function () {
    isTyping = false
    $('.header-in').removeClass('active')
    $('.header-center-wrapper>input').val('')
    $('.header-container').hide()
  })

  // monitor header friend switch onclick
  $('.header-switch>span').click(function () {
    $('.header-switch>i').animate({ left: this.offsetLeft }, 100)
    $(this).addClass('active').siblings().removeClass('active')
  })

  // header => search
  // initialize iScroll
  const searchScroll = new IScroll('.header-container', {
    mouseWheel: false,
    scrollbars: false,
    probeType: 3
  })

  function initSearchList () {
    // monitor close ad button onclick
    $('.search-ad>span').click(function () {
      $('.search-ad').remove()
      // fix iScroll
      searchScroll.refresh()
      searchScroll.maxScrollY -= ($('.header-default').height() + $('.footer-in').height())
    })

    // initialize search history
    generateSearchHistory()

    // monitor clear search history onclick
    $('.history-top>img').click(function () {
      localStorage.removeItem('history')
      $('.history-bottom').html('')
      $('.search-history').hide()
      // fix iScroll
      searchScroll.refresh()
      searchScroll.maxScrollY -= ($('.header-default').height() + $('.footer-in').height())
    })

    // initialize trending topic
    HomeAPI.getTrending()
      .then((data) => {
        // add trending topics
        const html = template('trending_topic', data)
        $('.hot-bottom').html(html)
        // fix iScroll
        searchScroll.refresh()
        searchScroll.maxScrollY -= ($('.header-default').height() + $('.footer-in').height())
      })
      .catch((err) => {
        console.error(err)
      })
  }

  function getSearchHistory () {
    const history = localStorage.getItem('history')

    if (!history) {
      return []
    }

    return JSON.parse(history)
  }

  function generateSearchHistory () {
    const history = getSearchHistory()

    if (!history || history.length === 0) {
      $('.search-history').hide()
    } else {
      $('.search-history').show()

      // generate search history elements
      $('.history-bottom').html('')
      for (const item of history) {
        const li = $(`<li>${item}</li>`)
        $('.history-bottom').append(li)
      }

      // click to search handler
      $('.history-bottom>li').click(function () {
        setSearchHistory($(this).text().trim())
      })
    }

    // fix iScroll
    searchScroll.refresh()
    searchScroll.maxScrollY -= ($('.header-default').height() + $('.footer-in').height())
  }

  // search suggestion
  $('.header-center-wrapper>input').on('input', throttle(function () {
    if ($(this).val().length === 0) {
      isTyping = false
      $('.search-ad').show()
      $('.search-hot').show()
      $('.search-current').hide()
      initSearchList()
    } else {
      isTyping = true
      const input = $(this).val().trim()
      $('.search-ad').hide()
      $('.search-history').hide()
      $('.search-hot').hide()
      $('.search-current').show()
      // generate data
      $('.current-top').html(`搜索 "${input}"`)
      HomeAPI.getSearchSuggest(input)
        .then((data) => {
          $('.current-bottom').html('')
          if (data.result?.allMatch) {
            data.result.allMatch.forEach((item) => {
              $('.current-bottom').append($(`
                <li>
                    <img src="../common/images/topbar-it666-search.png" alt>
                    <p>${item.keyword}</p>
                </li>
              `))
            })
          }

          // click to search handler
          $('.current-bottom>li').click(function () {
            setSearchHistory($(this).text().trim())
          })

          // fix iScroll
          searchScroll.refresh()
          searchScroll.maxScrollY -= ($('.header-default').height() + $('.footer-in').height())
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }, 1000))

  // click to search handler
  $('.current-top').click(function () {
    setSearchHistory($('.header-center-wrapper>input').val().trim())
  })

  function setSearchHistory(keywords) {
    let history = getSearchHistory()

    if (history.includes(keywords)) {
      history.splice(history.indexOf(keywords), 1)
    }

    history.unshift(keywords)
    localStorage.setItem('history', JSON.stringify(history))
    window.location.href = '../searchDetail/index.html?keywords=' + keywords
  }
})