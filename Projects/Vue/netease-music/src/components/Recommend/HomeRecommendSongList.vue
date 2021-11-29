<template>
    <div class="song">
        <div class="song-top">
            <h3>最新音乐</h3>
        </div>
        <SongListItem :songs="songs"/>
    </div>
</template>

<script>
import SongListItem from '../SongListItem.vue'

export default {
  name: 'HomeSongList',
  components: { SongListItem },
  props: {
    songs: {
      type: Array, // 数据类型为 数组
      'default': () => [], // 默认值为 [] (Object / Array 类型的默认值需要使用工厂函数的方式指定)
      required: true // 必须要传递
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin';

.song {
    width: 100%;
    @include bg_sub_color();

    .song-top {
        display: flex;
        align-items: center;
        width: 100%;
        height: 84px;
        border-bottom: 1px solid #ccc;
        box-sizing: border-box;

        h3 {
            @include font_size($font_large);
            @include font_color();
            padding: 0 16px;
            border-left: 4px solid;
            @include border_color();
        }
    }
}
</style>
