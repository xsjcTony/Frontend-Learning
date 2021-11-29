<template>
    <div ref="container" class="image">
        <img ref="image" :src="imgUrl" alt>
        <div ref="mask" class="mask"></div>
    </div>
</template>

<script>
export default {
  name: 'ListDetailImage',
  props: {
    imgUrl: {
      type: String,
      'default': '',
      required: true
    }
  },

  methods: {
    changeMaskOpacity (opacity = 0) {
      this.$refs.mask.style.opacity = `${ opacity }`
    },

    changeImageTransform (scale = 1) {
      this.$refs.container.style.transform = `scale(${ scale })`
    }
  }
}
</script>

<style scoped lang="scss">
.image {
    width: 100%;
    position: relative;

    img {
        width: 100%;
    }

    .mask {
        position: absolute;
        left: 0;
        top: 0;
        background: #000;
        width: 100%;
        height: 100%;
        opacity: 0;
    }
}
</style>
