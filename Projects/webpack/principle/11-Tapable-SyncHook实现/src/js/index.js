const SyncHook = require('./SyncHook')

class Lesson {
  constructor () {
    this.videos = {
      // 创建发布者对象, 用于处理Vue订阅和发布
      vue: new SyncHook(['description']),
      // 创建发布者对象, 用于处理React订阅和发布
      react: new SyncHook(['description'])
    }
  }
  // 订阅Vue课程
  studyVue (name, fn) {
    this.videos.vue.tap(name, fn)
  }
  // 订阅React课程
  studyReact (name, fn) {
    this.videos.react.tap(name, fn)
  }
  // 发布Vue到课消息
  callVue (...args) {
    this.videos.vue.call(...args)
  }
  // 发布React到课消息
  callReact (...args) {
    this.videos.react.call(...args)
  }
}

const lesson = new Lesson()
lesson.studyVue('zs', (description) => {
  console.log('zs', description)
})
lesson.studyVue('ls', (description) => {
  console.log('ls', description)
})
lesson.studyReact('ww', (description) => {
  console.log('ww', description)
})
lesson.studyReact('zq', (description) => {
  console.log('zq', description)
})
// lesson.callVue('Vue课程已经上线')
lesson.callReact('React课程已经上线')
