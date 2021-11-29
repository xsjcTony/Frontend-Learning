/* eslint-disable ember-suave/lines-between-object-properties */

import Network from './network'

export const HomeAPI = {
  getBanner: () => Network.get('/banner', { type: 2 }),
  getPlaylist: (limit = 30) => Network.get('/personalized', { limit }),
  getNewAlbum: () => Network.get('/album/newest'),
  getNewSong: () => Network.get('/personalized/newsong'),
  getPlaylistDetail: id => Network.get('/playlist/detail', { id }),
  getAlbumDetail: id => Network.get('/album', { id }),
  getArtistDetail: id => Network.get('/artists', { id })
}

export const SongAPI = {
  getSongDetail: ids => Network.get('/song/detail', { ids }),
  getLyric: id => Network.get('/lyric', { id }),
  getSongUrl: id => Network.get('/song/url', { id })
}

export const ArtistsAPI = {
  /**
   * @description Get artists based on type, area and initial.
   * @param {number} type
   * @param {number} area
   * @param {string} initial - `"-1"` for top artists.
   * @param {number} offset
   * @param {number} limit
   * @return {Promise<unknown>}
   */
  getArtists: (type = -1, area = -1, initial = '-1', offset = 0, limit = 30) => new Promise((resolve, reject) => {
    Network.get('/artist/list', { type, area, initial, offset, limit })
      .then((res) => { resolve(res.artists) })
      .catch((err) => { reject(err) })
  }),

  /**
   * @description Get all artists needed, including 5 top artists and 30 artists which start with each letter from `A` to `Z`.
   * @returns {Promise<unknown>}
   */
  getAllArtists () {
    const keys = ['热']
    const requests = [this.getArtists(-1, -1, '-1', 0, 5)]
    for (let i = 65; i <= 90; i++) {
      const character = String.fromCharCode(i)
      keys.push(character)
      requests.push(this.getArtists(-1, -1, character, 0, 30))
    }

    return new Promise((resolve, reject) => {
      Network.all(requests)
        .then((res) => { resolve({ keys, artists: res }) })
        .catch((err) => { reject(err) })
    })
  }
}

export const RankingAPI = {
  getTopLists: () => {
    const category = {
      officialList: [
        { name: '飙升榜' },
        { name: '新歌榜' },
        { name: '原创榜' },
        { name: '热歌榜' }
      ],

      recommendedList: [
        { name: '云音乐说唱榜' },
        { name: '云音乐古典榜' },
        { name: '云音乐电音榜' },
        { name: '云音乐ACG榜' },
        { name: '云音乐韩语榜' },
        { name: '云音乐国电榜' }
      ],

      globalList: [
        { name: 'UK排行榜周榜' },
        { name: '美国Billboard榜' },
        { name: 'Beatport全球电子舞曲榜' },
        { name: '日本Oricon榜' },
        { name: '云音乐欧美热歌榜' },
        { name: '云音乐欧美新歌榜' }
      ],

      otherList: [
        { name: 'KTV唛榜' },
        { name: '法国 NRJ Vos Hits 周榜' },
        { name: '云音乐ACG动画榜' },
        { name: '云音乐ACG游戏榜' },
        { name: '云音乐ACG VOCALOID榜' },
        { name: '中国新乡村音乐排行榜' },
        { name: '云音乐日语榜' },
        { name: '云音乐摇滚榜' },
        { name: '云音乐古风榜' },
        { name: '潜力爆款榜' },
        { name: '云音乐民谣榜' },
        { name: '听歌识曲榜' },
        { name: '网络热歌榜' },
        { name: '俄语榜' },
        { name: '越南语榜' },
        { name: '中文DJ榜' },
        { name: '俄罗斯top hit流行音乐榜' }
      ]
    }

    const titles = {
      officialList: '官方榜',
      recommendedList: '推荐榜',
      globalList: '全球榜',
      otherList: '更多榜单'
    }

    return new Promise((resolve, reject) => {
      Network.get('/toplist/detail')
        .then((res) => {
          res.list.forEach((list) => {
            category:
            for (const key in category) {
              for (const myList of category[key]) {
                if (myList.name === list.name) {
                  myList.list = list
                  break category
                }
              }
            }
          })

          category.titles = titles

          resolve(category)
        })
        .catch(err => reject(err))
    })
  },
  getListDetail: id => Network.get('/playlist/detail', { id })
}

export const SearchAPI = {
  getSearchResult: (keywords, type) => Network.get('/search', { keywords, type }),
  getHotKeywords: () => Network.get('/search/hot')
}
