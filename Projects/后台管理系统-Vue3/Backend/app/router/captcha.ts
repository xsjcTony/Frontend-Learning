/* eslint '@typescript-eslint/unbound-method': 'off' */

import type { Application } from 'egg'


export default (app: Application): void => {
  const { controller, router } = app

  router.get('/captcha', controller.util.generateCaptcha)
  router.get('/verify-email', controller.util.sendVerificationEmail)
}
