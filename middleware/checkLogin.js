import utils from '~/utils/cookie-access'

export default function ({ route, req, res, redirect }) {
  const isClient = process.client
  const isServer = process.server
  let token
  // 在服务端
  if (isServer) {
    const cookies = utils.getcookiesInServer(req)
    token = cookies.token ? cookies.token : ''
  }
  // 在客户端判读是否需要登陆
  if (isClient) {
    token = utils.getcookiesInClient('token')
  }
  // 需要进行权限判断的页面开头
  if (!token) {
    redirect('/login')
  }
}
