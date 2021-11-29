<template>
    <div class="personalized">
        <div class="personalized-top">
            <h3>{{ title }}</h3>
        </div>
        <div class="personalized-list">
            <div v-for="item in personalized"
                 :key="item.id"
                 class="personalized-item"
                 @click="selectItem(item.id)"
            >
                <img v-lazy="item.picUrl" alt>
                <p>{{ item.name }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'HomePersonalized',
  props: {
    personalized: {
      type: Array, // 数据类型为 数组
      'default': () => [], // 默认值为 [] (Object / Array 类型的默认值需要使用工厂函数的方式指定)
      required: true // 必须要传递
    },

    title: {
      type: String,
      'default': '',
      required: true
    },

    type: {
      type: String,
      'default': '',
      required: true
    }
  },

  methods: {
    selectItem (id) {
      this.$emit('select-item', id, this.type)
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/css/mixin';

.personalized {
    width: 100%;
    @include bg_sub_color();

    .personalized-top {
        width: 100%;
        height: 84px;
        display: flex;
        align-items: center;
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

    .personalized-list {
        width: 100%;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        padding: 20px 0;

        .personalized-item {
            width: 230px;

            img {
                width: 100%;
                height: 230px;
                border-radius: 20px;
            }

            p {
                @include clamp(2);
                @include font_size($font_medium);
                @include font_color();
                margin: 10px 0 20px;
            }
        }
    }
}
</style>
