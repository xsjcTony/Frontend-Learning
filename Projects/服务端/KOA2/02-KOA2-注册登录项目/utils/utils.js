/**
 * Generate cookie expire time after given hours
 * @param {number} hours
 * @return {string}
 */
export const generateCookieExpires = (hours) => {
  const date = new Date()
  date.setTime(date.getTime() + (hours * 60 * 60 * 1000))
  return date.toUTCString()
}


/**
 * Convert cookie String to Object.
 * @param {string} cookie
 * @return {Object}
 */
export const cookieToObject = (cookie) => {
  if (cookie === undefined) { return {} }

  const cookies = cookie.split(';')

  const res = {}

  cookies.forEach((cookie) => {
    const eqIndex = cookie.indexOf('=')

    if (eqIndex === -1) { return }

    const key = cookie.substring(0, eqIndex).trim()
    const value = cookie.substring(eqIndex + 1, cookie.length).trim()

    if (res[key] === undefined) { res[key] = value }
  })

  return res
}
