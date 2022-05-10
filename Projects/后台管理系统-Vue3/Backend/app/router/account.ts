/* eslint '@typescript-eslint/unbound-method': 'off' */

import type { Application } from 'egg'


export default (app: Application): void => {
  const { controller, router } = app

  /**
   * Normal
   */
  router.post('/register', controller.user.create)
  router.post('/login', controller.user.login)
  router.get('/is-logged-in', controller.user.isLoggedIn)


  /**
   * Oauth - GitHub
   */
  router.get('/github', controller.github.getLoginView)
  router.get('/github/callback', controller.github.getAccessToken)
}
