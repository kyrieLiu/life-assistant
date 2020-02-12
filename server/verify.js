/**
 * @author Liu Yin
 * @date 2020/2/12
 * @Description: 校验token信息
 */

import Redis from 'koa-redis'

const Store = new Redis().client
const verify = async function (ctx, next) {
  console.log(ctx.request.header.x_access_token)
  if (ctx.request.header && ctx.request.header.x_access_token) {
    const headerToken = ctx.request.header.x_access_token
    const userMessage = await Store.hget(headerToken, 'username')
    if (userMessage) {
      await next()
    } else {
      ctx.body = {
        code: -2,
        message: '无效token'
      }
    }
  } else {
    await next()
  }
}
const verifyUser = function () {
  return verify
}
export default verifyUser
