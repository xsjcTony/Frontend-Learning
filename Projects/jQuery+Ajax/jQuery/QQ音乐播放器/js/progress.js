(function (window) {
  function Progress($progressBar, $progressLine, $progressDot) {
    return new Progress.prototype.init($progressBar, $progressLine, $progressDot);
  }

  Progress.prototype = {
    constructor: Progress,
    init: function ($progressBar, $progressLine, $progressDot) {
      this.$progressBar = $progressBar;
      this.$progressLine = $progressLine;
      this.$progressDot = $progressDot;
    },
    isMoving: false,
    progressClick: function (callback) {
      let self = this;
      this.$progressBar.click(function (event) {
        let offsetX = event.pageX - self.$progressBar.offset().left;
        offsetX = (offsetX > self.$progressBar.width()) ? self.$progressBar.width() : offsetX;
        offsetX = (offsetX < 0) ? 0 : offsetX;
        self.$progressLine.css({
          width: offsetX
        });

        // calculate current time / duration ratio
        let ratio = offsetX / $(this).width();
        callback(ratio);
      });
    },
    progressMove: function (callback) {
      let self = this;
      let offsetX = 0;
      this.$progressBar.mousedown(function () {
        self.isMoving = true;
        $(document).mousemove(function (event) {
          offsetX = event.pageX - self.$progressBar.offset().left;
          offsetX = (offsetX > self.$progressBar.width()) ? self.$progressBar.width() : offsetX;
          offsetX = (offsetX < 0) ? 0 : offsetX;
          self.$progressLine.css({
            width: offsetX
          });
        });
        $(document).mouseup(function () {
          $(this).off("mousemove");
          self.isMoving = false;
          // calculate current time / duration ratio
          let ratio = offsetX / self.$progressBar.width();
          callback(ratio);
          $(this).off("mouseup");
        });
      });
    },
    setProgress: function (value) {
      if(this.isMoving || value < 0 || value > 100) {
        return;
      }
      this.$progressLine.css({
        width: `${value}%`
      });
    }
  };

  Progress.prototype.init.prototype = Progress.prototype;
  window.Progress = Progress;
})(window);