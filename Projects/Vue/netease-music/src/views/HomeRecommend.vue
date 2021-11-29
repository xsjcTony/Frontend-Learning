<template>
    <div class="recommend">
        <HomeRecommendBanner :banners="banners"/>
        <HomeRecommendPersonalized :personalized="playlists"
                                   title="推荐歌单"
                                   type="playlist"
                                   @select-item="selectItem"
        />
        <HomeRecommendPersonalized :personalized="albums"
                                   title="最新专辑"
                                   type="album"
                                   @select-item="selectItem"
        />
        <HomeRecommendSongList :songs="newSongs"/>
    </div>
</template>

<script>
import { HomeAPI } from '../api/index'
import HomeRecommendBanner from '../components/Recommend/HomeRecommendBanner.vue'
import HomeRecommendPersonalized from '../components/Recommend/HomeRecommendPersonalized.vue'
import HomeRecommendSongList from '../components/Recommend/HomeRecommendSongList.vue'
import MetaInfo from '../../vue-meta-info'

export default {
  name: 'HomeRecommend',
  components: {
    HomeRecommendBanner,
    HomeRecommendPersonalized,
    HomeRecommendSongList
  },

  data () {
    return {
      banners: [],
      playlists: [],
      albums: [],
      newSongs: []
    }
  },

  created () {
    HomeAPI.getBanner()
      .then((data) => { this.banners = data.banners })
      .catch((err) => { console.error(err) })
    HomeAPI.getPlaylist(6)
      .then((data) => { this.playlists = data.result })
      .catch((err) => { console.error(err) })
    HomeAPI.getNewAlbum()
      .then((data) => {
        this.albums = data.albums.slice(0, 6)
      })
      .catch((err) => { console.error(err) })
    HomeAPI.getNewSong()
      .then(async (data) => {
        // const ids = data.result.map(song => song.song.id)
        // const urls = await SongAPI.getSongUrl(ids.join(','))
        const songs = []

        data.result.forEach((currentSong) => {
          const song = currentSong.song
          const obj = {}

          /*
          for (let i = 0; i < urls.data.length; i++) {
            if (song.id === urls.data[i].id) {
              obj.url = urls.data[i].url
              break
            }
          }
          */

          obj.id = song.id
          obj.name = song.name
          obj.singer = song.artists.reduce((artists, currentArtist, index) => {
            if (index !== 0) {
              artists += ` / ${ currentArtist.name }`
            }
            return artists
          }, song.artists[0].name)
          obj.picUrl = song.album.picUrl
          obj.album = song.album.name
          songs.push(obj)
        })

        this.newSongs = songs
      })
      .catch((err) => { console.error(err) })
  },

  methods: {
    selectItem (id, type) {
      this.$router.push(`/listDetail/${ type }/${ id }`)
    }
  },

  metaInfo: MetaInfo.recommend
}
</script>

<style scoped>
.recommend {
    padding-top: 184px;
    height: calc(100vh - 184px - 150px);
    overflow: auto;
}
</style>
