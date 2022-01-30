// imports
// dependency modules
import Router from '@koa/router'


// global constants
const router = new Router()


router.prefix('/users')

router.get('/', async (ctx, next) => {
  ctx.body = 'this is a users response!'
})

router.get('/bar', async (ctx, next) => {
  ctx.body = 'this is a users/bar response'
})


export default router
