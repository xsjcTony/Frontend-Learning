<template>
    <div class="ranking">
        <ul class="ranking-wrapper">
            <li v-for="(listGroupTitle, key) in category.titles" :key="key">
                <h3 class="list-group-title">{{ listGroupTitle }}</h3>
                <ul v-if="key === 'officialList'" class="official-list-wrapper">
                    <li v-for="rankingList in category[key]"
                        :key="rankingList.list.id"
                        class="list-item"
                        @click="selectList(rankingList.list.id)"
                    >
                        <div class="item-left">
                            <img v-lazy="rankingList.list.coverImgUrl" :alt="rankingList.list.name">
                            <p>{{ rankingList.list.updateFrequency }}</p>
                        </div>
                        <div class="item-right">
                            <p v-for="(song, index) in rankingList.list.tracks" :key="song.first">{{ index + 1 }}.{{ song.first }} - {{ song.second }}</p>
                        </div>
                    </li>
                </ul>
                <ul v-else class="other-list-wrapper">
                    <li v-for="rankingList in category[key]"
                        :key="rankingList.list.id"
                        class="list-item"
                        @click="selectList(rankingList.list.id)"
                    >
                        <div class="item-top">
                            <img v-lazy="rankingList.list.coverImgUrl" :alt="rankingList.list.name">
                            <p>{{ rankingList.list.updateFrequency }}</p>
                        </div>
                        <p class="item-bottom">{{ rankingList.list.name }}</p>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
import { RankingAPI } from '../api'
import MetaInfo from '../../vue-meta-info'

export default {
  name: 'HomeRanking',

  data () {
    return {
      category: {}
    }
  },

  created () {
    RankingAPI.getTopLists()
      .then((res) => { this.category = res })
      .catch((err) => { console.error(err) })
  },

  methods: {
    selectList (id) {
      this.$router.push(`/listDetail/ranking/${ id }`)
    }
  },

  metaInfo: MetaInfo.ranking
}
</script>

<style lang="scss" scoped>
@import '../assets/css/mixin';

.ranking {
    width: 100%;
    padding-top: 184px;
    @include bg_sub_color();

    .ranking-wrapper {
        position: relative;
        overflow: auto;
        width: 100%;
        height: calc(100vh - 184px - 150px);

        li {
            .list-group-title {
                position: sticky;
                @include font_color();
                @include font_size($font_large);
                @include bg_sub_color();
                top: 0;
                left: 0;
                padding: 10px 20px;
                font-weight: 700;
                white-space: nowrap;
                z-index: 9;
            }

            .official-list-wrapper {
                width: 100%;

                .list-item {
                    display: flex;
                    align-items: center;
                    width: 100%;
                    padding: 10px 20px;
                    box-sizing: border-box;

                    .item-left {
                        position: relative;
                        margin-right: 30px;

                        img {
                            width: 200px;
                            height: 200px;
                            border-radius: 10px;
                        }

                        p {
                            position: absolute;
                            bottom: 10px;
                            left: 10px;
                            color: #fff;
                            @include font_size($font_medium_s);
                        }
                    }

                    .item-right {
                        min-width: 0;

                        p {
                            @include font_color();
                            @include font_size($font_medium_s);
                            @include no_wrap();
                            padding: 10px 0;
                        }
                    }
                }
            }

            .other-list-wrapper {
                display: grid;
                justify-content: space-between;
                width: 100%;
                padding: 10px 20px;
                box-sizing: border-box;
                grid-template-columns: repeat(3, 200px);
                grid-row-gap: 20px;

                .list-item {
                    .item-top {
                        position: relative;

                        img {
                            width: 200px;
                            height: 200px;
                            border-radius: 10px;
                        }

                        p {
                            position: absolute;
                            bottom: 10px;
                            left: 10px;
                            color: #fff;
                            @include font_size($font_medium_s);
                        }
                    }

                    .item-bottom {
                        width: 200px;
                        padding: 10px 0;
                        text-align: center;
                        @include font_color();
                        @include font_size($font_medium_s);
                        @include no_wrap();
                    }
                }
            }
        }
    }
}
</style>
