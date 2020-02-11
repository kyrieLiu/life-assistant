import Router from 'koa-router'
import Goods from '../dbs/models/goods'

const router = new Router({ prefix: '/goods' })

router.post('/list', async (ctx) => {
  try {
    const list = await Goods.find()
    ctx.body = {
      list,
      code: 0
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      message: e
    }
  }
})

router.post('/addGoods', async function (ctx) {
  const goods = new Goods({
    name: ctx.request.body.name,
    address: ctx.request.body.address,
    type: '类型'
  })
  let code
  try {
    await goods.save()
    code = 0
  } catch (e) {
    ctx.status = 500
    code = -1
  }
  ctx.body = {
    code,
    message: '操作成功'
  }
})

module.exports = router
