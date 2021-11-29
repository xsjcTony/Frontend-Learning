<template>
    <transition :css="false" @enter="enter" @leave="leave">
        <div v-show="isNormalPlayerShow" class="normal-player">
            <div class="player-wrapper">
                <NormalPlayerHeader/>
                <NormalPlayerMiddle :current-time="currentTime"/>
                <NormalPlayerBottom :total-time="totalTime" :current-time="currentTime"/>
            </div>
            <div class="player-background">
                <img :src="currentSong.picUrl" alt>
            </div>
        </div>
    </transition>
</template>

<script>
import NormalPlayerHeader from './NormalPlayerHeader.vue'
import NormalPlayerMiddle from './NormalPlayerMiddle.vue'
import NormalPlayerBottom from './NormalPlayerBottom.vue'
import { mapActions, mapGetters } from 'vuex'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'

export default {
  name: 'NormalPlayer',
  components: {
    NormalPlayerHeader,
    NormalPlayerMiddle,
    NormalPlayerBottom
  },

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

  computed: {
    ...mapGetters([
      'isNormalPlayerShow',
      'currentSong'
    ])
  },

  watch: {
    currentSong (newValue) {
      if (newValue.id !== undefined) {
        this.getSongLyric(newValue.id)
      }
    }
  },

  methods: {
    ...mapActions([
      'getSongLyric'
    ]),

    enter (el, done) {
      // eslint-disable-next-line new-cap
      Velocity(el, 'transition.shrinkIn', { duration: 500 }, () => {
        done()
      })
    },

    leave (el, done) {
      // eslint-disable-next-line new-cap
      Velocity(el, 'transition.shrinkOut', { duration: 500 }, () => {
        done()
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/css/mixin';

.normal-player {
    position: fixed;
    inset: 0;
    @include bg_sub_color();
    z-index: 2999;

    .player-wrapper {
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 9;
    }

    .player-background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000;

        img {
            height: 100%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            filter: blur(5px);
            opacity: 0.5;
        }
    }
}
</style>
