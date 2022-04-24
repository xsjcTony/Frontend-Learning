/* eslint '@typescript-eslint/unbound-method': 'off' */
/* eslint '@typescript-eslint/no-unsafe-argument': 'off' */
/* eslint '@typescript-eslint/no-explicit-any': 'off' */

import type { Application } from 'egg'


export default (app: Application, authenticator: any): void => {
  const { controller, router } = app

  /**
   * Users - REST API
   */
  router.get('/api/v1/users', authenticator, controller.users.getUsersByQuery)
  router.get('/api/v1/users/:id', authenticator, controller.users.getUserById)
  router.post('/api/v1/users', authenticator, controller.users.createUser)
  router.delete('/api/v1/users/:id', authenticator, controller.users.deleteUser)
  router.put('/api/v1/users/:id', authenticator, controller.users.updateUser)


  /**
   * Other API
   */
  router.post('/api/v1/upload-user-avatar', authenticator, controller.users.uploadAvatar)
  router.post('/api/v1/import-users', authenticator, controller.users.importUsers)
  router.get('/api/v1/export-all-users', authenticator, controller.users.exportAllUsers)
}
