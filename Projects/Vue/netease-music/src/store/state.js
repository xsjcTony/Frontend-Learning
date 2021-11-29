import playMode from './playModeType'

export default {
  isNormalPlayerShow: false,
  isMiniPlayerShow: false,
  isListPlayerShow: false,
  isMusicPlaying: false,
  playModeType: playMode.listLoop,
  songs: [],
  currentSongIndex: 0,
  currentSongLyric: {},
  songCurrentTime: 0,
  favouriteSongs: [],
  playHistory: [],
  theme: 'netease'
}
