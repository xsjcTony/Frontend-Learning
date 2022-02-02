'use strict'

const { app, assert } = require('egg-mock/bootstrap')

describe('test/app/extend/response.test.js', () => {
  // lifecycle hooks

  // test cases
  it('isSuccess - success', async () => {
    const ctx = app.mockContext()

    assert(ctx.response.isSuccess() === true)
  })
})
