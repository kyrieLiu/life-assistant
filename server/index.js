import mongoose from 'mongoose'

// eslint-disable-next-line no-unused-vars
import jwt from 'jsonwebtoken'
import goods from '../server/interface/goods'
import user from './interface/user'
import dbConfig from './dbs/config'

const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('koa-bodyparser')
const config = require('../nuxt.config.js')

const app = new Koa()

app.use(bodyParser({
  extendTypes: ['json', 'form', 'text']
}))
mongoose.connect(dbConfig.dbs, {
  useNewUrlParser: true
})

// Import and Set Nuxt.js options
config.dev = app.env !== 'production'

async function start () {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  await nuxt.ready()
  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }
  app.use(async (ctx, next) => {
    console.log('token=====', ctx.request.header.x_access_token)
    if (ctx.request.header.x_access_token && ctx.url === '/goods/list') {
      // try {
      //   // const token = await jwt.verify(
      //   //   ctx.request.header.x_access_token,
      //   //   'suzhen'
      //   // )
      //   // if (token.name) {
      //   //   await next()
      //   // } else {
      //   //   ctx.body = { err: '无效token' }
      //   // }
      //   // ctx.body = { err: '无效tokensss' }
      // } catch (error) {
      //   // ctx.body = { err: '无效token' }
      // }
      await next()
      // ctx.body.code = 2
    } else {
      await next()
    }
  })
  app.use(goods.routes()).use(goods.allowedMethods())
  app.use(user.routes()).use(user.allowedMethods())
  app.use((ctx) => {
    console.log('执行渲染')
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
