/* eslint '@typescript-eslint/unbound-method': 'off' */
/* eslint '@typescript-eslint/no-unsafe-argument': 'off' */
/* eslint '@typescript-eslint/no-explicit-any': 'off' */

import type { Application } from 'egg'


export default (app: Application, authenticator: any): void => {
  const { controller, router } = app

  /**
   * Roles - REST API
   */
  router.get('/api/v1/menus', authenticator, controller.menus.getMenusByQuery)
  router.get('/api/v1/menus/:id', authenticator, controller.menus.getMenuById)
  router.post('/api/v1/menus', authenticator, controller.menus.createMenu)
  router.put('/api/v1/menus/:id', authenticator, controller.menus.updateMenu)
  router.delete('/api/v1/menus/:id', authenticator, controller.menus.deleteMenu)
}
