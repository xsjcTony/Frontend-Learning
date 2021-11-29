<template>
    <AppHeader class="header">
        <template #left>
            <i class="icon"></i>
        </template>
        <template #middle>
            <p class="title">Aelita's Music App</p>
        </template>
        <template #right>
            <i class="account" @click.stop="account"></i>
        </template>
    </AppHeader>
</template>

<script>
import AppHeader from './AppHeader.vue'

export default {
  name: 'HomeHeader',
  components: {
    AppHeader
  },

  methods: {
    account () {
      this.$router.push('/account')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/mixin';

.header {
    .icon {
        display: inline-block;
        @include bg_img('./../assets/images/logo')
    }

    .account {
        display: inline-block;
        @include bg_img('./../assets/images/account')
    }

    .title {
        color: #fff;
        font-weight: 700;
        text-align: center;
        @include font_size($font_medium);
    }
}
</style>
