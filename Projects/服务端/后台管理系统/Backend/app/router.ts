/* eslint '@typescript-eslint/unbound-method': 'off' */
/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */
/* eslint '@typescript-eslint/no-unsafe-argument': 'off' */

import { Application } from 'egg'


export default async (app: Application): Promise<void> => {

  const authenticator = app.middleware.authenticator(null, app);


  /**
   * Captcha
   */
  (await import('./router/captcha')).default(app);


  /**
   * Account
   */
  (await import('./router/account')).default(app);


  /**
   * Users - REST API
   */
  (await import('./router/users')).default(app, authenticator);


  /**
   * Roles - REST API
   */
  (await import('./router/roles')).default(app, authenticator);


  /**
   * User_Role - REST API
   */
  (await import('./router/userRole')).default(app, authenticator);


  /**
   * Privileges - REST API
   */
  (await import('./router/privileges')).default(app, authenticator);


  /**
   * Role_Privilege - REST API
   */
  (await import('./router/rolePrivilege')).default(app, authenticator)
}
