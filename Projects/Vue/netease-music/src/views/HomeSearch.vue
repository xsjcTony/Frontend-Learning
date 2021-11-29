<template>
    <div class="search">
        <div class="search-box">
            <img alt src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==">
            <input v-model.trim="keywords"
                   v-debounce="search"
                   placeholder="搜索单曲"
                   type="text"
            >
            <img v-show="keywords !== ''"
                 src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjOTk5ODk5IiBkPSJNMTMuMzc5IDEybDEwLjMzOCAxMC4zMzdhLjk3NS45NzUgMCAxIDEtMS4zNzggMS4zNzlMMTIuMDAxIDEzLjM3OCAxLjY2MyAyMy43MTZhLjk3NC45NzQgMCAxIDEtMS4zNzgtMS4zNzlMMTAuNjIzIDEyIC4yODUgMS42NjJBLjk3NC45NzQgMCAxIDEgMS42NjMuMjg0bDEwLjMzOCAxMC4zMzhMMjIuMzM5LjI4NGEuOTc0Ljk3NCAwIDEgMSAxLjM3OCAxLjM3OEwxMy4zNzkgMTIiLz48L3N2Zz4="
                 alt
                 class="clear-input"
                 @click.stop="keywords = ''"
            >
        </div>

        <div v-show="keywords === ''" class="search-initial">
            <div class="search-hot">
                <h3>热门搜索</h3>
                <ul class="search-hot-list">
                    <li v-for="keyword in hotKeywords"
                        :key="keyword"
                        @click="setSearchKeyword(keyword)"
                    >
                        {{ keyword }}
                    </li>
                </ul>
            </div>

            <div class="search-history">
                <h3>搜索历史</h3>
                <ul class="search-history-list">
                    <li v-for="(keyword, index) in searchHistory"
                        :key="keyword"
                        @click="setSearchKeyword(keyword)"
                    >
                        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljYWNhIiBkPSJNMTUgMzBDNi43MTYgMzAgMCAyMy4yODQgMCAxNVM2LjcxNiAwIDE1IDBzMTUgNi43MTYgMTUgMTUtNi43MTYgMTUtMTUgMTVtMC0yOEM3LjgyIDIgMiA3LjgyIDIgMTVzNS44MiAxMyAxMyAxMyAxMy01LjgyIDEzLTEzUzIyLjE4IDIgMTUgMm03IDE2aC04YTEgMSAwIDAgMS0xLTFWN2ExIDEgMCAxIDEgMiAwdjloN2ExIDEgMCAxIDEgMCAyIi8+PC9zdmc+" alt>
                        <p>{{ keyword }}</p>
                        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjOTk5ODk5IiBkPSJNMTMuMzc5IDEybDEwLjMzOCAxMC4zMzdhLjk3NS45NzUgMCAxIDEtMS4zNzggMS4zNzlMMTIuMDAxIDEzLjM3OCAxLjY2MyAyMy43MTZhLjk3NC45NzQgMCAxIDEtMS4zNzgtMS4zNzlMMTAuNjIzIDEyIC4yODUgMS42NjJBLjk3NC45NzQgMCAxIDEgMS42NjMuMjg0bDEwLjMzOCAxMC4zMzhMMjIuMzM5LjI4NGEuOTc0Ljk3NCAwIDEgMSAxLjM3OCAxLjM3OEwxMy4zNzkgMTIiLz48L3N2Zz4="
                             alt
                             class="delete-history-item"
                             @click.stop="deleteHistory(index)"
                        >
                    </li>
                </ul>
            </div>
        </div>

        <div v-show="keywords !== ''" class="search-result">
            <p v-show="songs.length === 0" class="search-no-result">没有搜索结果</p>
            <ul v-show="songs.length > 0" class="search-result-list">
                <li v-for="song in songs"
                    :key="song.id"
                    @click="selectMusic(song.id)"
                >
                    <i></i>
                    <p>{{ song.name }} - {{ song.singer }}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { SearchAPI } from '../api'
import { mapActions } from 'vuex'
import { getLocalStorage, setLocalStorage } from '../utils'
import MetaInfo from '../../vue-meta-info'

export default {
  name: 'HomeSearch',

  directives: {
    // 自定义指令 - 防抖
    debounce: {
      inserted (el, binding) {
        let timerId = null
        el.addEventListener('input', () => {
          timerId && clearTimeout(timerId)
          timerId = setTimeout(() => {
            binding.value()
          }, 500)
        })
      }
    }
  },

  data () {
    return {
      lastKeywords: '',
      keywords: '',
      songs: [],
      hotKeywords: [],
      searchHistory: []
    }
  },

  watch: {
    keywords (newValue) {
      if (newValue === '') {
        this.lastKeywords = ''
        this.songs = []
      }
    },

    searchHistory (newValue) {
      setLocalStorage('searchHistory', newValue)
    }
  },

  created () {
    // get hot keywords
    SearchAPI.getHotKeywords()
      .then((data) => { this.hotKeywords = data.result.hots.map(hot => hot.first) })
      .catch((err) => { console.error(err) })

    // get search history from Local Storage
    this.searchHistory = getLocalStorage('searchHistory') ?? []
  },

  methods: {
    ...mapActions([
      'setNormalPlayerShow',
      'setSongs'
    ]),

    search () {
      if (this.keywords && this.keywords !== this.lastKeywords) {
        this.lastKeywords = this.keywords // 防止重复请求

        SearchAPI.getSearchResult(this.keywords, 1)
          .then((res) => {
            if (res.result.songCount > 0) {
              res.result.songs.forEach((song) => {
                song.singer = song.artists.reduce((artists, currentArtist, index) => {
                  if (index !== 0) {
                    artists += ` / ${ currentArtist.name }`
                  }
                  return artists
                }, song.artists[0].name)
              })
              this.songs = res.result.songs
            } else {
              this.songs = []
            }
          })
          .catch((err) => { console.error(err) })
      }
    },

    selectMusic (id) {
      // store current keyword into searchHistory Local Storage
      const index = this.searchHistory.findIndex(history => history === this.keywords)

      if (index === -1) {
        this.searchHistory.unshift(this.keywords)
      } else if (index > 0) {
        this.searchHistory.splice(index, 1)
        this.searchHistory.unshift(this.keywords)
      }

      if (this.searchHistory.length > 30) {
        this.searchHistory.pop()
      }

      // show music player & play song
      this.setNormalPlayerShow(true)
      this.setSongs([id])

      // clear input
      this.keywords = ''
    },

    setSearchKeyword (keywords) {
      this.keywords = keywords
      this.search() // 因为直接给<input>的value赋值无法触发input事件, 所以需要手动调用search()
    },

    deleteHistory (index) {
      this.searchHistory.splice(index, 1)
    }
  },

  metaInfo: MetaInfo.search
}
</script>

<style lang="scss" scoped>
@import '../assets/css/mixin';

.search {
    width: 100%;
    padding-top: 184px;
    @include bg_sub_color();

    .search-box {
        display: flex;
        align-items: center;
        margin: 40px 20px;
        border-radius: 40px;
        background: #ebecec;

        img {
            width: 40px;
            height: 40px;
            margin: 0 20px 0 30px;
        }

        input {
            flex: 1;
            height: 80px;
            @include font_size($font_medium);
            margin-right: 20px;
            border: none;
            outline: none;
            background: transparent;
            &::placeholder {
                color: #c9c9ca;
            }
        }

        .clear-input {
            width: 30px;
            height: 30px;
            margin-right: 30px;
        }
    }

    .search-initial {
        overflow: scroll;
        width: 100%;
        height: calc(100vh - 344px - 150px);

        .search-hot {
            margin: 0 20px;

            h3 {
                @include font_color();
                @include font_size($font_medium);
                @include bg_sub_color();
                position: sticky;
                top: 0;
                left: 0;
                padding: 10px 0;
                white-space: nowrap;
            }

            .search-hot-list {
                display: flex;
                flex-wrap: wrap;

                li {
                    margin: 15px;
                    padding: 10px 20px;
                    @include font_color();
                    @include font_size($font_medium_s);
                    border: 1px solid;
                    border-radius: 30px;
                }
            }
        }

        .search-history {
            margin: 20px 20px 0;

            h3 {
                @include font_color();
                @include font_size($font_medium);
                @include bg_sub_color();
                position: sticky;
                top: 0;
                left: 0;
                padding: 10px 0;
                white-space: nowrap;
            }

            .search-history-list {
                width: 100%;

                li {
                    display: flex;
                    align-items: center;
                    margin: 0 10px;
                    padding: 30px 0;
                    border-bottom: 1px solid #ccc;
                    box-sizing: border-box;

                    &:last-of-type {
                        border-bottom: none;
                    }

                    img:first-of-type {
                        width: 40px;
                        height: 40px;
                        margin-right: 20px;
                    }

                    p {
                        @include font_color();
                        @include font_size($font_medium);
                        @include no_wrap();
                        flex: 1;
                        padding-right: 20px;
                    }

                    .delete-history-item {
                        width: 30px;
                        height: 30px;
                        margin: 0 10px;
                    }
                }
            }
        }
    }

    .search-result {
        width: 100%;

        .search-no-result {
            @include font_color();
            @include font_size($font_large);
            text-align: center;
            white-space: nowrap;
        }

        .search-result-list {
            overflow: scroll;
            width: 100%;
            height: calc(100vh - 344px - 150px);

            li {
                display: flex;
                align-items: center;
                margin: 0 30px;
                padding: 30px 0;
                border-bottom: 1px solid #ccc;
                box-sizing: border-box;

                &:last-of-type {
                    border-bottom: none;
                }

                i {
                    display: inline-block;
                    width: 40px;
                    height: 40px;
                    margin-right: 20px;
                    @include bg_img('./../assets/images/small_play')
                }

                p {
                    @include font_color();
                    @include font_size($font_medium);
                    @include no_wrap();
                }
            }
        }
    }
}
</style>
