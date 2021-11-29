<template>
    <transition :css="false" @enter="enter" @leave="leave">
        <div v-show="isListPlayerShow" class="list-player">
            <div class="player-wrapper">
                <ListPlayerTop/>
                <ListPlayerMiddle/>
                <div class="player-bottom" @click.stop="hideListPlayer">
                    <p>关闭</p>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import ListPlayerTop from './ListPlayerTop.vue'
import ListPlayerMiddle from './ListPlayerMiddle.vue'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ListPlayer',
  components: {
    ListPlayerTop,
    ListPlayerMiddle
  },

  computed: {
    ...mapGetters([
      'isListPlayerShow'
    ])
  },

  methods: {
    ...mapActions([
      'setListPlayerShow',
      'setMiniPlayerShow'
    ]),

    hideListPlayer () {
      this.setListPlayerShow(false)
      this.setMiniPlayerShow(true)
    },

    enter (el, done) {
      // eslint-disable-next-line new-cap
      Velocity(el, 'transition.slideUpIn', { duration: 500 }, () => {
        done()
      })
    },

    leave (el, done) {
      // eslint-disable-next-line new-cap
      Velocity(el, 'transition.slideDownOut', { duration: 500 }, () => {
        done()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin';

.list-player {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 2999;
    width: 100%;
    @include bg_sub_color();

    .player-wrapper {
        width: 100%;

        .player-bottom {
            width: 100%;
            height: 100px;
            @include bg_color();

            p {
                text-align: center;
                line-height: 100px;
                @include font_size($font_medium);
                color: #fff;
            }
        }
    }
}
</style>
