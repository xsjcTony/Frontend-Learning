'use strict'

const { Service } = require('egg')

class UserService extends Service {
  async createUser ({ username, password, gender }) {
    // 检查用户是否存在
    const user = await this._getUserByUsername(username)

    if (!user) {
      // 用户若不存在就注册
      const res = await this.ctx.model.User.create({
        username,
        password: this.ctx.helper.encryptByMd5(password),
        gender
      })
      return res.toJSON()
    } else {
      // 用户若存在则抛出异常
      throw new Error('用户名已存在')
    }
  }

  async _getUserByUsername (username) {
    return await this.ctx.model.User.findOne({
      where: {
        username
      }
    })
  }

  async checkUserCredentials ({ username, password }) {
    const res = await this.ctx.model.User.findOne({
      where: {
        username,
        password: this.ctx.helper.encryptByMd5(password)
      }
    })

    if (res) {
      const user = res.toJSON()
      delete user.password
      return user
    } else {
      throw new Error('用户名或密码不正确')
    }
  }
}

module.exports = UserService
