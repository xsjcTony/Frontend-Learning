import * as jwt from 'jsonwebtoken'
import type { Privilege } from '../model/Privilege'
import type { User } from '../model/User'
import type { Application, Context, EggAppConfig } from 'egg'
import type { Next } from 'koa'


const canRequest = async (ctx: Context, id: number): Promise<boolean> => {
  const requestMethod = ctx.method.toLowerCase()
  const requestUrl = ctx.url

  if (
    requestMethod === 'get'
    && (
      requestUrl.startsWith('/api/v1/users')
      || requestUrl.startsWith('/api/v1/menus')
    )
  ) {
    return true
  }

  const user = await ctx.service.users.getUserById(id.toString(10))
  let ownPrivileges: Privilege[] = []
  user.roles.forEach(role => void ownPrivileges.push(...role.privileges))
  ownPrivileges = ctx.helper.uniqueArray(ownPrivileges, 'id')

  return ownPrivileges.some(privilege =>
    requestMethod === privilege.requestMethod
    && requestUrl.startsWith(privilege.privilegeUrl)
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (options: EggAppConfig['authenticator'], app: Application): any => async (ctx: Context, next: Next) => {
  const token = ctx.get('Authorization')

  try {
    const user = jwt.verify(token, app.config.keys) as User

    await canRequest(ctx, user.id)
      ? await next()
      : ctx.error(401, 'message.permission.denied')
  } catch (err) {
    ctx.error(401, 'message.permission.denied', err)
  }
}
