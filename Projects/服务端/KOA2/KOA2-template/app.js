/**
 * imports
 */

// NodeJS modules
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// dependency modules
import Koa from 'koa'
import views from 'koa-views'
import json from 'koa-json'
import onerror from 'koa-onerror'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import serve from 'koa-static'

// internal modules
import indexRouter from './routes/index.js'
import usersRouter from './routes/users.js'


/**
 * constants
 */

// NodeJS constants for ESM package
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


// global constants
const app = new Koa()


/**
 * app code
 */

// error handler
onerror(app)


// middlewares
app.use(bodyParser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(serve(path.join(__dirname, 'public')))
app.use(views(path.join(__dirname, 'views'), {
  map: {
    html: 'ejs'
  }
}))


// routes
app.use(indexRouter.routes())
  .use(indexRouter.allowedMethods())
app.use(usersRouter.routes())
  .use(usersRouter.allowedMethods())


// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})


export default app
