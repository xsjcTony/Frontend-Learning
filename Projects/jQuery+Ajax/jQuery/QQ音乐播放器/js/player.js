(function (window) {
  function Player($audio) {
    return new Player.prototype.init($audio);
  }

  Player.prototype = {
    constructor: Player,
    musicList: [],
    init: function ($audio) {
      this.$audio = $audio;
      this.audio = $audio.get(0);
      this.audio.volume = 0.5;
    },
    currentIndex: -1,
    playMusic: function (index, music) {
      // check whether clicked on the same music
      if(this.currentIndex === index) {
        // same music clicked
        if(this.audio.paused) {
          // paused
          this.audio.play();
        }
        else {
          // playing
          this.audio.pause();
        }
      }
      else {
        // another music clicked
        this.$audio.attr("src", music.link_url);
        this.audio.play();
        this.currentIndex = index;
      }
    },
    previousIndex: function () {
      let index = this.currentIndex - 1;
      if(index < 0) {
        index = this.musicList.length - 1;
      }
      return index;
    },
    nextIndex: function () {
      let index = this.currentIndex + 1;
      if(index > this.musicList.length - 1) {
        index = 0;
      }
      return index;
    },
    changeMusic: function (index) {
      this.musicList.splice(index, 1);
      if(index < this.currentIndex) {
        this.currentIndex--;
      }
    },
    musicTimeUpdate: function (callback) {
      let self = this;
      this.$audio.on("timeupdate", function () {
        let duration = self.audio.duration;
        let currentTime = self.audio.currentTime;
        callback(currentTime, duration, self.formatTime(currentTime, duration));
      });
    },
    formatTime: function (currentTime, duration) {
      let durationMin = Math.floor(duration / 60);
      let durationSec = Math.floor(duration % 60);
      durationMin = (durationMin < 10) ? "0" + durationMin : durationMin;
      durationSec = (durationSec < 10) ? "0" + durationSec : durationSec;

      let currentMin = Math.floor(currentTime / 60);
      let currentSec = Math.floor(currentTime % 60);
      currentMin = (currentMin < 10) ? "0" + currentMin : currentMin;
      currentSec = (currentSec < 10) ? "0" + currentSec : currentSec;

      return `${currentMin}:${currentSec} / ${durationMin}:${durationSec}`;
    },
    musicJumpTo: function (ratio) {
      this.audio.currentTime = this.audio.duration * ratio;
    },
    musicVolumeSetTo: function (value) {
      this.audio.volume = value;
      if(value === 0) {
        $(".music-volume-icon").addClass("music-volume-icon2")
      }
      else {
        $(".music-volume-icon").removeClass("music-volume-icon2")
      }
    }
  };

  Player.prototype.init.prototype = Player.prototype;
  window.Player = Player;
})(window);