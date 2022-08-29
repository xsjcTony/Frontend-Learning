/* eslint '@typescript-eslint/unbound-method': 'off' */

import type { Application } from 'egg'


export default (app: Application): void => {
  const { controller, router } = app

  /**
   * Normal
   */
  router.post('/api/v1/register', controller.user.create)
  router.post('/api/v1/login', controller.user.login)
  router.get('/api/v1/is-logged-in', controller.user.isLoggedIn)


  /**
   * OAuth - GitHub
   */
  router.get('/api/v1/github', controller.github.getLoginView)
  router.get('/api/v1/github/callback', controller.github.getAccessToken)


  /**
   * OAuth - bind account
   */
  router.post('/api/v1/oauth/bind', controller.user.bindAccount)


  /**
   * Reset password
   */
  router.post('/api/v1/reset-password/verify-email', controller.user.verifyEmail)
  router.put('/api/v1/reset-password/reset', controller.user.resetPassword)
}
