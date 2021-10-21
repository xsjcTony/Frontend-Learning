const {
  SyncHook,
  SyncBailHook,
  SyncWaterfallHook,
  SyncLoopHook
} = require('tapable')

class Lesson {
  constructor () {
    this.hooks = {
      // 创建发布者对象, 用于处理Vue订阅和发布
      // vue: new SyncHook(['description']),
      // vue: new SyncBailHook(['description']),
      // vue: new SyncWaterfallHook(['description']),
      vue: new SyncLoopHook(['description']),
    }
    this.index = 0
  }
  tap () {
    // 绑定事件 (订阅消息)
    this.hooks.vue.tap('zs', (description) => {
      console.log('zs', description)
      // return 1
    })
    this.hooks.vue.tap('ls', (description) => {
      console.log('ls', description)
      // return 2
      this.index++
      return this.index === 3 ? undefined : 'xxx'
    })
    this.hooks.vue.tap('ww', (description) => {
      console.log('ww', description)
      // return 3
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
