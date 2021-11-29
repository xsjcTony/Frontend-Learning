<template>
    <div class="header" @click="switchTheme">
        <div class="header-left">
            <slot name="left">left slot</slot>
        </div>
        <div class="header-middle">
            <slot name="middle">middle slot</slot>
        </div>
        <div class="header-right">
            <slot name="right">right slot</slot>
        </div>
        <slot></slot>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { setLocalStorage, getLocalStorage } from '../utils'

export default {
  name: 'AppHeader',

  computed: {
    ...mapGetters([
      'theme'
    ])
  },

  watch: {
    theme (newValue) {
      document.documentElement.dataset.theme = newValue
      setLocalStorage('theme', newValue)
    }
  },

  created () {
    const theme = getLocalStorage('theme') ?? 'netease'
    document.documentElement.dataset.theme = theme
    this.changeTheme(theme)
  },

  methods: {
    ...mapActions([
      'changeTheme'
    ]),

    switchTheme () {
      this.changeTheme()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/mixin';

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    @include bg_color();
    z-index: 999;
    width: 100%;
    height: 100px;

    .header-left,
    .header-right {
        width: 84px;
        height: 84px;

        * {
            width: 100%;
            height: 100%;
        }
    }

    .header-middle {
        max-width: 65%;
    }
}
</style>
