import Cookie from 'js-cookie'
export default {
  // 获取服务端cookie
  getcookiesInServer (req) {
    const serviceCookie = {}
    req && req.headers.cookie && req.headers.cookie.split(';').forEach(function (val) {
      const parts = val.split('=')
      serviceCookie[parts[0].trim()] = (parts[1] || '').trim()
    })
    return serviceCookie
  },
  // 获取客户端cookie
  getcookiesInClient (key) {
    return Cookie.get(key) ? Cookie.get(key) : ''
  }
}
