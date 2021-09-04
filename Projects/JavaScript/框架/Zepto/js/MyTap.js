(function (window) {
  function Tap(dom, fn) {
    // return if dom is not a DOM Element
    if (!dom instanceof HTMLElement) {
      throw new Error(`${dom} is not a DOM Element.`)
    }

    let startX = 0
    let startY = 0
    let startTime = 0

    dom.ontouchstart = function (event) {
      // return if more than one finger is pressed
      if (event.targetTouches.length > 1) {
        return
      }
      // get finger position
      startX = event.targetTouches[0].clientX
      startY = event.targetTouches[0].clientY
      // set time on press down
      startTime = Date.now()
    }
    dom.ontouchend = function (event) {
      // return if more than one finger raised up
      if (event.changedTouches.length > 1) {
        return
      }
      // return if finger moved more than 5px
      let endX = event.changedTouches[0].clientX
      let endY = event.changedTouches[0].clientY
      if (Math.abs(endX - startX) > 5 || Math.abs(endY - startY)) {
        return
      }
      // return if time during finger on screen is more than 50ms
      if ((Date.now() - startTime) > 100) {
        return
      }
      fn && fn();
    }
  }

  window.Tap = Tap
})(window)