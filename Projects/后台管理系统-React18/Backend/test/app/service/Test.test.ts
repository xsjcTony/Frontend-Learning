/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */
/* eslint '@typescript-eslint/no-unsafe-call': 'off' */
/* eslint '@typescript-eslint/no-unsafe-member-access': 'off' */

import assert from 'assert'
import { Context } from 'egg'
import { app } from 'egg-mock/bootstrap'


describe('test/app/service/Test.test.js', () => {
  let ctx: Context

  before(async () => {
    ctx = app.mockContext()
  })

  it('sayHi', async () => {
    const result = await ctx.service.test.sayHi('egg')
    assert(result === 'hi, egg')
  })
})
