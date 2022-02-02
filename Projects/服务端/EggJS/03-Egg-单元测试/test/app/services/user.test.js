'use strict'

const { app, assert } = require('egg-mock/bootstrap')

describe('test/app/service/user.test.js', () => {
  // lifecycle hooks
  after(async () => {
    await app.model.User.destroy({
      where: {
        username: '123@qq.com'
      }
    })
  })

  // test cases
  it('createUser - success', async () => {
    const ctx = app.mockContext()

    const user = {
      username: '123@qq.com',
      password: 'abc123',
      gender: '男'
    }

    const res = await ctx.service.user.createUser(user)

    assert(res.username === '123@qq.com')
  })

  it('createUser - user already exists', async () => {
    const ctx = app.mockContext()

    const user = {
      username: '123@qq.com',
      password: 'abc123',
      gender: '男'
    }

    try {
      await ctx.service.user.createUser(user)
      assert.fail('User does not "already exists"')
    } catch (err) {
      assert(err.message === '用户名已存在')
    }
  })
})
