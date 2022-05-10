/* eslint '@typescript-eslint/unbound-method': 'off' */
/* eslint '@typescript-eslint/no-unsafe-argument': 'off' */
/* eslint '@typescript-eslint/no-explicit-any': 'off' */

import type { Application } from 'egg'


export default (app: Application, authenticator: any): void => {
  const { controller, router } = app

  /**
   * Roles - REST API
   */
  router.get('/api/v1/roles', authenticator, controller.roles.getRolesByQuery)
  router.get('/api/v1/roles/:id', authenticator, controller.roles.getRoleById)
  router.post('/api/v1/roles', authenticator, controller.roles.createRole)
  router.delete('/api/v1/roles/:id', authenticator, controller.roles.deleteRole)
  router.put('/api/v1/roles/:id', authenticator, controller.roles.updateRole)
}
