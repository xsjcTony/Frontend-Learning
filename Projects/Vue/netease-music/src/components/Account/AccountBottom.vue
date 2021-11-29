<template>
    <div class="account-bottom">
        <div class="bottom-play" @click="playAllMusic">
            <i></i>
            <span>播放全部</span>
        </div>
        <div class="bottom-list-wrapper">
            <ScrollView ref="scrollView">
                <SongListItem :songs="songs"/>
            </ScrollView>
        </div>
    </div>
</template>

<script>
import ScrollView from '../ScrollView.vue'
import SongListItem from '../SongListItem.vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { SET_SONGS } from '../../store/mutations-type'

export default {
  name: 'AccountBottom',

  components: {
    ScrollView,
    SongListItem
  },

  props: {
    activeTab: {
      type: String,
      'default': '',
      required: true
    }
  },

  computed: {
    ...mapGetters([
      'favouriteSongs',
      'playHistory'
    ]),

    songs () {
      if (this.activeTab === 'favourite') {
        return this.favouriteSongs
      } else if (this.activeTab === 'history') {
        return this.playHistory
      } else {
        return []
      }
    }
  },

  watch: {
    activeTab () {
      this.$refs.scrollView.scrollTo(0, 0, 0)
    }
  },

  methods: {
    ...mapActions([
      'setNormalPlayerShow',
      'setSongs',
      'setSongIndex'
    ]),

    ...mapMutations([
      SET_SONGS
    ]),

    playAllMusic () {
      this.setNormalPlayerShow(true)

      // store songs into Vuex
      this.setSongs(this.songs.map(song => song.id))
      // this.SET_SONGS([...this.songs]) // 这里不能使用this.songs, 否则会直接引用Vuex中的数据, 造成无限循环, 避免的方法是使用...扩展运算符创建一个新的数组并复制this.songs中的内容, 避免直接引用, 就不会触发响应式
      // this.setSongIndex(0)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin';

.account-bottom {
    position: fixed;
    inset: 100px 0 0;

    .bottom-play {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 240px;
        height: 60px;
        margin: 20px auto;
        padding: 0 30px;
        border: 1px solid;
        border-radius: 30px;
        box-sizing: border-box;
        @include border_color();

        i {
            display: inline-block;
            width: 46px;
            height: 46px;
            @include bg_img('../../assets/images/small_play');
        }

        span {
            @include font_color();
        }
    }

    .bottom-list-wrapper {
        position: fixed;
        inset: 200px 0 150px;
        overflow: hidden;
        @include bg_sub_color();
    }
}
</style>
