<template>
    <AppHeader class="header">
        <template #left>
            <i class="back" @click.stop="$router.back()"></i>
        </template>
        <template #middle>
            <p class="title">{{ title }}</p>
        </template>
        <template #right>
            <i class="more"></i>
        </template>
    </AppHeader>
</template>

<script>
import AppHeader from '../AppHeader.vue'

export default {
  name: 'ListDetailHeader',

  components: {
    AppHeader
  },

  props: {
    title: {
      type: String,
      'default': '',
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin';

.header {
    .back {
        display: inline-block;
        @include bg_img('./../../assets/images/back')
    }

    .more {
        display: inline-block;
        @include bg_img('./../../assets/images/more')
    }

    .title {
        color: #fff;
        font-weight: 700;
        text-align: center;
        @include font_size($font_medium);
        @include no_wrap();
    }
}
</style>
