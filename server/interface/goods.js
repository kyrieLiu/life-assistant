import Router from 'koa-router'
import Goods from '../dbs/models/goods'

const router = new Router({ prefix: '/goods' })

router.post('/list', async (ctx) => {
  try {
    const body = ctx.request.body
    const page = body.page
    const size = body.size
    const condition = body.condition
    const skipNum = (page - 1) * size
    const list = await Goods.find(condition).skip(skipNum).limit(size).sort({ _id: -1 }).exec()
    const total = await Goods.count(condition)
    ctx.body = {
      list,
      total,
      code: 0
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      message: e
    }
  }
})

router.post('/addEdit', async function (ctx) {
  let code
  try {
    const body = ctx.request.body
    if (body._id) {
      await Goods.where({ _id: body._id }).update(body)
    } else {
      const goods = new Goods(body)
      await goods.save()
    }
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
router.get('/detail', async function (ctx) {
  try {
    const query = ctx.request.query
    const data = await Goods.findOne({ _id: query._id })
    ctx.body = {
      code: 0,
      data,
      message: '操作成功'
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      message: '操作失败'
    }
  }
})
export default router
