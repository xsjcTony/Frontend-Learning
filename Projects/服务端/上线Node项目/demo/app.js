/**
 * imports
 */

// NodeJS modules
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs'

// dependency modules
import Koa from 'koa'
import json from 'koa-json'
import onerror from 'koa-onerror'
import bodyParser from 'koa-bodyparser'
import serve from 'koa-static'
import session from 'koa-generic-session'
import redisStore from 'koa-redis'
import morgan from 'koa-morgan'

// internal modules
import userRouter from './routes/user.js'
import './database/sync.js'
import { REDIS_CONFIG } from './config/database.js'


/**
 * constants
 */

// NodeJS constants for ESM package
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


// global constants
const app = new Koa()


/**
 * error handler
 */

// error handler
onerror(app)


/**
 * middleware
 */

// logger
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log/access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))
// bodyParser
app.use(bodyParser({
  enableTypes: ['json', 'form', 'text']
}))
// pretty json printer
app.use(json())
// static asset
app.use(serve(path.join(__dirname, 'public')))
// generic session
app.keys = ['Aelita']
app.use(session({
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  },
  store: redisStore({
    all: REDIS_CONFIG.url
  })
}))


// routes
app.use(userRouter.routes())
  .use(userRouter.allowedMethods())


// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})


export default app
