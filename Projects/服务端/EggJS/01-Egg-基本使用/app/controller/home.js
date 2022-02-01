const { Controller } = require('egg')

class HomeController extends Controller {
  async index () {
    this.ctx.body = 'Tony loves Lily.'
  }

  // 传统 get 请求参数
  async getQuery () {
    this.ctx.body = this.ctx.query // 或 this.ctx.request.query
  }

  // 动态路由 get 请求参数
  async getParams () {
    this.ctx.body = this.ctx.params
  }

  // post 请求参数
  async getBody () {
    this.ctx.body = this.ctx.request.body
  }

  // 动态资源
  async getHome () {
    await this.ctx.render('index', {
      msg: 'Aelitaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    })
  }

  // 处理网络数据 (调用 service)
  async getNews () {
    this.ctx.body = await this.service.home.findNews()
  }

  // 设置 cookie
  async setCookie () {
    this.ctx.cookies.set('name', 'Tony', {
      path: '/',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      httpOnly: true,
      signed: true, // 对 cookie 进行签名
      encrypt: true
    })
    this.ctx.body = 'cookie has been successfully set'
  }

  // 获取 cookie
  async getCookie () {
    this.ctx.body = this.ctx.cookies.get('name', {
      signed: true,
      encrypt: true
    })
  }

  // 日志 test
  async loggerTest () {
    this.ctx.logger.debug('debug logger')
    this.ctx.logger.info('info logger')
    this.ctx.logger.warn('warn logger')
    this.ctx.logger.error('error logger')
    this.ctx.body = 'logging done'
  }

  // 定时任务 test
  async getMsg () {
    this.ctx.body = `The latest message ${ Math.random().toFixed(2) }`
  }

  // 定时任务 + 渲染 test
  async scheduleRender () {
    await this.ctx.render('index', {
      msg: this.ctx.app.latestMsg
    })
  }

  // Application 扩展 test
  async testApplicationExtend () {
    this.ctx.body = this.ctx.app.myTest('123')
  }

  // Context 扩展 test
  async testContextExtend () {
    this.ctx.body = this.ctx.myTest('abc')
  }

  // Request 扩展 test
  async testRequestExtend () {
    this.ctx.body = this.ctx.request.myTest('666')
  }

  // Response 扩展 test
  async testResponseExtend () {
    this.ctx.body = this.ctx.response.myTest('888')
  }

  // Helper 扩展 test
  async testHelperExtend () {
    this.ctx.body = this.ctx.helper.encryptByMd5('abc123')
  }

  // I18n test
  async testI18n () {
    return await this.ctx.render('index', {
      msg: this.ctx.__('Email')
    })
  }

  // Sequelize + MySQL
  async insertUser () {
    this.ctx.body = await this.ctx.service.home.insertUser(this.ctx.query)
  }
}

module.exports = HomeController
