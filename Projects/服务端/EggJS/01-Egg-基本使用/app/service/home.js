const { Service } = require('egg')

class HomeService extends Service {
  async findNews () {
    const res = await this.ctx.curl('http://127.0.0.1:7001/user?name=Tony&age=24')
    return JSON.parse(res.data)
  }

  async insertUser ({ name, age }) {
    try {
      const res = await this.ctx.model.User.create({ name, age })
      console.log(res)
      return res.toJSON()
    } catch (err) {
      console.error(err)
      return '插入失败'
    }
  }
}

module.exports = HomeService
