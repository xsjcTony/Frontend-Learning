/**
 * 自定义中间件 - 不允许配置中指定的浏览器访问
 * @param options - 中间件配置
 * @param app - 应用实例对象
 */
module.exports = (options, app) => async (ctx, next) => {
  const userAgent = ctx.get('user-agent')
  if (options.userAgent.test(userAgent)) {
    ctx.status = 401
    ctx.body = '不支持当前浏览器'
  } else {
    next() // 继续执行后续中间件
  }
}
