import express from 'express'

const goodsRouter = express.Router()


goodsRouter.get('/list', (req, res, next) => {
  res.end('Aelita.list.get')
})
goodsRouter.post('/detail', (req, res, next) => {
  res.end('Aelita.detail.post')
})

export default goodsRouter
