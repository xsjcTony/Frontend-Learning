(function () {
  function getScreenWidthHeight() {
    let width, height;

    if(window.innerWidth) {
      width = window.innerWidth;
      height = window.innerHeight;
    }
    else if(document.compatMode === "BackCompat") {
      width = document.body.clientWidth;
      height = document.body.clientHeight;
    }
    else {
      width = document.documentElement.clientWidth;
      height = document.documentElement.clientHeight;
    }

    return {
      width: width,
      height: height
    }
  }

  function getPageScroll() {
    let x, y;

    if(window.innerWidth) {
      x = window.pageXOffset;
      y = window.pageYOffset;
    }
    else if(document.compatMode === "BackCompat") {
      x = document.body.scrollLeft;
      y = document.body.scrollTop;
    }
    else {
      x = document.documentElement.scrollLeft;
      y = document.documentElement.scrollTop;
    }

    return {
      x: x,
      y: y
    }
  }

  function addEvent(element, name, fn) {
    if(element.attachEvent) { // <IE9
      element.attachEvent("on" + name, fn);
    }
    else { // >=IE9
      element.addEventListener(name, fn);
    }
  }

  function getStyleAttribute(element, name) {
    if(element.currentStyle) {
      return element.currentStyle[name];
    }
    else {
      return getComputedStyle(element)[name];
    }
  }

  function linearAnimation(ele, obj, fn) {
    clearInterval(ele.timerId);
    ele.timerId = setInterval(function () {
      let flag = true;
      for(let key in obj) {
        let target = obj[key];
        // 1.拿到元素当前的位置
        let style = getComputedStyle(ele);
        let begin = parseFloat(style[key]) || 0;
        // 2.定义变量记录步长
        let step = (begin - target) > 0 ? -13 : 13;
        // 3.计算新的位置
        begin += step;
        console.log(Math.abs(target - begin), Math.abs(step));
        if(Math.abs(target - begin) > Math.abs(step)) {
          flag = false;
        }
        else {
          begin = target;
        }
        // 4.重新设置元素的位置
        ele.style[key] = begin + "px";
      }
      if(flag) {
        clearInterval(ele.timerId);
        fn && fn();
      }
    }, 100);
  }

  function easeAnimation(ele, obj, fn) {
    clearInterval(ele.timerId);
    ele.timerId = setInterval(function () {
      let flag = true;
      for(let key in obj) {
        let target = obj[key];
        // 1.拿到元素当前的位置
        let style = getComputedStyle(ele);
        let begin = parseInt(style[key]) || 0;
        // 2.定义变量记录步长
        // 公式: (结束位置 - 开始位置) * 缓动系数(0 ~1)
        let step = (target - begin) * 0.3;
        // 3.计算新的位置
        begin += step;
        if(Math.abs(Math.floor(step)) > 1) {
          flag = false;
        }
        else {
          begin = target;
        }
        // 4.重新设置元素的位置
        ele.style[key] = begin + "px";
      }
      if(flag) {
        clearInterval(ele.timerId);
        fn && fn();
      }
    }, 100);
  }

  function easeAnimationFloor(target) {
    clearInterval(this.timerId);
    this.timerId = setInterval(function () {
      let begin = getPageScroll().y;
      let step = (target - begin) * 0.3;
      begin += step;

      if(Math.abs(Math.floor(step)) <= 1) {
        clearInterval(timerId);
        window.scrollTo(0, target);
        return;
      }

      window.scrollTo(0, begin);
    }, 50);
  }

  function dateFormat(format, date) {
    // deal with year
    // get yyyy
    let yearStr = format.match(/y+/); // find one or more "y"
    if(yearStr) {
      // replace yyyy by current year
      format = format.replace(yearStr[0], (date.getFullYear() + "").substr(4 - yearStr[0].length));
    }

    // deal with other time
    let obj = {
      "M+": date.getMonth() + 1, // month need to be added by 1
      "d+": date.getDate(),
      "h+": date.getHours(),
      "m+": date.getMinutes(),
      "s+": date.getSeconds()
    };

    // traverse to get all time
    for(let key in obj) {
      let formatStr = format.match(new RegExp(key));
      format = format.replace(formatStr[0], (formatStr[0].length === 1) ? obj[key] : ("00" + obj[key]).substr((obj[key] + "").length));
    }

    return format;
  }


  // 防抖函数
  function debounce(fn, delay) {
    let timerId = null;
    return function () {
      let self = this;
      let args = arguments;

      timerId && clearTimeout(timerId);
      timerId = setTimeout(function () {
        fn.apply(self, args);
      }, delay || 1000);
    }
  }

  // 函数节流
  function throttle(fn, delay) {
    let timerId = null;
    let flag = true;
    return function () {
      if(!flag) {
        return;
      }
      flag = false;

      let self = this;
      let args = arguments;

      timerId && clearTimeout(timerId);
      timerId = setTimeout(function () {
        flag = true;
        fn.apply(self, args);
      }, delay || 500);
    }
  }

  function preLoadImage(url, fn) {
    let img = document.createElement("img");
    img.src = url;
    img.onload = function () {
      fn(img);
    }
  }

  function preLoadImages(urls, fn) {
    let imageCount = urls.length;
    let loadedCount = 0;
    let images = [];
    for(let i = 0; i < imageCount; i++) {
      let url = urls[i];
      preLoadImage(url, function (img) {
        images.push(img);
        loadedCount++;
        if(loadedCount === imageCount) {
          fn(images);
        }
      })
    }
  }

  window.getScreenWidthHeight = getScreenWidthHeight;
  window.getPageScroll = getPageScroll;
  window.addEvent = addEvent;
  window.getStyleAttribute = getStyleAttribute;
  window.linearAnimation = linearAnimation;
  window.easeAnimation = easeAnimation;
  window.easeAnimationFloor = easeAnimationFloor;
  window.dateFormat = dateFormat;
  window.debounce = debounce;
  window.throttle = throttle;
  window.preLoadImages = preLoadImages;
})();