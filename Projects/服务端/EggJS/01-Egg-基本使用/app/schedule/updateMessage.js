const { Subscription } = require('egg')
const { Buffer } = require('node:buffer')

class UpdateCache extends Subscription {
  static get schedule () {
    return {
      interval: '10s', // 每 3秒 执行一次 , 1分钟则为 '1m', 以此类推
      type: 'all' // 指定是否所有 NodeJS 进程都需要执行该定时任务, all 为全部执行, worker 为随机一个进程执行
    }
  }

  async subscribe () {
    const response = await this.ctx.curl('http://127.0.0.1:7001/getMsg')
    this.ctx.app.latestMsg = Buffer.from(response.data).toString()
  }
}

module.exports = UpdateCache
