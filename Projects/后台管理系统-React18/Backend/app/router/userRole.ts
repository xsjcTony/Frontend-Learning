/* eslint '@typescript-eslint/unbound-method': 'off' */
/* eslint '@typescript-eslint/no-unsafe-argument': 'off' */
/* eslint '@typescript-eslint/no-explicit-any': 'off' */

import type { Application } from 'egg'


export default (app: Application, authenticator: any): void => {
  const { controller, router } = app

  /**
   * User_Role - REST API
   */
  router.post('/api/v1/user-role', authenticator, controller.userRole.assignUserRoles)
}
