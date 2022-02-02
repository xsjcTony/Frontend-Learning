'use strict'

module.exports = {
  isChrome () {
    return /chrome/.test(this.get('user-agent').toLowerCase())
  }
}
