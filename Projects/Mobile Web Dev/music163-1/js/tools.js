(function () {
  // 防抖函数
  function debounce (fn, delay) {
    let timerId = null
    return function () {
      let self = this
      let args = arguments

      timerId && clearTimeout(timerId)
      timerId = setTimeout(function () {
        fn.apply(self, args)
      }, delay || 1000)
    }
  }

  // 函数节流
  function throttle (fn, delay) {
    let timerId = null
    let flag = true
    return function () {
      if (!flag) {
        return
      }
      flag = false

      let self = this
      let args = arguments

      timerId && clearTimeout(timerId)
      timerId = setTimeout(function () {
        flag = true
        fn.apply(self, args)
      }, delay || 500)
    }
  }

  function formatDate (format, date) {
    // deal with year
    // get yyyy
    let yearStr = format.match(/y+/) // find one or more "y"
    if (yearStr) {
      // replace yyyy by current year
      format = format.replace(yearStr[0], (date.getFullYear() + '').substr(4 - yearStr[0].length))
    }

    // deal with other time
    let obj = {
      'M+': date.getMonth() + 1, // month need to be added by 1
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    }

    // traverse to get all time
    for (let key in obj) {
      let formatStr = format.match(new RegExp(key))
      if (formatStr) {
        format = format.replace(formatStr[0], (formatStr[0].length === 1) ? obj[key] : ('00' + obj[key]).substr((obj[key] + '').length))
      }
    }

    return format
  }

  function formatNumber (num) {
    let res = 0

    if (num / 100000000 > 1) {
      const temp = num / 100000000 + ''
      if (!temp.includes('.')) {
        res = num / 100000000 + '亿'
      } else {
        res = (num / 100000000).toFixed(1) + '亿'
      }
    } else if (num / 10000 > 1) {
      const temp = num / 10000 + ''
      if (!temp.includes('.')) {
        res = num / 10000 + '万'
      } else {
        res = (num / 10000).toFixed(1) + '万'
      }
    } else {
      res = num
    }

    return res
  }

  function formatTime (time) {
    let dSecond = time / 1000;

    let day = Math.floor(dSecond / (60 * 60 * 24));
    day = day >= 10 ? day : "0" + day;

    let hour = Math.floor(dSecond / (60 * 60) % 24);
    hour = hour >= 10 ? hour : "0" + hour;

    let minute = Math.floor(dSecond / 60 % 60);
    minute = minute >= 10 ? minute : "0" + minute;

    let second = Math.floor(dSecond % 60);
    second = second >= 10 ? second : "0" + second;

    return {
      day: day,
      hour: hour,
      minute: minute,
      second: second
    }
  }

  function getSongs () {
    const songs = sessionStorage.getItem('songs')

    if (!songs) {
      return []
    }

    return JSON.parse(songs)
  }

  function setSong (id, name, singer) {
    let songs = getSongs()

    const song = {
      id: id,
      name: name,
      singer: singer
    }

    const index = songs.findIndex(element => element.id === id)

    if (index !== -1) {
      songs.splice(index, 1)
    }

    songs.unshift(song)
    sessionStorage.setItem('songs', JSON.stringify(songs))
  }

  function deleteSong (index) {
    let songs = getSongs()
    songs.splice(index, 1)
    sessionStorage.setItem('songs', JSON.stringify(songs))
    return songs.length
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  window.debounce = debounce
  window.throttle = throttle
  window.formatDate = formatDate
  window.formatNumber = formatNumber
  window.formatTime = formatTime
  window.getSongs = getSongs
  window.setSong = setSong
  window.deleteSong = deleteSong
  window.getRandomInt = getRandomInt
})()