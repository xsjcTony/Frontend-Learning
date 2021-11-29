/**
 * @description Generate a random integer, including min and max.
 * @param {number} min - Minimum integer, inclusive.
 * @param {number} max - Maximum integer, inclusive.
 * @returns {number} - The generated random integer.
 */
export const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const formatTime = (time) => {
  let day = Math.floor(time / (60 * 60 * 24))
  day = day >= 10 ? day : `0${ day }`

  let hour = Math.floor(time / (60 * 60) % 24)
  hour = hour >= 10 ? hour : `0${ hour }`

  let minute = Math.floor(time / 60 % 60)
  minute = minute >= 10 ? minute : `0${ minute }`

  let second = Math.floor(time % 60)
  second = second >= 10 ? second : `0${ second }`

  return {
    day,
    hour,
    minute,
    second
  }
}

export const setLocalStorage = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}

/**
 * @description Get value from Local Storage and convert by JSON.parse().
 * @param {string} key
 * @return {any}
 */
export const getLocalStorage = key => JSON.parse(window.localStorage.getItem(key))

export const parseLyric = (str) => {
  // split lyric string into Array
  const lyrics = str.split('\n')
  // get rid of the last empty string
  lyrics.pop()

  // regular expression for timestamp
  const timestampRegex = /\[\d*:\d*\.\d*]/g
  const minuteRegex = /\[\d*/i
  const secondRegex = /:\d*/i
  const milliSecondRegex = /\d*]/i

  // lyric object to be returned
  const lyricObj = {}

  for (const lyric of lyrics) {
    /* time stamp */
    // get timestamp string
    const timestampTemp = lyric.match(timestampRegex)
    // * Skip current timestamp if the format is wrong, e.g. "[00:00:000]"(wrong) instead of "[00:00.000]"(correct)
    if (!timestampTemp) {
      continue
    }
    const timestamp = timestampTemp[0]
    // get minute
    const minute = timestamp.match(minuteRegex)[0].substring(1)
    // get second
    const second = timestamp.match(secondRegex)[0].substring(1)
    // get millisecond
    const milliSecond = timestamp.match(milliSecondRegex)[0].slice(0, -1)
    // convert timestamp  milliseconds
    const time = parseInt(minute) * 60 * 1000 + parseInt(second) * 1000 + parseInt(milliSecond)

    /* fill lyric into object */
    lyricObj[time] = lyric.replace(timestampRegex, '').trim()
  }

  return lyricObj
}
