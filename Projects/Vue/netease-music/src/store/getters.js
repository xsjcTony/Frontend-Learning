export default {
  isNormalPlayerShow (state) {
    return state.isNormalPlayerShow
  },

  isMiniPlayerShow (state) {
    return state.isMiniPlayerShow
  },

  isListPlayerShow (state) {
    return state.isListPlayerShow
  },

  isMusicPlaying (state) {
    return state.isMusicPlaying
  },

  playModeType (state) {
    return state.playModeType
  },

  songs (state) {
    return state.songs
  },

  currentSong (state) {
    if (state.songs.length === 0) {
      return {
        name: '',
        singer: '',
        picUrl: ''
      }
    }
    return state.songs[state.currentSongIndex]
  },

  currentSongLyric (state) {
    return state.currentSongLyric
  },

  currentSongIndex (state) {
    return state.currentSongIndex
  },

  songCurrentTime (state) {
    return state.songCurrentTime
  },

  favouriteSongs (state) {
    return state.favouriteSongs
  },

  playHistory (state) {
    return state.playHistory
  },

  theme (state) {
    return state.theme
  }
}
