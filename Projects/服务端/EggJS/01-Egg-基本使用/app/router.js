module.exports = (app) => {
  const { router, controller } = app

  const clientCheck = app.middleware.clientCheck({ userAgent: /Chrome/ })

  router.get('/', controller.home.index)
  router.get('/user', controller.home.getQuery)
  router.get('/register/:name/:age', controller.home.getParams)
  router.post('/login', controller.home.getBody)
  router.get('/home', controller.home.getHome)
  router.get('/news', controller.home.getNews)
  router.get('/setCookie', controller.home.setCookie)
  router.get('/getCookie', controller.home.getCookie)
  router.get('/loggerTest', controller.home.loggerTest)
  router.get('/getMsg', controller.home.getMsg)
  router.get('/scheduleRender', controller.home.scheduleRender)
  router.get('/testApplicationExtend', controller.home.testApplicationExtend)
  router.get('/testContextExtend', controller.home.testContextExtend)
  router.get('/testRequestExtend', controller.home.testRequestExtend)
  router.get('/testResponseExtend', controller.home.testResponseExtend)
  router.get('/testHelperExtend', controller.home.testHelperExtend)
  router.get('/testMiddleware', clientCheck, controller.home.index)
  router.get('/testI18n', controller.home.testI18n)
  router.get('/insert', controller.home.insertUser)
}
