(function () {
  function getScreenWidthHeight () {
    let width, height

    if (window.innerWidth) {
      width = window.innerWidth
      height = window.innerHeight
    } else if (document.compatMode === 'BackCompat') {
      width = document.body.clientWidth
      height = document.body.clientHeight
    } else {
      width = document.documentElement.clientWidth
      height = document.documentElement.clientHeight
    }

    return {
      width: width,
      height: height
    }
  }

  function getPageScroll () {
    let x, y

    if (window.innerWidth) {
      x = window.pageXOffset
      y = window.pageYOffset
    } else if (document.compatMode === 'BackCompat') {
      x = document.body.scrollLeft
      y = document.body.scrollTop
    } else {
      x = document.documentElement.scrollLeft
      y = document.documentElement.scrollTop
    }

    return {
      x: x,
      y: y
    }
  }

  function addEvent (element, name, fn) {
    if (element.attachEvent) { // <IE9
      element.attachEvent('on' + name, fn)
    } else { // >=IE9
      element.addEventListener(name, fn)
    }
  }

  function getStyleAttribute (element, name) {
    if (element.currentStyle) {
      return element.currentStyle[name]
    } else {
      return getComputedStyle(element)[name]
    }
  }

  function linearAnimation (ele, obj, fn) {
    clearInterval(ele.timerId)
    ele.timerId = setInterval(function () {
      let flag = true
      for (let key in obj) {
        let target = obj[key]
        // 1.拿到元素当前的位置
        let style = getComputedStyle(ele)
        let begin = parseFloat(style[key]) || 0
        // 2.定义变量记录步长
        let step = (begin - target) > 0 ? -13 : 13
        // 3.计算新的位置
        begin += step
        console.log(Math.abs(target - begin), Math.abs(step))
        if (Math.abs(target - begin) > Math.abs(step)) {
          flag = false
        } else {
          begin = target
        }
        // 4.重新设置元素的位置
        ele.style[key] = begin + 'px'
      }
      if (flag) {
        clearInterval(ele.timerId)
        fn && fn()
      }
    }, 100)
  }

  function easeAnimation (ele, obj, fn) {
    clearInterval(ele.timerId)
    ele.timerId = setInterval(function () {
      let flag = true
      for (let key in obj) {
        let target = obj[key]
        // 1.拿到元素当前的位置
        let style = getComputedStyle(ele)
        let begin = parseInt(style[key]) || 0
        // 2.定义变量记录步长
        // 公式: (结束位置 - 开始位置) * 缓动系数(0 ~1)
        let step = (target - begin) * 0.3
        // 3.计算新的位置
        begin += step
        if (Math.abs(Math.floor(step)) > 1) {
          flag = false
        } else {
          begin = target
        }
        // 4.重新设置元素的位置
        ele.style[key] = begin + 'px'
      }
      if (flag) {
        clearInterval(ele.timerId)
        fn && fn()
      }
    }, 100)
  }

  function easeAnimationFloor (target) {
    clearInterval(this.timerId)
    this.timerId = setInterval(function () {
      let begin = getPageScroll().y
      let step = (target - begin) * 0.3
      begin += step

      if (Math.abs(Math.floor(step)) <= 1) {
        clearInterval(timerId)
        window.scrollTo(0, target)
        return
      }

      window.scrollTo(0, begin)
    }, 50)
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

  function preLoadImage (url, fn) {
    let img = document.createElement('img')
    img.src = url
    img.onload = function () {
      fn(img)
    }
  }

  function preLoadImages (urls, fn) {
    let imageCount = urls.length
    let loadedCount = 0
    let images = []
    for (let i = 0; i < imageCount; i++) {
      let url = urls[i]
      preLoadImage(url, function (img) {
        images.push(img)
        loadedCount++
        if (loadedCount === imageCount) {
          fn(images)
        }
      })
    }
  }

  /**
   * Ajax function returning a Promise
   * @param {Object} options - An object including HTTP request type (either GET or POST), url, data, timeout, success callback function and error callback function.
   * @returns {Promise} A Promise object which status is fulfilled if request succeed or rejected if request failed.
   */
  function ajax (options) {
    return new Promise((resolve, reject) => {
      // ajax
      let xhr = new XMLHttpRequest()
      let timer

      // GET
      if (options.type.toUpperCase() === 'GET') {
        // deal with obj
        let res = []
        for (let key in options.data) {
          res.push(`${encodeURIComponent(key)}=${encodeURIComponent(options.data[key])}`)
        }
        options.url = `${options.url}?${res.join('&')}`

        xhr.open(options.type, options.url, true)
        xhr.send()
      }
      // POST
      else if (options.type.toUpperCase() === 'POST') {
        // deal with obj
        let res = []
        for (let key in options.data) {
          res.push(`${encodeURIComponent(key)}=${encodeURIComponent(options.data[key])}`)
        }
        let requestHeader = res.join('&')

        xhr.open(options.type, options.url, true)
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
        xhr.send(requestHeader)
      }
      // invalid type
      else {
        console.log('Invalid ajax type: ' + options.type)
        return
      }

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          clearInterval(timer)
          if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
            resolve(xhr)
          } else {
            reject(xhr)
          }
        }
      }

      // timeout > 0
      if (options.timeout) {
        timer = setInterval(function () {
          xhr.abort()
          clearInterval(timer)
        }, options.timeout)
      }
    })
  }

  /**
   * Add cookie.
   * @param {string} key - Key of the cookie.
   * @param {string} value - Value of the cookie.
   * @param {number} [expiryDays] - Expire time in days of the cookie in GMT format.
   * @param {string} [path] - Path of the cookie.
   * @param {string} [domain] - Domain of the cookie.
   */
  function addCookie (key, value, expiryDays, path, domain) {
    // deal with default arguments value
    path = path || window.location.pathname.slice(0, window.location.pathname.lastIndexOf('/'))
    domain = domain || document.domain
    if (!expiryDays) {
      document.cookie = `${key}=${value};path=${path};domain=${domain};`
    } else {
      let date = new Date()
      date.setDate(date.getDate() + expiryDays)
      document.cookie = `${key}=${value};expires=${expiryDays};path=${path};domain=${domain};`
    }
  }

  /**
   * Get cookie value based on given key.
   * @param {string} key - Key of the cookie to search for.
   * @returns {string} - The value of the cookie, undefined if key is not found.
   */
  function getCookie (key) {
    let res = document.cookie.split(';')
    for (let i = 0; i < res.length; i++) {
      let temp = res[i].split('=')
      if (temp[0].trim() === key) {
        return temp[1]
      }
    }
  }

  /**
   * Delete cookie based on given key.
   * @param {string} key - Key of the cookie to be deleted.
   * @param {string} [path] - Path of the cookie to be deleted.
   */
  function deleteCookie (key, path) {
    if (path) {
      addCookie(key, getCookie(key), -1, path)
    } else {
      addCookie(key, getCookie(key), -1)
    }
  }

  function jsonp (options) {
    options = options || {}
    let callbackName = ('jQuery' + Math.random()).replace('.', '')

    let url = options.url
    // jsonp key specified
    if (options.jsonp) {
      url += '?' + options.jsonp + '='
    } else {
      url += '?callback='
    }
    // jsonp value specified
    if (options.jsonpCallback) {
      callbackName = options.jsonpCallback
    }
    url += callbackName
    // data specified
    if (options.data) {
      url += '&' + objToStr(options.data)
    }
    // get CORS data
    let scriptTag = document.createElement('script')
    scriptTag.src = url
    document.body.appendChild(scriptTag)
    // define callback function
    window[callbackName] = function (data) {
      // delete used script tag
      document.body.removeChild(scriptTag)
      options.success(data)
    }

    function objToStr (obj) {
      obj.t = (Math.random() + '').replace('.', '')
      let arr = []
      for (let key in obj) {
        arr.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
      }
      return arr.join('&')
    }
  }

  window.getScreenWidthHeight = getScreenWidthHeight
  window.getPageScroll = getPageScroll
  window.addEvent = addEvent
  window.getStyleAttribute = getStyleAttribute
  window.linearAnimation = linearAnimation
  window.easeAnimation = easeAnimation
  window.easeAnimationFloor = easeAnimationFloor
  window.formatDate = formatDate
  window.formatTime = formatTime
  window.formatNumber = formatNumber
  window.debounce = debounce
  window.throttle = throttle
  window.preLoadImages = preLoadImages
  window.ajax = ajax
  window.addCookie = addCookie
  window.getCookie = getCookie
  window.deleteCookie = deleteCookie
  window.jsonp = jsonp
})()