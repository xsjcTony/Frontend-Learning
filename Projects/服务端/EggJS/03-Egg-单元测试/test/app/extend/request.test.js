'use strict'

const { app, assert } = require('egg-mock/bootstrap')

describe('test/app/extend/request.test.js', () => {
  // lifecycle hooks

  // test cases
  it('isChrome - Chrome', async () => {
    const ctx = app.mockContext({
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36'
      }
    })

    assert(ctx.request.isChrome() === true)
  })

  it('isChrome - FireFox', async () => {
    const ctx = app.mockContext({
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0'
      }
    })

    assert(ctx.request.isChrome() === false)
  })
})
