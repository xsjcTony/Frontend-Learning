const { createHash } = require('node:crypto')

module.exports = {
  _md5 (password) {
    return createHash('md5')
      .update(password)
      .digest('hex')
  },

  encryptByMd5 (password) {
    // 加盐处理
    return this._md5(`${ password }Aelita`)
  }

}
