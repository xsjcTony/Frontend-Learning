'use strict'

const { app, assert } = require('egg-mock/bootstrap')

describe('test/app/extend/helper.test.js', () => {
  // lifecycle hooks

  // test cases
  it('encryptByMd5 - length check (32)', async () => {
    const ctx = app.mockContext()

    assert(ctx.helper.encryptByMd5('123').length === 32)
  })
})
