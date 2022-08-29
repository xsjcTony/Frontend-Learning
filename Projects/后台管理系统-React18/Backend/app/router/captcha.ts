/* eslint '@typescript-eslint/unbound-method': 'off' */

import type { Application } from 'egg'


export default (app: Application): void => {
  const { controller, router } = app

  router.get('/api/v1/captcha', controller.util.generateCaptcha)
  router.get('/api/v1/verify-email', controller.util.sendVerificationEmail)
}
