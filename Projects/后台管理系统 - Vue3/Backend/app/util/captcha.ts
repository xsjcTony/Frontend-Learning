/* eslint '@typescript-eslint/no-unsafe-member-access': 'off' */
/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */

import { Context } from 'egg'
import svgCaptcha from 'svg-captcha'


export const generateCaptcha = (ctx: Context): string => {
  // generate captcha
  const captcha = svgCaptcha.create({
    size: 4,
    width: 160,
    height: 60,
    fontSize: 50,
    ignoreChars: '0oO1ilI',
    noise: 3,
    color: true,
    background: '#eee'
  })

  // save captcha
  ctx.session.captcha = captcha.text
  ctx.session.maxAge = 60 * 1000 // 1 min

  // send captcha to the client
  return captcha.data
}

export const verifyCaptcha = (ctx: Context, clientCaptcha: string): void => {
  const captchaText: string | null | undefined = ctx.session.captcha

  if (!captchaText) {
    // captcha expired
    throw new Error('Captcha has expired. Please refresh to get a new one.')
  } else if (captchaText.toLowerCase() !== clientCaptcha.toLowerCase()) {
    // invalid
    ctx.session.captcha = null
    throw new Error('Incorrect captcha.')
  }

  ctx.session.captcha = null
}
