import * as mutationType from './mutations-type'
import { SongAPI } from '../api'
import { parseLyric } from '../utils'

export default {
  setNormalPlayerShow ({ commit }, flag) {
    commit(mutationType.SET_NORMAL_PLAYER_SHOW, flag)
  },

  setMiniPlayerShow ({ commit }, flag) {
    commit(mutationType.SET_MINI_PLAYER_SHOW, flag)
  },

  setListPlayerShow ({ commit }, flag) {
    commit(mutationType.SET_LIST_PLAYER_SHOW, flag)
  },

  setMusicPlaying ({ commit }, flag) {
    commit(mutationType.SET_MUSIC_PLAYING, flag)
  },

  setPlayModeType ({ commit }, mode) {
    commit(mutationType.SET_PLAY_MODE_TYPE, mode)
  },

  async setSongs ({ commit }, songIds) {
    const res = await SongAPI.getSongDetail(songIds.join(','))
    const urls = await SongAPI.getSongUrl(songIds.join(','))
    const songs = []

    res.songs.forEach((song) => {
      const obj = {}

      for (let i = 0; i < urls.data.length; i++) {
        if (song.id === urls.data[i].id) {
          obj.url = urls.data[i].url
          break
        }
      }

      obj.id = song.id
      obj.name = song.name
      obj.singer = song.ar.reduce((artists, currentArtist, index) => {
        if (index !== 0) {
          artists += ` / ${ currentArtist.name }`
        }
        return artists
      }, song.ar[0].name)
      obj.picUrl = song.al.picUrl
      obj.album = song.al.name
      songs.push(obj)
    })

    commit(mutationType.SET_SONGS, songs)
    commit(mutationType.SET_SONG_INDEX, 0)
  },

  async getSongLyric ({ commit }, id) {
    const res = await SongAPI.getLyric(id)
    commit(mutationType.GET_SONG_LYRIC, parseLyric(res.lrc.lyric))
  },

  deleteSongs ({ commit }, index) {
    commit(mutationType.DELETE_SONGS, index)
  },

  setSongIndex ({ commit }, index) {
    commit(mutationType.SET_SONG_INDEX, index)
  },

  setSongCurrentTime ({ commit }, time) {
    commit(mutationType.SET_SONG_CURRENT_TIME, time)
  },

  setFavouriteSong ({ commit }, song) {
    commit(mutationType.SET_FAVOURITE_SONG, song)
  },

  setFavouriteSongList ({ commit }, songList) {
    commit(mutationType.SET_FAVOURITE_SONG_LIST, songList)
  },

  deleteFavouriteSongs ({ commit }, song) {
    commit(mutationType.DELETE_FAVOURITE_SONGS, song)
  },

  setHistorySong ({ commit }, song) {
    commit(mutationType.SET_HISTORY_SONG, song)
  },

  setHistorySongList ({ commit }, songList) {
    commit(mutationType.SET_HISTORY_SONG_LIST, songList)
  },

  changeTheme ({ commit }, index) {
    commit(mutationType.SET_THEME, index)
  }
}


