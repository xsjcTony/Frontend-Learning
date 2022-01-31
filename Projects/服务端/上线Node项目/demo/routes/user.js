import { loginUser, registerUser } from '../controller/userController.js'

/**
 * imports
 */

// dependency modules
import Router from '@koa/router'


/**
 * constants
 */

const router = new Router()


/**
 * routes
 */

router.prefix('/api/user')

router.post('/login', async (ctx, next) => {
  // login attempt
  const result = await loginUser(ctx.request.body)

  // save login status
  if (result.code === 200) {
    ctx.session.id = result.data.id
    ctx.session.username = result.data.username
    ctx.session.gender = result.data.gender
  }

  ctx.body = result
})

router.post('/register', async (ctx, next) => {
  console.log(ctx.request.body)
  ctx.body = await registerUser(ctx.request.body)
})

router.get('/test', (ctx, next) => {
  console.log(ctx.session)
  if (ctx.session.username) {
    ctx.body = 'login successfully'
  } else {
    ctx.body = 'login failed'
  }
})


export default router
