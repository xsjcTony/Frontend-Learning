/* eslint '@typescript-eslint/unbound-method': 'off' */
/* eslint '@typescript-eslint/no-unsafe-argument': 'off' */
/* eslint '@typescript-eslint/no-explicit-any': 'off' */

import type { Application } from 'egg'


export default (app: Application, authenticator: any): void => {
  const { controller, router } = app

  /**
   * Roles - REST API
   */
  router.get('/api/v1/privileges', authenticator, controller.privileges.getPrivilegesByQuery)
  router.post('/api/v1/privileges', authenticator, controller.privileges.createPrivilege)
  router.put('/api/v1/privileges/:id', authenticator, controller.privileges.updatePrivilege)
  router.delete('/api/v1/privileges/:id', authenticator, controller.privileges.deletePrivilege)
}
