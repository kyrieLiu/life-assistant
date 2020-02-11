import Router from 'koa-router'

import jwt from 'jsonwebtoken'

// import Users from '../dbs/models/users'

const router = new Router({ prefix: '/user' })

router.post('/login', (ctx, next) => {
  if (!ctx.request.body.username) {
    ctx.body = { err: '请输入用户名' }
  } else if (!ctx.request.body.password) {
    ctx.body = { err: '请输入密码' }
  } else {
    let data = null
    // 生成token
    const token = jwt.sign(
      {
        name: ctx.request.body // 需要放到token的参数
      },
      'suzhen', // 随便一点内容，加密的密文，私钥对应着公钥
      {
        expiresIn: 60 * 60 // 60分钟到期时间
      }
    )
    // data = await Users.getOne({
    //   find: {
    //     phone: ctx.request.body.username,
    //     password: ctx.request.body.password
    //   }
    // })

    data = {
      username: '刘隐'
    }

    if (data) {
      ctx.body = {
        data: { user_id: data._id, token },
        code: 0,
        message: '登陆成功'
      }
    } else { ctx.body = { message: '登陆失败' } }
  }
})

export default router
