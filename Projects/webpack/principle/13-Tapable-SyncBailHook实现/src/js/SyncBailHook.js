class SyncBailHook {
  constructor (args) {
    // 缓存列表
    this.tasks = []
    // 将来给订阅者传递的参数
    this.args = args
  }
  tap (tag, task) {
    // 绑定订阅者
    this.tasks.push(task)
  }
  call (...args) {
    // 检查参数个数
    if (args.length < this.args.length) {
      return new Error('参数个数不对')
    }
    // 去掉多余参数
    args = args.slice(0, this.args.length)
    // 联系订阅者
    this.tasks.some((task) => {
      const res = task(...args)
      if (res !== undefined) {
        return true
      }
    })
  }
}

module.exports = SyncBailHook
