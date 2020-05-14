import mongoose from 'mongoose'

import cors from 'koa-cors'
import goods from '../server/interface/goods'
import verifyUser from './verify'
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
  useNewUrlParser: true,
  useUnifiedTopology: true
})
app.use(cors())

// Import and Set Nuxt.js options
config.dev = app.env !== 'production'

async function start () {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3004
  } = nuxt.options.server

  await nuxt.ready()
  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }
  // 验证用户信息
  app.use(verifyUser())
  // 配置接口路径
  app.use(goods.routes()).use(goods.allowedMethods())
  app.use(user.routes()).use(user.allowedMethods())
  app.use((ctx) => {
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
