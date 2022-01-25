import { USER_INFO, USER_LOGIN, USER_REGISTER } from './routerConst.js'
import { loginUser, registerUser } from '../controller/userController.js'
import redis from '../database/redis.js'


export const userRouterHandler = async (req, res) => {
  // /api/user/login
  if (req.method === 'post' && req.path === USER_LOGIN) {
    // login attempt
    const result = await loginUser(req.body)

    // save login status
    if (result.code === 200) {
      req.session.id = result.data.id
      req.session.username = result.data.username
      req.session.gender = result.data.gender

      await redis.set(req.userId, req.session)
    }

    return result
  }
  // /api/user/register
  else if (req.method === 'post' && req.path === USER_REGISTER) {
    return await registerUser(req.body)
  }
}
