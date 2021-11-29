<template>
    <Swiper ref="mySwiper" :options="swiperOptions" class="banner">
        <SwiperSlide v-for="banner in banners" :key="banner.bannerId" class="item">
            <a :href="banner.url">
                <img :src="banner.pic" alt>
            </a>
        </SwiperSlide>
        <div slot="pagination" class="swiper-pagination"></div>
    </Swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  name: 'HomeBanner',
  components: {
    Swiper,
    SwiperSlide
  },

  props: {
    banners: {
      type: Array, // 数据类型为 数组
      'default': () => [], // 默认值为 [] (Object / Array 类型的默认值需要使用工厂函数的方式指定)
      required: true // 必须要传递
    }
  },

  data () {
    return {
      swiperOptions: {
        loop: true,
        autoplay: {
          delay: 2000,
          disableOnInteraction: false
        },

        pagination: {
          el: '.swiper-pagination'
        },

        observer: true,
        observeParents: true,
        observeSlideChildren: true
      }
    }
  },

  computed: {
    swiper () {
      return this.$refs.mySwiper.$swiper
    }
  },

  mounted () {
    this.swiper.slideTo(1, 0, false)
  }
}
</script>

<style lang="scss" scoped>
.banner {
    .item {
        a {
            img {
                width: 100%;
                height: 300px;
            }
        }
    }
}
</style>

<style lang="scss">
@import '../../assets/css/mixin';

.banner {
    .swiper-pagination {
        .swiper-pagination-bullet {
            width: 16px;
            height: 16px;
            background: #fff;
            opacity: 1;

            &.swiper-pagination-bullet-active {
                @include bg_color();
            }
        }
    }
}
</style>
