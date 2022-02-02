'use strict'

const { app, assert } = require('egg-mock/bootstrap')

describe('test/app/controller/user.test.js', () => {
  // lifecycle hooks
  after(async () => {
    await app.model.User.destroy({
      where: {
        username: '123@qq.com'
      }
    })
  })

  // test cases
  it('register - success', async () => {
    const user = {
      username: '123@qq.com',
      password: 'abc123',
      gender: '男'
    }

    app.mockCsrf()
    const response = await app.httpRequest().post('/api/user/register').send(user)

    assert(response.body.code === 200)
  })

  it('register - username does not meet the schema', async () => {
    const user = {
      username: 'Aelita',
      password: 'abc123',
      gender: '男'
    }

    app.mockCsrf()
    const response = await app.httpRequest().post('/api/user/register').send(user)

    assert(response.body.code === 400)
  })

  it('register - password does not meet the schema', async () => {
    const user = {
      username: '123@qq.com',
      password: '123',
      gender: '男'
    }

    app.mockCsrf()
    const response = await app.httpRequest().post('/api/user/register').send(user)

    assert(response.body.code === 400)
  })
})
