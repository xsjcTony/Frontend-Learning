class AsyncSeriesHook {
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
    // 遍历执行订阅函数
    let index = 0
    const next = () => {
      if (index === this.tasks.length) {
        finalTask()
        return
      }
      const task = this.tasks[index]
      index++
      task(...args, next)
    }
    next()
  }

  tapPromise (tag, task) {
    // 绑定订阅者
    this.tasks.push(task)
  }

  async promise (...args) {
    // 检查参数个数
    if (args.length < this.args.length) {
      return new Error('参数个数不对')
    }
    // 去掉多余参数
    args = args.slice(0, this.args.length + 1)
    // 执行所有订阅函数
    for (const task of this.tasks) {
      await task(...args)
    }
    // 不用async的写法, 等价于上面的for...of
    // return this.tasks.reduce((promise, task) => promise.then(() => task(...args)), Promise.resolve())
  }
}

module.exports = AsyncSeriesHook
