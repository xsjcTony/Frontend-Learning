import { createHash } from 'crypto'


const salt = 'TonyLovesLily'


/**
 * Encrypt password by MD5 algorithm
 * @param password
 * @return {string}
 * @private
 */
const _md5 = (password) => {
  return createHash('md5')
    .update(password)
    .digest('hex')
}


/**
 * Encrypt password by adding salt & MD5 algorithm
 * @param {string} password
 * @return {string}
 */
export const encryptByMd5 = (password) => {
  // 加盐处理
  return _md5(password + salt)
}
