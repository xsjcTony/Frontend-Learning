<template>
    <div class="player-bottom">
        <div class="bottom-progress">
            <span>{{ formattedCurrentTime }}</span>
            <div ref="progressBar" class="progress-bar" @click="jumpTo">
                <div class="progress-line" :style="{ width: `${ progressBarRatio }%` }">
                    <div class="progress-dot"></div>
                </div>
            </div>
            <span>{{ formattedTotalTime }}</span>
        </div>
        <div class="bottom-control">
            <div ref="playMode" class="mode list-loop" @click="changePlayMode"></div>
            <div class="previous" @click="previousSong"></div>
            <div ref="playButton" class="play" @click="play"></div>
            <div class="next" @click="nextSong"></div>
            <div class="favourite"
                 :class="{ active: isFavourite(currentSong) }"
                 @click="favouriteSong(currentSong)"
            ></div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import modeType from '../../store/playModeType'
import { formatTime } from '../../utils'

export default {
  name: 'NormalPlayerBottom',
  props: {
    totalTime: {
      type: Number,
      'default': 0,
      required: true
    },

    currentTime: {
      type: Number,
      'default': 0,
      required: true
    }
  },

  data () {
    return {
      formattedTotalTime: '00:00',
      formattedCurrentTime: '00:00',
      progressBarRatio: 0
    }
  },

  computed: {
    ...mapGetters([
      'isMusicPlaying',
      'playModeType',
      'currentSongIndex',
      'currentSong',
      'favouriteSongs'
    ])
  },

  watch: {
    isMusicPlaying (newValue) {
      if (newValue) {
        this.$refs.playButton.classList.add('active')
      } else {
        this.$refs.playButton.classList.remove('active')
      }
    },

    playModeType (newValue) {
      switch (newValue) {
        case modeType.listLoop:
          this.$refs.playMode.classList.remove('random')
          this.$refs.playMode.classList.add('list-loop')
          break
        case modeType.singleLoop:
          this.$refs.playMode.classList.remove('list-loop')
          this.$refs.playMode.classList.add('single-loop')
          break
        case modeType.random:
          this.$refs.playMode.classList.remove('single-loop')
          this.$refs.playMode.classList.add('random')
          break
        default:
          break
      }
    },

    // * format song's duration to "00:00" upon changed
    totalTime (newValue) {
      const time = formatTime(newValue)
      this.formattedTotalTime = `${ time.minute }:${ time.second }`
    },

    // * format song's current time to "00:00" upon changed, calculate progress bar's percentage
    currentTime (newValue) {
      // format time
      const res = formatTime(newValue)
      this.formattedCurrentTime = `${ res.minute }:${ res.second }`

      // calculate progress bar's percentage
      const ratio = newValue / this.totalTime * 100
      this.progressBarRatio = Number.isNaN(ratio) ? 0 : ratio
    }
  },

  methods: {
    ...mapActions([
      'setMusicPlaying',
      'setPlayModeType',
      'setSongIndex',
      'setSongCurrentTime',
      'setFavouriteSong',
      'deleteFavouriteSongs'
    ]),

    play () {
      this.setMusicPlaying(!this.isMusicPlaying)
    },

    changePlayMode () {
      switch (this.playModeType) {
        case modeType.listLoop:
          this.setPlayModeType(modeType.singleLoop)
          break
        case modeType.singleLoop:
          this.setPlayModeType(modeType.random)
          break
        case modeType.random:
          this.setPlayModeType(modeType.listLoop)
          break
        default:
          break
      }
    },

    previousSong () {
      this.setSongIndex(this.currentSongIndex - 1)
    },

    nextSong () {
      this.setSongIndex(this.currentSongIndex + 1)
    },

    jumpTo (event) {
      const progressBarWidth = this.$refs.progressBar.offsetWidth
      let clickPositionLeft = event.pageX - this.$refs.progressBar.offsetLeft

      clickPositionLeft = clickPositionLeft < 0 ? 0 :
        clickPositionLeft > progressBarWidth ? progressBarWidth : clickPositionLeft

      const ratio = clickPositionLeft / progressBarWidth

      // set progress bar to clicked position
      this.progressBarRatio = ratio * 100

      // set current time based on ratio and song total time
      const currentTime = this.totalTime * ratio
      this.setSongCurrentTime(currentTime)
    },

    /**
     * @description Add / Remove current song to / from favourite songs' list in Vuex.
     * @param {Object} song - The song to be added / removed to / from list.
     */
    favouriteSong (song) {
      if (this.isFavourite(song)) {
        this.deleteFavouriteSongs(song)
      } else {
        this.setFavouriteSong(song)
      }
    },

    /**
     * @description Check if the song is in favourite songs' list in Vuex.
     * @param {Object} song - The song to be checked.
     * @return {boolean} - True if included, False otherwise.
     */
    isFavourite (song) {
      return this.favouriteSongs.some(currentSong => currentSong.id === song.id)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin';

.player-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;

    .bottom-progress {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 80%;
        margin: 0 auto;

        span {
            @include font_size($font_small);
            @include font_color();
        }

        .progress-bar {
            width: 100%;
            height: 10px;
            margin: 0 20px;
            background: #fff;

            .progress-line {
                position: relative;
                width: 0;
                height: 100%;
                background: #ccc;

                .progress-dot {
                    position: absolute;
                    top: 50%;
                    right: 0;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: #fff;
                    transform: translate(50%, -50%);
                }
            }
        }
    }

    .bottom-control {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 80%;
        margin: 0 auto;
        padding: 50px 0;

        div {
            width: 84px;
            height: 84px;
        }

        .mode {
            &.list-loop {
                @include bg_img('../../assets/images/loop');
            }

            &.single-loop {
                @include bg_img('../../assets/images/one');
            }

            &.random {
                @include bg_img('../../assets/images/shuffle')
            }
        }

        .previous {
            @include bg_img('../../assets/images/prev');
        }

        .play {
            @include bg_img('../../assets/images/play');

            &.active {
                @include bg_img('../../assets/images/pause');
            }
        }

        .next {
            @include bg_img('../../assets/images/next');
        }

        .favourite {
            @include bg_img('../../assets/images/un_favorite');

            &.active {
                @include bg_img('../../assets/images/favorite');
            }
        }
    }
}
</style>
