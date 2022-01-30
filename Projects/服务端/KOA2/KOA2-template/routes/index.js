// imports
// dependency modules
import Router from '@koa/router'


// global constants
const router = new Router()


router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    msg: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})


export default router
