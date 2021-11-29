<template>
    <div class="player">
        <NormalPlayer :current-time="currentTime" :total-time="totalTime"/>
        <MiniPlayer/>
        <ListPlayer/>
        <audio ref="audio"
               :src="currentSong.url"
               @timeupdate="timeUpdate"
               @ended="musicEnded"
        ></audio>
    </div>
</template>

<script>
import NormalPlayer from '../components/Player/NormalPlayer.vue'
import MiniPlayer from '../components/Player/MiniPlayer.vue'
import ListPlayer from '../components/Player/ListPlayer.vue'
import { mapActions, mapGetters } from 'vuex'
import playModeType from '../store/playModeType'
import {
  getRandomIntInclusive,
  setLocalStorage,
  getLocalStorage
} from '../utils'

export default {
  name: 'MusicPlayer',

  components: {
    NormalPlayer,
    MiniPlayer,
    ListPlayer
  },

  data () {
    return {
      totalTime: 0,
      currentTime: 0
    }
  },

  computed: {
    ...mapGetters([
      'isMusicPlaying',
      'currentSong',
      'songCurrentTime',
      'playModeType',
      'currentSongIndex',
      'songs',
      'favouriteSongs',
      'playHistory'
    ])
  },

  watch: {
    isMusicPlaying (newValue) {
      if (newValue) {
        this.setHistorySong(this.currentSong)
        this.$refs.audio.play()
      } else {
        this.$refs.audio.pause()
      }
    },

    currentSong (newValue) {
      this.totalTime = 0
      this.currentTime = 0

      if (this.isMusicPlaying) {
        this.setHistorySong(newValue)
      }

      // 在iOS的safari中, 系统不会自动加载歌曲, 所以oncanplay不会自动触发, PC和安卓会自动加载, 需要使用ondurationchange监听
      this.$refs.audio.ondurationchange = () => {
        this.totalTime = this.$refs.audio.duration

        if (this.isMusicPlaying) {
          this.$refs.audio.play()
        } else {
          this.$refs.audio.pause()
        }
      }
    },

    songCurrentTime (newValue) {
      if (newValue <= this.totalTime) {
        this.$refs.audio.currentTime = newValue
      }
    },

    /**
     * @description Store new favourite songs' list in Vuex into Local Storage in case the window is closed.
     * @param {Array} newValue
     */
    favouriteSongs (newValue) {
      setLocalStorage('favouriteSongs', newValue)
    },

    /**
     * @description Store new history list in Vuex into Local Storage in case the window is closed.
     * @param {Array} newValue
     */
    playHistory (newValue) {
      setLocalStorage('playHistory', newValue)
    }
  },

  created () {
    // Load favourite songs' list from Local Storage
    this.setFavouriteSongList(getLocalStorage('favouriteSongs') ?? [])
    // Load history list from Local Storage
    this.setHistorySongList(getLocalStorage('playHistory') ?? [])
  },

  methods: {
    ...mapActions([
      'setSongIndex',
      'setFavouriteSongList',
      'setHistorySong',
      'setHistorySongList'
    ]),

    timeUpdate (event) {
      this.currentTime = event.target.currentTime
    },

    /**
     * @description Change to next music based on play mode when current music has ended.
     */
    musicEnded () {
      switch (this.playModeType) {
        case playModeType.listLoop:
          this.setSongIndex(this.currentSongIndex + 1)
          break
        case playModeType.singleLoop:
          this.$refs.audio.play()
          break
        case playModeType.random:
          let index

          do {
            index = getRandomIntInclusive(0, this.songs.length - 1)
          } while (index === this.currentSongIndex)

          this.setSongIndex(index)
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
