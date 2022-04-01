import Koa from 'koa'
import indexRouter from './router/index'

const app = new Koa()


/*
app.use((ctx) => {
  ctx.body = 'Hello Koa'
})
*/

app.use(indexRouter.routes())

app.listen(3000, () => {
  console.log('listen 3000 OK')
})
