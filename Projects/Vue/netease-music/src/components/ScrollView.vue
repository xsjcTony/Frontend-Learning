<template>
    <div id="wrapper" ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
import BetterScroll from 'better-scroll'

export default {
  name: 'ScrollView',
  mounted () {
    this.betterScroll = new BetterScroll(this.$refs.wrapper, {
      probeType: 3,
      disableMouse: true,
      disableTouch: false,
      scrollX: false,
      scrollY: true,
      click: true
    })
    // MutationObserver for refresh BetterScroll
    const observer = new MutationObserver(() => {
      this.betterScroll.refresh()
    })
    const config = {
      childList: true,
      subtree: true,
      attributeFilter: ['height', 'offsetHeight']
    }
    observer.observe(this.$refs.wrapper, config)
  },

  methods: {
    scrolling (fn) {
      this.betterScroll.on('scroll', ({ y }) => {
        fn(y)
      })
    },

    refresh () {
      setTimeout(() => {
        this.betterScroll.refresh()
      }, 100)
    },

    scrollTo (x, y, time) {
      this.betterScroll.scrollTo(x, y, time)
    }
  }
}
</script>

<style scoped>
#wrapper {
    width: 100%;
    height: 100%;
}
</style>
