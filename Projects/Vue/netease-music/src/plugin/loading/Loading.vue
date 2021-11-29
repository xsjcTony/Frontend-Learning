<template>
    <div v-show="isShow" class="container">
        <div class="wrapper">
            <div class="loading"></div>
            <p class="title">{{ title }}</p>
        </div>
    </div>
</template>

<script>
/* eslint-disable vue/multi-word-component-names */
export default {
  name: 'Loading',
  data () {
    return {
      title: '正在加载...',
      isShow: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin';

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 99999999;
    width: 350px;
    height: 350px;
    border-radius: 40px;
    background: rgba(0,0,0,.5);
    transform: translate(-50%, -50%);

    .wrapper {
        .loading {
            width: 180px;
            height: 180px;
            margin-bottom: 30px;
            border: 10px solid #fff;
            border-right-color: #409eff;
            border-radius: 50%;
            animation: loading 1s linear infinite;
        }

        .title {
            @include font_size($font_large);
            color: #fff;
            text-align: center;
        }
    }
}

@keyframes loading {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>
