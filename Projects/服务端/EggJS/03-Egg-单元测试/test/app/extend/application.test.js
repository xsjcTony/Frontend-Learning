'use strict'

const { app, assert } = require('egg-mock/bootstrap')

describe('test/app/extend/application.test.js', () => {
  // lifecycle hooks

  // test cases
  it('cache', async () => {
    app.set('name', 'Aelita')
    assert(app.get('name') === 'Aelita')
  })
})
