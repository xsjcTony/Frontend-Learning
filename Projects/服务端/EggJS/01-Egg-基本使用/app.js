class AppBookHook {
  constructor (app) {
    this.app = app
  }

  // 程序启动完毕之后执行, 可以访问 app.server
  async serverDidReady () {
    await this.app.runSchedule('updateMessage.js')
  }
}

module.exports = AppBookHook
