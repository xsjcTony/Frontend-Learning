'use strict'

const { Controller } = require('egg')

class UserController extends Controller {
  async register () {
    const { ctx } = this

    // 校验数据
    const res = await ctx.validate('schema.user', this.ctx.request.body)

    if (res) {
      try {
        const result = await ctx.service.user.createUser(ctx.request.body)
        ctx.success(200, '注册成功', result)
      } catch (err) {
        ctx.error(400, err.message)
      }
    } else {
      ctx.error(400, ctx.helper.errorCode[400])
    }
  }

  async login () {
    const { ctx } = this

    try {
      const res = await ctx.service.user.checkUserCredentials(ctx.request.body)
      // 保存登录状态
      ctx.session.user = res
      ctx.success(200, '登录成功', res)
    } catch (err) {
      ctx.error(202, err.message)
    }
  }

  async test () {
    console.log(this.ctx.session.user)
  }
}

module.exports = UserController
