<template>
    <div class="list-detail">
        <playlist-header :title="list.name"/>
        <playlist-image ref="listImage" :img-url="list.coverImgUrl"/>
        <div class="list-detail-list">
            <ScrollView ref="scrollView">
                <playlist-tracks :tracks="list.tracks"/>
            </ScrollView>
        </div>
    </div>
</template>

<script>
/* eslint-disable brace-style */

import ListDetailHeader from '../components/ListDetail/ListDetailHeader.vue'
import ListDetailImage from '../components/ListDetail/ListDetailImage.vue'
import ListDetailTracks from '../components/ListDetail/ListDetailTracks.vue'
import ScrollView from '../components/ScrollView.vue'
import { HomeAPI, RankingAPI } from '../api/index'
import MetaInfo from '../../vue-meta-info'

export default {
  name: 'ListDetail',
  components: {
    ScrollView,
    playlistHeader: ListDetailHeader,
    playlistImage: ListDetailImage,
    playlistTracks: ListDetailTracks
  },

  data () {
    return {
      list: {}
    }
  },

  created () {
    // playlist detail
    if (this.$route.params.type === 'playlist') {
      HomeAPI.getPlaylistDetail(this.$route.params.id)
        .then((data) => {
          this.list = data.playlist
          this.list.tracks.forEach((song) => {
            song.singer = song.ar.reduce((artists, currentArtist, index) => {
              if (index !== 0) {
                artists += ` / ${ currentArtist.name }`
              }
              return artists
            }, song.ar[0].name)
          })
        })
        .catch((err) => { console.error(err) })
    }
    // album detail
    else if (this.$route.params.type === 'album') {
      HomeAPI.getAlbumDetail(this.$route.params.id)
        .then((data) => {
          this.list = {
            name: data.album.name,
            coverImgUrl: data.album.picUrl,
            tracks: data.songs
          }

          this.list.tracks.forEach((song) => {
            song.singer = song.ar.reduce((artists, currentArtist, index) => {
              if (index !== 0) {
                artists += ` / ${ currentArtist.name }`
              }
              return artists
            }, song.ar[0].name)
          })
        })
        .catch((err) => { console.error(err) })
    }
    // artist detail
    else if (this.$route.params.type === 'artist') {
      HomeAPI.getArtistDetail(this.$route.params.id)
        .then((data) => {
          this.list = {
            name: data.artist.name,
            coverImgUrl: data.artist.img1v1Url,
            tracks: data.hotSongs
          }

          this.list.tracks.forEach((song) => {
            song.singer = song.ar.reduce((artists, currentArtist, index) => {
              if (index !== 0) {
                artists += ` / ${ currentArtist.name }`
              }
              return artists
            }, song.ar[0].name)
          })
        })
        .catch((err) => { console.error(err) })
    }
    // ranking list detail
    else if (this.$route.params.type === 'ranking') {
      RankingAPI.getListDetail(this.$route.params.id)
        .then((data) => {
          this.list = data.playlist
          this.list.tracks.forEach((song) => {
            song.singer = song.ar.reduce((artists, currentArtist, index) => {
              if (index !== 0) {
                artists += ` / ${ currentArtist.name }`
              }
              return artists
            }, song.ar[0].name)
          })
        })
        .catch((err) => { console.error(err) })
    }
  },

  mounted () {
    const listImageComponent = this.$refs.listImage
    let imageHeight = 0
    listImageComponent.$refs.image.onload = function () {
      imageHeight = this.offsetHeight
    }

    this.$refs.scrollView.scrolling((y) => {
      if (y < 0) {
        const opacity = Math.abs(y) / imageHeight
        listImageComponent.changeMaskOpacity(opacity)
        listImageComponent.changeImageTransform(1)
      } else {
        const scale = y / imageHeight + 1
        listImageComponent.changeImageTransform(scale)
        listImageComponent.changeMaskOpacity(0)
      }
    })
  },

  metaInfo: MetaInfo.listDetail
}
</script>

<style lang="scss" scoped>
@import './../assets/css/mixin';

.list-detail {
    position: fixed;
    z-index: 1999;
    inset: 0;
    @include bg_sub_color();

    .list-detail-list {
        position: fixed;
        inset: 650px 0 150px;
    }
}
</style>
