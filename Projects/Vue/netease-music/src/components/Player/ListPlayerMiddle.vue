<template>
    <div class="player-middle">
        <ScrollView ref="scrollView">
            <ul ref="play">
                <li v-for="(song, index) in songs" :key="song.id" class="item">
                    <div v-show="index === currentSongIndex" class="item-play" @click.stop="play"></div>
                    <p class="item-title" @click.stop="selectMusic(index)">{{ song.name }}</p>
                    <div class="item-favourite"
                         :class="{ active: isFavourite(song) }"
                         @click.stop="favouriteSong(song)"
                    ></div>
                    <div class="item-delete" @click.stop="deleteSong(index)"></div>
                </li>
            </ul>
        </ScrollView>
    </div>
</template>

<script>
import ScrollView from '../ScrollView.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ListPlayerMiddle',
  components: {
    ScrollView
  },

  computed: {
    ...mapGetters([
      'isMusicPlaying',
      'songs',
      'isListPlayerShow',
      'currentSongIndex',
      'favouriteSongs'
    ])
  },

  watch: {
    isMusicPlaying (newValue) {
      if (newValue) {
        this.$refs.play.classList.add('active')
      } else {
        this.$refs.play.classList.remove('active')
      }
    },

    isListPlayerShow (newValue) {
      if (newValue) {
        this.$refs.scrollView.refresh()
      }
    }
  },

  methods: {
    ...mapActions([
      'setNormalPlayerShow',
      'setMiniPlayerShow',
      'setMusicPlaying',
      'deleteSongs',
      'setSongIndex',
      'setFavouriteSong',
      'deleteFavouriteSongs'
    ]),

    play () {
      this.setMusicPlaying(!this.isMusicPlaying)
    },

    deleteSong (index) {
      this.deleteSongs(index)
    },

    selectMusic (index) {
      this.setSongIndex(index)
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

.player-middle {
    overflow: hidden;
    width: 100%;
    height: 700px;

    ul {
        .item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 100px;
            padding: 0 20px;
            border-top: 1px solid #ccc;
            box-sizing: border-box;

            div {
                flex: 0 1 auto;
                width: 56px;
                height: 56px;
            }

            .item-play {
                @include bg_img('../../assets/images/small_play');
                margin-right: 20px;
            }

            .item-title {
                @include font_size($font_medium_s);
                @include font_color();
                flex: 1 1 0;
                margin-right: 20px;
                @include no_wrap();
            }

            .item-favourite {
                @include bg_img('../../assets/images/small_un_favorite');
                margin-right: 20px;

                &.active {
                    @include bg_img('../../assets/images/small_favorite');
                }
            }

            .item-delete {
                width: 52px;
                height: 52px;
                @include bg_img('../../assets/images/small_close');
            }
        }

        &.active {
            .item {
                .item-play {
                    @include bg_img('../../assets/images/small_pause');
                }
            }
        }
    }
}
</style>
