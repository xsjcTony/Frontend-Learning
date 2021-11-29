<template>
    <AppHeader class="header">
        <template #left>
            <i class="back" @click.stop="$router.back()"></i>
        </template>
        <template #middle>
            <ul class="tab">
                <li :class="{ active: activeTab === 'favourite' }"
                    @click.stop="switchTab('favourite')"
                >
                    我喜欢的
                </li>
                <li :class="{ active: activeTab === 'history' }"
                    @click.stop="switchTab('history')"
                >
                    最近听的
                </li>
            </ul>
        </template>
        <template #right>
            <i class="more"></i>
        </template>
    </AppHeader>
</template>

<script>
import AppHeader from '../AppHeader.vue'

export default {
  name: 'AccountHeader',

  components: {
    AppHeader
  },

  data () {
    return {
      activeTab: 'favourite'
    }
  },

  methods: {
    switchTab (tab) {
      this.activeTab = tab
      this.$emit('switch-tab', tab)
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

    .tab {
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        border: 1px solid #fff;
        border-radius: 10px;
        box-sizing: border-box;
        color: #fff;
        @include font_size($font_medium);

        li {
            padding: 10px 20px;

            &:first-of-type {
                border-right: 1px solid #fff;
                box-sizing: border-box;
            }

            &.active {
                background: rgba(255, 255, 255, .3);
            }
        }
    }
}
</style>
