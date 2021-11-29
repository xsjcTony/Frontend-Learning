<template>
    <Swiper ref="mySwiper" :options="swiperOptions" class="middle">
        <SwiperSlide class="disc">
            <div ref="discWrapper" class="disc-wrapper">
                <img :src="currentSong.picUrl" alt>
            </div>
            <p>{{ getCurrentLyric }}</p>
        </SwiperSlide>
        <SwiperSlide ref="lyricWrapper" class="lyric">
            <ScrollView ref="scrollView">
                <ul>
                    <li v-for="(lyric, key, index) in currentSongLyric"
                        :key="key"
                        :class="{ current: currentLyricIndex === index }"
                    >
                        {{ lyric }}
                    </li>
                </ul>
            </ScrollView>
        </SwiperSlide>
        <div slot="pagination" class="swiper-pagination"></div>
    </Swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import ScrollView from './../ScrollView.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'NormalPlayerMiddle',
  components: {
    Swiper,
    SwiperSlide,
    ScrollView
  },

  props: {
    currentTime: {
      type: Number,
      'default': 0,
      required: true
    }
  },

  data () {
    return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination',
          bulletClass: 'player-bullet',
          bulletActiveClass: 'player-bullet-active'
        },

        observer: true,
        observeParents: true,
        observeSlideChildren: true
      },

      currentLyricIndex: 0
    }
  },

  computed: {
    ...mapGetters([
      'isMusicPlaying',
      'currentSong',
      'currentSongLyric'
    ]),

    swiper () {
      return this.$refs.mySwiper.$swiper
    },

    getCurrentLyric () {
      if (Object.keys(this.currentSongLyric).length === 0) { return '纯音乐, 请欣赏' }
      return this.currentSongLyric[Object.keys(this.currentSongLyric)[this.currentLyricIndex]]
    }
  },

  watch: {
    isMusicPlaying (newValue) {
      if (newValue) {
        this.$refs.discWrapper.classList.add('active')
      } else {
        this.$refs.discWrapper.classList.remove('active')
      }
    },

    /**
     * @description Highlight current lyric.
     * @param {number} newValue - New current time.
     */
    currentTime (newValue) {
      const formattedCurrentTime = Math.floor(newValue * 1000)
      const keys = Object.keys(this.currentSongLyric)

      if (keys.length === 0) {
        this.currentLyricIndex = 0
        return
      }

      for (let i = 0; i < keys.length; i++) {
        if (i === 0 && formattedCurrentTime < keys[i]) {
          if (this.currentLyricIndex !== i) {
            this.currentLyricIndex = i
          }
          return
        }

        if (formattedCurrentTime > keys[i] && i === keys.length - 1
          || formattedCurrentTime > keys[i] && formattedCurrentTime < keys[i + 1]) {
          if (this.currentLyricIndex !== i) {
            this.currentLyricIndex = i
          }
          return
        }
      }
    },

    /**
     * @description Scroll lyric automatically.
     * @param {number} newValue - New index of <li> of the current lyric.
     */
    currentLyricIndex (newValue) {
      const currentLyricTop = document.querySelectorAll('.lyric ul>li')[newValue]?.offsetTop
      const lyricWrapperHeight = this.$refs.lyricWrapper.$el.offsetHeight
      if (currentLyricTop > lyricWrapperHeight / 2) {
        this.$refs.scrollView.scrollTo(0, lyricWrapperHeight / 2 - currentLyricTop, 100)
      } else {
        this.$refs.scrollView.scrollTo(0, 0, 100)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin';

.middle {
    position: fixed;
    inset: 150px 0 250px;

    .disc {
        .disc-wrapper {
            overflow: hidden;
            width: 500px;
            height: 500px;
            margin: 0 auto;
            border: 30px solid #fff;
            border-radius: 50%;
            animation: spin 5s linear infinite;
            animation-play-state: paused;

            &.active {
                animation-play-state: running;
            }

            img {
                width: 100%;
                height: 100%;
            }
        }

        p {
            width: 80%;
            @include font_size($font_medium);
            @include font_color();
            margin: 50px auto 0;
            text-align: center;
        }
    }

    .lyric {
        overflow: hidden;
        height: 90%;

        ul {
            width: 80%;
            margin: 0 auto;

            li {
                margin: 10px 0;
                @include font_size($font_medium);
                @include font_color();
                text-align: center;

                &:last-of-type {
                    padding-bottom: 90%;
                }

                &.current {
                    color: #fff !important;
                }
            }
        }

        &>#wrapper {
            position: relative;
            bottom: 10px;
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

<style lang="scss">
@import '../../assets/css/mixin';

.middle {
    .swiper-pagination {
        .player-bullet {
            display: inline-block;
            width: 20px;
            height: 20px;
            margin: 0 20px;
            border-radius: 10px;
            background: #fff;
            opacity: 1;
            transition: all 0.1s linear;

            &.player-bullet-active {
                width: 60px;
                @include bg_color();
            }
        }
    }
}
</style>
