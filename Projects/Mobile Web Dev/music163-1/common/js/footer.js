$(function () {
  /* footer */
  // monitor footer onclick
  const pageArray = ['home', 'video', 'me', 'friend', 'account']
  $('.footer-in>ul>li').click(function () {
    const currentName = pageArray[$(this).index()]

    // change style
    $(this).addClass('active').siblings().removeClass('active')
    let url = $(this).find('img').attr('src')
    url = url.replace('normal', 'selected')
    $(this).find('img').attr('src', url)
    $(this).siblings().find('img').forEach(function (img) {
      img.src = img.src.replace('selected', 'normal')
    })

    // change header
    $('.header-in').removeClass().addClass('header-in ' + currentName)
  })

  // change header and footer based on page
  let hash = window.location.hash.substr(1)
  hash = hash || 'home'
  $(`.${hash}`).triggerHandler('click')
})