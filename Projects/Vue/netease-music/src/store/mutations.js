import * as mutationType from './mutations-type'

export default {
  [mutationType.SET_NORMAL_PLAYER_SHOW] (state, flag) {
    state.isNormalPlayerShow = flag
    if (flag) {
      state.isListPlayerShow = false
      state.isMiniPlayerShow = false
    }
  },

  [mutationType.SET_MINI_PLAYER_SHOW] (state, flag) {
    state.isMiniPlayerShow = flag
    if (flag) {
      state.isNormalPlayerShow = false
      state.isListPlayerShow = false
    }
  },

  [mutationType.SET_LIST_PLAYER_SHOW] (state, flag) {
    state.isListPlayerShow = flag
  },

  [mutationType.SET_MUSIC_PLAYING] (state, flag) {
    state.isMusicPlaying = flag
  },

  [mutationType.SET_PLAY_MODE_TYPE] (state, mode) {
    state.playModeType = mode
  },

  [mutationType.SET_SONGS] (state, songs) {
    state.songs = songs
  },

  [mutationType.GET_SONG_LYRIC] (state, lyric) {
    state.currentSongLyric = lyric
  },

  [mutationType.DELETE_SONGS] (state, index) {
    if (index === undefined) {
      state.songs = []
    } else {
      state.songs.splice(index, 1)
    }

    // * subtract current playing song index by 1 if a song with smaller index has been deleted
    if (index < state.currentSongIndex) {
      state.currentSongIndex--
    }

    if (state.songs.length === 0) {
      state.isMiniPlayerShow = false
      state.isListPlayerShow = false
      state.isNormalPlayerShow = false
      state.currentSongIndex = 0
      state.isMusicPlaying = false
    }
  },

  [mutationType.SET_SONG_INDEX] (state, index) {
    if (index < 0) {
      state.currentSongIndex = state.songs.length - 1
      return
    }

    if (index > state.songs.length - 1) {
      state.currentSongIndex = 0
      return
    }

    state.currentSongIndex = index
  },

  [mutationType.SET_SONG_CURRENT_TIME] (state, time) {
    state.songCurrentTime = time
  },

  [mutationType.SET_FAVOURITE_SONG] (state, song) {
    if (!state.favouriteSongs.some(currentSong => currentSong.id === song.id)) {
      state.favouriteSongs.push(song)
    }
  },

  [mutationType.SET_FAVOURITE_SONG_LIST] (state, songList) {
    state.favouriteSongs = songList
  },

  [mutationType.DELETE_FAVOURITE_SONGS] (state, song) {
    if (song === undefined) {
      state.favouriteSongs = []
    } else {
      state.favouriteSongs = state.favouriteSongs.filter(currentSong => currentSong.id !== song.id)
    }
  },

  [mutationType.SET_HISTORY_SONG] (state, song) {
    const index = state.playHistory.findIndex(currentSong => currentSong.id === song.id)

    if (index === -1) {
      state.playHistory.unshift(song)
    } else if (index > 0) {
      state.playHistory.splice(index, 1)
      state.playHistory.unshift(song)
    }

    if (state.playHistory.length > 30) {
      state.playHistory.pop()
    }
  },

  [mutationType.SET_HISTORY_SONG_LIST] (state, songList) {
    state.playHistory = songList
  },

  [mutationType.SET_THEME] (state, theme) {
    if (theme === undefined) {
      switch (state.theme) {
        case 'netease':
          state.theme = 'qq'
          return
        case 'qq':
          state.theme = 'it666'
          return
        case 'it666':
          state.theme = 'netease'
          return
        default:
          return
      }
    } else {
      state.theme = theme
    }
  }
}
