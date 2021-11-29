<template>
    <ul class="list">
        <li class="list-top" @click="playAllMusic">
            <i class="list-top-icon"></i>
            <span class="list-top-title">播放全部</span>
        </li>
        <li v-for="song in tracks" :key="song.id" @click="selectMusic(song.id)">
            <div>
                <h3>{{ song.name }}</h3>
                <p>
                    <img alt src="../../assets/images/sq@3x.png">
                    <span>{{ song.singer }} - {{ song.al.name }}</span>
                </p>
            </div>
            <i class="song-play"></i>
        </li>
    </ul>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'ListDetailTracks',
  props: {
    tracks: {
      type: Array,
      'default': () => [],
      required: true
    }
  },

  methods: {
    ...mapActions([
      'setNormalPlayerShow',
      'setSongs'
    ]),

    selectMusic (id) {
      this.setNormalPlayerShow(true)
      this.setSongs([id])
    },

    playAllMusic () {
      this.setNormalPlayerShow(true)

      // get all song ids
      const ids = this.tracks.map(song => song.id)
      this.setSongs(ids)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin';

.list {
    width: 100%;

    li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px 10px 20px;
        border-bottom: 1px solid #ccc;
        @include bg_sub_color();
        @include font_color();

        div {
            flex: 1;
            min-width: 0;
            padding-right: 20px;

            h3 {
                @include font_size($font_large);
                padding-bottom: 10px;
                @include no_wrap();
            }

            p {
                display: flex;
                align-items: center;

                img {
                    width: 24px;
                    height: 16px;
                    margin-right: 12px;
                }

                span {
                    opacity: 0.7;
                    @include no_wrap();
                    @include font_size($font_small);
                }
            }
        }

        .song-play {
            flex: 0 1 auto;
            width: 44px;
            height: 44px;
            @include bg_img('./../../assets/images/small_play')
        }

        &.list-top {
            justify-content: flex-start;
            height: 70px;
            border-top-left-radius: 50px;
            border-top-right-radius: 50px;

            .list-top-icon {
                width: 60px;
                height: 60px;
                @include bg_img('./../../assets/images/small_play');
                margin-right: 20px;
            }

            .list-top-title {
                @include font_color();
                @include font_size($font_medium);
            }
        }
    }
}
</style>
