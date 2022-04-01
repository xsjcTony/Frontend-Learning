import Router from '@koa/router'

const router = new Router()


router.get('/', (ctx, next) => {
  ctx.body = 'router index'
})
router.get('/home', (ctx, next) => {
  ctx.body = 'router index'
})

export default router
