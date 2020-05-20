/**
 * author Liu Yin
 * date 2020/2/11
 * Description: axios配置
*/
import Cookie from 'js-cookie'
import ElementUI from 'element-ui'

// token失效
function tokenInvalid () {
  ElementUI.MessageBox.confirm('您的账号已在其它地方登录 ！', '信息提示！', {
    distinguishCancelAndClose: true,
    confirmButtonText: '确定',
    cancelButtonText: '重新登陆'
  }).then(() => {
    Cookie.remove('token')
    location.reload()
  }).catch(() => {
    Cookie.remove('token')
    location.reload()
  })
}
// axios扩展配置
const axiosConfig = function ({ $axios, redirect }) {
  // 设置请求头
  $axios.setHeader('X-Requested-With', 'XMLHttpRequest')
  $axios.setBaseURL('http://121.36.173.121/lifeapi/')
  // 发起请求
  $axios.onRequest((config) => {
  })
  // 返回结果
  $axios.onResponse((response) => {
    if (response.data.code === -2) {
      tokenInvalid()
    } else {
      return response.data
    }
  })
}
export default axiosConfig
