<template>
    <ul class="song-list">
        <li v-for="song in songs"
            :key="song.id"
            class="song-item"
            @click="selectMusic(song.id)"
        >
            <div>
                <h3>{{ song.name }}</h3>
                <p>
                    <img alt src="../assets/images/sq@3x.png">
                    <span>{{ song.singer }} - {{ song.album }}</span>
                </p>
            </div>
            <i class="song-play"></i>
        </li>
    </ul>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'SongListItem',

  props: {
    songs: {
      type: Array, // 数据类型为 数组
      'default': () => [], // 默认值为 [] (Object / Array 类型的默认值需要使用工厂函数的方式指定)
      required: true // 必须要传递
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/mixin';

.song-list {
    width: 100%;
    padding: 20px 0;

    .song-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-left: 20px;
        padding: 10px 20px 10px 0;
        border-bottom: 1px solid #ccc;
        @include font_color();

        div {
            flex: 1;
            min-width: 0;
            padding-right: 20px;

            h3 {
                @include font_size($font_large);
                padding-bottom: 10px;
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
            @include bg_img('./../assets/images/small_play')
        }
    }
}
</style>
