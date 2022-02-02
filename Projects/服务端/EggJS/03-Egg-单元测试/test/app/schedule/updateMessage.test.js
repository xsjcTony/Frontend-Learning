'use strict'

const { app, assert } = require('egg-mock/bootstrap')

describe('test/app/schedule/updateMessage.test.js', () => {
  // lifecycle hooks

  // test cases
  it('updateMessage - twice', async () => {
    await app.runSchedule('updateMessage.js')
    assert(app.latestMsg === 'Aelita+1')
    await app.runSchedule('updateMessage.js')
    assert(app.latestMsg === 'Aelita+2')
  })
})
