<template>
    <div class="header">
        <div class="header-left" @click.stop="hideNormalPlayer"></div>
        <div class="header-title">
            <h3>{{ currentSong.name }}</h3>
            <p>{{ currentSong.singer }}</p>
        </div>
        <div class="header-right"></div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'NormalPlayerHeader',
  computed: {
    ...mapGetters([
      'currentSong'
    ])
  },

  methods: {
    ...mapActions([
      'setNormalPlayerShow',
      'setMiniPlayerShow'
    ]),

    hideNormalPlayer () {
      this.setNormalPlayerShow(false)
      this.setMiniPlayerShow(true)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin';

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 100px;

    .header-left,
    .header-right {
        width: 84px;
        height: 84px;
        min-width: 84px;
    }

    .header-left {
        @include bg_img('./../../assets/images/down')
    }

    .header-title {
        color: #fff;
        text-align: center;
        min-width: 0;
        padding: 0 20px;

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
</style>
