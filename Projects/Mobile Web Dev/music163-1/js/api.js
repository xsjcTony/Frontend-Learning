;(function () {
  axios.defaults.baseURL = 'http://127.0.0.1:3000'
  axios.defaults.timeout = 5000

  class AHttp {
    static get (url = '', data = {}) {
      return new Promise((resolve, reject) => {
        axios.get(url, { params: data })
          .then(function (response) {
            resolve(response.data)
          })
          .catch(function (error) {
            reject(error)
          })
      })
    }

    static post (url = '', data = {}) {
      return new Promise((resolve, reject) => {
        axios.post(url, { params: data })
          .then(function (response) {
            resolve(response.data)
          })
          .catch(function (error) {
            reject(error)
          })
      })
    }
  }

  class HomeAPI {
    static getBanner () {
      return AHttp.get('/banner', { type: 2 })
    }

    static getRecommend (limit) {
      return AHttp.get('/personalized', { limit: limit })
    }

    static getExclusive () {
      return AHttp.get('/personalized/privatecontent')
    }

    static getAlbum (limit) {
      return AHttp.get('/album/new', { limit: limit })
    }

    static getMV () {
      return AHttp.get('/personalized/mv')
    }

    static getBroadcast () {
      return AHttp.get('/personalized/djprogram')
    }

    static getTrending () {
      return AHttp.get('/search/hot/detail')
    }

    static getSearchSuggest (keywords) {
      return AHttp.get('/search/suggest', {
        keywords: keywords,
        type: 'mobile'
      })
    }
  }

  class SearchAPI {
    /**
     * Fetch search data from server.
     * @param {string} keywords - keywords to search.
     * @param {number} limit - number of data to fetch.
     * @param {number} offset - start position.
     * @param {number} type - 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
     * @returns {Promise} - AHttp request result
     */
    static getSearch (keywords = '', offset = 0, limit = 30, type = 1) {
      return AHttp.get('/search', {
        keywords: keywords,
        offset: offset,
        limit: limit,
        type: type
      })
    }
  }

  class MusicAPI {
    static getSongDetail (ids) {
      return AHttp.get('/song/detail', { ids: ids })
    }

    static getSongUrl (id) {
      return AHttp.get('/song/url', { id: id })
    }

    static getSongLyric (id) {
      return AHttp.get('/lyric', { id: id })
    }
  }

  class DetailedAPI {
    static getDjRadioDetail (rid) {
      return AHttp.get('/dj/detail', { rid: rid })
    }

    static getDjRadioProgram (rid, asc = false, limit = 30, offset = 0) {
      return AHttp.get('/dj/program', {
        rid: rid,
        asc: asc,
        limit: limit,
        offset: offset
      })
    }
  }

  window.AHttp = AHttp
  window.HomeAPI = HomeAPI
  window.SearchAPI = SearchAPI
  window.MusicAPI = MusicAPI
  window.DetailedAPI = DetailedAPI
})()