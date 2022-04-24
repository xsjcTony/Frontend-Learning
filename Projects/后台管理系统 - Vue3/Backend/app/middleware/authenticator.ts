import * as jwt from 'jsonwebtoken'
import type { Application, Context, EggAppConfig } from 'egg'
import type { Next } from 'koa'


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (options: EggAppConfig['authenticator'], app: Application): any => async (ctx: Context, next: Next) => {
  const token = ctx.get('Authorization')

  try {
    jwt.verify(token, app.config.keys)
    await next()
  } catch (err) {
    ctx.error(401, 'Permission denied', err)
  }
}
