;(function (window) {
  class Player {
    constructor ($audio, songs) {
      this.$audio = $audio
      this.audio = $audio.get(0)
      this.songs = songs
      this.defaultVolume = 0.5
      this.audio.volume = this.defaultVolume
      this.currentIndex = -1
      this.songInitialized = false
      this.playMode = 'loop'
    }

    musicTimeUpdate (callback) {
      const self = this
      this.$audio.on('timeupdate', function () {
        const currentTime = self.audio.currentTime
        const duration = self.audio.duration

        const currentTimeObj = formatTime(currentTime * 1000)
        const currentTimeStr = `${currentTimeObj.minute}:${currentTimeObj.second}`

        callback(currentTime, duration, currentTimeStr)
      })
    }

    musicJumpTo (value) {
      if (!value) { return }
      value = value < 0 ? 0 : value
      value = value > 1 ? 1 : value

      this.audio.currentTime = value * this.audio.duration
    }

    getVolume () {
      return this.audio.volume
    }

    setVolume (value) {
      if (value !== 0 && !value) { return }
      value = value < 0 ? 0 : value
      value = value > 1 ? 1 : value

      this.audio.volume = value

      if (value !== 0) {
        this.defaultVolume = value
      }
    }

    musicCanPlay (callback) {
      const self = this
      this.$audio.on('canplay', function () {
        const duration = self.audio.duration

        const totalTimeObj = formatTime(duration * 1000)
        const totalTimeStr = `${totalTimeObj.minute}:${totalTimeObj.second}`

        callback(duration, totalTimeStr)
      })
    }

    playMusic (index) {
      // playing current song
      if (index === this.currentIndex) {
        if (this.audio.paused) {
          this.audio.play()
        } else {
          this.audio.pause()
        }
      }
      // playing another song
      else {
        this.currentIndex = index

        /* audio */
        const self = this

        MusicAPI.getSongUrl(self.songs[index].id)
          .then((data) => {
            // add new song
            const source = $(`<source src="${data.data[0].url}" type="audio/${data.data[0].type}">`)
            self.$audio.html(source)

            // refresh progress bar
            $('.progress-line').css({ width: 0 })

            // reset play / pause button
            $('.footer-bottom>.play').removeClass('active')
            $('.footer-bottom>.play').off('click')
            // pause disc animations
            $('.default-user>img').css({ transform: 'translateX(-0.627rem) rotate(-30deg)' })
            $('.disc-image').css({ animationPlayState: 'paused' })

            // refresh audio
            $('.total-time').text('00:00')
            self.songInitialized = false
            self.audio.load()
          })
          .catch((err) => {
            console.error(err)
          })
      }
    }

    musicEnded (callback) {
      const self = this
      let index = -1

      this.$audio.on('ended', function () {
        switch (self.playMode) {
          case 'loop':
            index = self.getNextIndex()
            break
          case 'one':
            index = self.currentIndex
            break
          case 'random':
            do {
              index = getRandomInt(0, self.songs.length)
            }
            while (index === self.currentIndex)
            break
          default:
            break
        }

        callback(index)
      })
    }

    getNextIndex () {
      let index = this.currentIndex
      index++
      return index > this.songs.length - 1 ? 0 : index
    }

    getPreviousIndex () {
      let index = this.currentIndex
      index--
      return index < 0 ? this.songs.length - 1 : index
    }
  }

  window.Player = Player
})(window)