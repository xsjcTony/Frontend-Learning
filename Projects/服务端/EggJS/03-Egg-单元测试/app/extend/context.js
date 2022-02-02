'use strict'

module.exports = {
  success (code = 200, msg = 'success', data) {
    this.body = {
      code,
      msg,
      data
    }
  },

  error (code = 500, msg = 'error', data) {
    this.body = {
      code,
      msg,
      data
    }
  }
}
