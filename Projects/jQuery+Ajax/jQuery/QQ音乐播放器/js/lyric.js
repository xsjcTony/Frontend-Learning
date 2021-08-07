(function (window) {
  function Lyric(path) {
    return new Lyric.prototype.init(path);
  }

  Lyric.prototype = {
    constructor: Lyric,
    init: function (path) {
      this.path = path;
    },
    times: [],
    lyrics: [],
    loadLyric: function (callback) {
      let self = this;
      $.ajax({
        url: self.path,
        dataType: "text",
        success: function (data) {
          self.parseLyric(data);
          callback();
        },
        error: function (error) {
          console.log(error);
        }
      });
    },
    parseLyric: function (data) {
      // clear previous data
      this.times = [];
      this.lyrics = [];

      let self = this;

      let array = data.split("\r\n");
      let timeReg = /\[(\d+:\d+\.\d+)]/;

      // traverse to get each line
      $.each(array, function (index, element) {
        // lyric
        let lyric = element.split("]")[1];
        if(lyric.length === 0) {
          return true; // continue $.each loop
        }
        self.lyrics.push(lyric);

        // time
        let res = timeReg.exec(element);
        if(res === null) {
          return true; // continue $.each loop
        }
        let res2 = res[1].split(":");
        let time = parseFloat((parseInt(res2[0]) * 60 + parseFloat(res2[1])).toFixed(2));
        self.times.push(time);
      });
    },
    currentIndex: function (currentTime) {
      let currentIndex = 0;
      for(let i = 0; i < this.times.length; i++) {
        if(currentTime >= this.times[i] && currentTime < this.times[i + 1]) {
          currentIndex = i;
          break;
        }
      }
      return currentIndex;
    }
  };

  Lyric.prototype.init.prototype = Lyric.prototype;
  window.Lyric = Lyric;
})(window);