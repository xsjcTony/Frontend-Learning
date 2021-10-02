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

})