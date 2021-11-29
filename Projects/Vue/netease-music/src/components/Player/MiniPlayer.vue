<template>
    <transition :css="false" @enter="enter" @leave="leave">
        <div v-show="isMiniPlayerShow" class="mini-player">
            <div class="player-wrapper">
                <div class="player-left" @click="showNormalPlayer">
                    <img ref="discImg" alt :src="currentSong.picUrl">
                    <div class="player-title">
                        <h3>{{ currentSong.name }}</h3>
                        <p>{{ currentSong.singer }}</p>
                    </div>
                </div>
                <div class="player-right">
                    <div ref="playButton" class="play" @click.stop="play"></div>
                    <div class="list" @click.stop="showListPlayer"></div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'

export default {
  name: 'MiniPlayer',
  computed: {
    ...mapGetters([
      'isMiniPlayerShow',
      'isMusicPlaying',
      'currentSong'
    ])
  },

  watch: {
    isMusicPlaying (newValue) {
      if (newValue) {
        this.$refs.playButton.classList.add('active')
        this.$refs.discImg.classList.add('active')
      } else {
        this.$refs.playButton.classList.remove('active')
        this.$refs.discImg.classList.remove('active')
      }
    }
  },

  methods: {
    showListPlayer () {
      this.setListPlayerShow(true)
    },

    ...mapActions([
      'setNormalPlayerShow',
      'setMusicPlaying',
      'setListPlayerShow'
    ]),

    showNormalPlayer () {
      this.setNormalPlayerShow(true)
    },

    enter (el, done) {
      // eslint-disable-next-line new-cap
      Velocity(el, 'transition.bounceUpIn', { duration: 500 }, () => {
        done()
      })
    },

    leave (el, done) {
      // eslint-disable-next-line new-cap
      Velocity(el, 'transition.bounceDownOut', { duration: 500 }, () => {
        done()
      })
    },

    play () {
      this.setMusicPlaying(!this.isMusicPlaying)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin';

.mini-player {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 2999;
    width: 100%;
    height: 150px;

    .player-wrapper {
        display: flex;
        justify-content: space-between;
        @include bg_color();
        width: 100%;
        height: 100%;

        .player-left {
            display: flex;
            align-items: center;
            padding-left: 30px;
            min-width: 0;

            img {
                width: 100px;
                height: 100px;
                border-radius: 50%;
                animation: spin 5s linear infinite;
                animation-play-state: paused;

                &.active {
                    animation-play-state: running;
                }
            }

            .player-title {
                min-width: 0;
                padding: 0 20px;
                @include font_color();

                h3 {
                    @include font_size($font_medium);
                    @include no_wrap();
                }

                p {
                    @include font_size($font_medium_s);
                    @include no_wrap();
                }
            }
        }

        .player-right {
            display: flex;
            align-items: center;

            .play {
                width: 84px;
                height: 84px;
                @include bg_img('../../assets/images/play');

                &.active {
                    @include bg_img('../../assets/images/pause');
                }
            }

            .list {
                width: 120px;
                height: 120px;
                @include bg_img('../../assets/images/list');
            }
        }
    }
}

@keyframes spin {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>
