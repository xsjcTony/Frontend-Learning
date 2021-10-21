const AsyncSeriesWaterfallHook = require('./AsyncSeriesWaterfallHook')

class Lesson {
  constructor () {
    this.hooks = {
      // 创建发布者对象, 用于处理Vue订阅和发布
      vue: new AsyncSeriesWaterfallHook(['description'])
    }
  }

  tap () {
    // 绑定事件 (订阅消息)
/*
    this.hooks.vue.tapAsync('zs', (description, callback) => {
      setTimeout(() => {
        console.log('zs', description)
        callback(null, 1)
      }, 3000)
    })
    this.hooks.vue.tapAsync('ls', (description, callback) => {
      setTimeout(() => {
        console.log('ls', description)
        callback(null, 2)
      }, 2000)
    })
    this.hooks.vue.tapAsync('ww', (description, callback) => {
      setTimeout(() => {
        console.log('ww', description)
        callback(null, 3)
      }, 1000)
    })
*/
    this.hooks.vue.tapPromise('zs', (description) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('zs', description)
          resolve(1)
          // reject('error')
        }, 3000)
      })
    })
    this.hooks.vue.tapPromise('ls', (description) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('ls', description)
          // resolve(2)
          reject('error')
        }, 2000)
      })
    })
    this.hooks.vue.tapPromise('ww', (description) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('ww', description)
          resolve(3)
        }, 1000)
      })
    })
  }

  call () {
    // 触发事件 (发布消息)
    // this.hooks.vue.callAsync('Vue课程上线了', () => { console.log('end') })
    this.hooks.vue.promise('Vue课程上线了').then(() => { console.log('end') }).catch((err) => { console.log(err) })
  }
}

const lesson = new Lesson()
lesson.tap()
lesson.call()
