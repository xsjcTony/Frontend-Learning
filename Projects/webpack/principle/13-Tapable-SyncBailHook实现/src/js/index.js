const SyncBailHook = require('./SyncBailHook')

class Lesson {
  constructor () {
    this.hooks = {
      // 创建发布者对象, 用于处理Vue订阅和发布
      // vue: new SyncHook(['description']),
      vue: new SyncBailHook(['description']),
    }
  }
  tap () {
    // 绑定事件 (订阅消息)
    this.hooks.vue.tap('zs', function (description) {
      console.log('zs', description)
    })
    this.hooks.vue.tap('ls', function (description) {
      console.log('ls', description)
      return 1
    })
    this.hooks.vue.tap('ww', function (description) {
      console.log('ww', description)
    })
  }
  call () {
    // 触发事件 (发布消息)
    this.hooks.vue.call('Vue课程上线了')
  }
}

const lesson = new Lesson()
lesson.tap()
lesson.call()
