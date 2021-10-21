class AsyncParallelHook {
  constructor (args) {
    // 缓存列表
    this.tasks = []
    // 将来给订阅者传递的参数
    this.args = args
  }

  tapAsync (tag, task) {
    // 绑定订阅者
    this.tasks.push(task)
  }

  callAsync (...args) {
    // 检查参数个数
    if (args.length < this.args.length) {
      return new Error('参数个数不对')
    }
    // 去掉多余参数
    args = args.slice(0, this.args.length + 1)
    // 取出回调函数
    const finalTask = args.pop()
    // 定义回调函数
    let index = 0
    const done = () => {
      index++
      // 所有订阅函数执行完毕
      if (index === this.tasks.length) {
        finalTask()
      }
    }
    // 遍历执行所有订阅函数
    this.tasks.forEach((task) => {
      task(...args, done)
    })
  }

  tapPromise (tag, task) {
    // 绑定订阅者
    this.tasks.push(task)
  }

  promise (...args) {
    // 检查参数个数
    if (args.length < this.args.length) {
      return new Error('参数个数不对')
    }
    // 去掉多余参数
    args = args.slice(0, this.args.length + 1)
    // 执行所有订阅函数
    const result = this.tasks.map(task => task(...args))
    return Promise.all(result)
  }
}

module.exports = AsyncParallelHook
