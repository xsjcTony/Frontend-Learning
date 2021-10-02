;(function (window) {
  class Progress {
    constructor ($progressBar, $progressLine, $progressDot) {
      this.$progressBar = $progressBar
      this.$progressLine = $progressLine
      this.$progressDot = $progressDot
      this.isMoving = false
    }

    progressClick (callback) {
      let self = this
      this.$progressBar.click(function (event) {
        let offsetX = event.pageX - self.$progressBar.offset().left
        offsetX = (offsetX > self.$progressBar.width()) ? self.$progressBar.width() : offsetX
        offsetX = (offsetX < 0) ? 0 : offsetX
        self.$progressLine.css({
          width: offsetX
        })

        // calculate current time / duration ratio
        let ratio = offsetX / $(this).width()
        callback(ratio)

        return false
      })
    }

    progressMove (isPC, callback) {
      const downEvent = isPC ? 'mousedown' : 'touchstart'
      const moveEvent = isPC ? 'mousemove' : 'touchmove'
      const upEvent = isPC ? 'mouseup' : 'touchend'

      let self = this
      let offsetX = 0
      this.$progressBar.on(downEvent, function () {
        self.isMoving = true
        $(document).on(moveEvent, function (event) {
          offsetX = isPC ? event.pageX - self.$progressBar.offset().left : event.targetTouches[0].pageX - self.$progressBar.offset().left
          offsetX = (offsetX > self.$progressBar.width()) ? self.$progressBar.width() : offsetX
          offsetX = (offsetX < 0) ? 0 : offsetX
          self.$progressLine.css({
            width: offsetX
          })
        })
        $(document).on(upEvent, function () {
          $(this).off(moveEvent)
          self.isMoving = false
          // calculate current time / duration ratio
          let ratio = offsetX / self.$progressBar.width()
          callback(ratio)
          $(this).off(upEvent)
        })
      })
    }

    setProgress (value) {
      if (this.isMoving || value < 0 || value > 1) {
        return
      }
      this.$progressLine.css({
        width: `${value * 100}%`
      })
    }
  }

  window.Progress = Progress
})(window)