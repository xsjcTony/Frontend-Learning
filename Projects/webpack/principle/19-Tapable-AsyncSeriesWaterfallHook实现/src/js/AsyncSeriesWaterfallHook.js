class AsyncSeriesWaterfallHook {
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
    const next = (err, ...data) => {
      const task = this.tasks[index]

      if (!task) {
        finalTask()
        return
      }

      if (index === 0) {
        task(...args, next)
      } else {
        if (err !== null) {
          finalTask()
        } else {
          task(...data, next)
        }
      }
      index++
    }
    next(null, ...args)
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
    const [firstTask, ...otherTasks] = this.tasks
    // async await 实现
    let data = await firstTask(...args)
    for (const task of otherTasks) {
      data = await task(data)
    }
    // reduce 的实现, 等价
    // return otherTasks.reduce((promise, task) => promise.then((data) => task(data)), firstTask(...args))
  }
}

module.exports = AsyncSeriesWaterfallHook
