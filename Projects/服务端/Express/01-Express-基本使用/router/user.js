import express from 'express'

const userRouter = express.Router()


userRouter.get('/login', (req, res, next) => {
  res.json({
    name: 'Tony',
    age: 24,
    method: 'get'
  })
})
userRouter.post('/register', (req, res, next) => {
  res.json({
    name: 'Tony',
    age: 24,
    method: 'post'
  })
})

export default userRouter
