<template>
    <div class="tab">
        <router-link v-slot="{ navigate, isActive }"
                     class="item"
                     custom
                     to="/recommend"
        >
            <p :class="[isActive && 'router-link-active']" role="link" @click="navigate">
                <span>推荐</span>
            </p>
        </router-link>
        <router-link v-slot="{ navigate, isActive }"
                     class="item"
                     custom
                     to="/artists"
        >
            <p :class="[isActive && 'router-link-active']" role="link" @click="navigate">
                <span>歌手</span>
            </p>
        </router-link>
        <router-link v-slot="{ navigate, isActive }"
                     class="item"
                     custom
                     to="/rank"
        >
            <p :class="[isActive && 'router-link-active']" role="link" @click="navigate">
                <span>排行</span>
            </p>
        </router-link>
        <router-link v-slot="{ navigate, isActive }"
                     class="item"
                     custom
                     to="/search"
        >
            <p :class="[isActive && 'router-link-active']" role="link" @click="navigate">
                <span>搜索</span>
            </p>
        </router-link>
    </div>
</template>

<script>
export default {
  name: 'HomeTab'
}
</script>

<style lang="scss" scoped>
@import './../assets/css/mixin';

.tab {
    display: flex;
    justify-content: space-around;
    position: fixed;
    top: 100px;
    left: 0;
    z-index: 999;
    width: 100%;
    @include bg_sub_color();
    height: 84px;

    .item {
        width: 100%;
        text-align: center;

        span {
            display: inline-block;
            height: 100%;
            box-sizing: border-box;
            line-height: 84px;
            @include font_size($font_medium_s);
            @include font_color();
        }

        &.router-link-active {
            span {
                @include font_active_color();
                border-bottom: 4px solid;
                @include border_color();
            }
        }
    }
}
</style>
