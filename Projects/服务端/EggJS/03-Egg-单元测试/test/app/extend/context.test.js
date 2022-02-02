'use strict'

const { app, assert } = require('egg-mock/bootstrap')

describe('test/app/extend/context.test.js', () => {
  // lifecycle hooks

  // test cases
  it('error model - default parameters', async () => {
    const ctx = app.mockContext()

    ctx.error()
    assert(ctx.body.code === 500)
    assert(ctx.body.msg === 'error')
    assert(ctx.body.data === undefined)
  })
})
