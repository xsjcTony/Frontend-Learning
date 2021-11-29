<template>
    <div class="player-top">
        <div ref="playMode" class="top-mode-icon list-loop" @click="changePlayMode"></div>
        <p v-if="playModeType === 0" class="top-mode">列表循环</p>
        <p v-else-if="playModeType === 1" class="top-mode">单曲循环</p>
        <p v-else-if="playModeType === 2" class="top-mode">随机播放</p>
        <div class="top-delete" @click="deleteAllSongs"></div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import modeType from '../../store/playModeType'

export default {
  name: 'ListPlayerTop',
  computed: {
    ...mapGetters([
      'playModeType'
    ])
  },

  watch: {
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
    }
  },

  methods: {
    ...mapActions([
      'setPlayModeType',
      'deleteSongs'
    ]),

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

    deleteAllSongs () {
      this.deleteSongs()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin';

.player-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100px;
    padding-left: 20px;
    box-sizing: border-box;

    .top-mode-icon {
        width: 56px;
        height: 56px;
        margin-right: 20px;

        &.list-loop {
            @include bg_img('../../assets/images/small_loop');
        }

        &.single-loop {
            @include bg_img('../../assets/images/small_one');
        }

        &.random {
            @include bg_img('../../assets/images/small_shuffle');
        }
    }

    .top-mode {
        @include font_color();
        @include font_size($font_medium_s);
        flex: 1 1 auto;
    }

    .top-delete {
        width: 84px;
        height: 84px;
        @include bg_img('../../assets/images/small_del');
    }
}
</style>
