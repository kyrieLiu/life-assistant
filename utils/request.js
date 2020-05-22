/**
 * @author Liu Yin
 * @date 2020/1/16
 * @Description: axios基本配置
 */

import axios from 'axios'
// import main from "../main";

const service = axios.create({
  baseURL: '/api',
  withCredentials: true,
  timeout: 60000
})
// get请求
const $get = (url, params, suffixUrl) => {
  if (suffixUrl) {
    suffixUrl.forEach((item, index) => {
      url = url.concat(`/${item}`)
    })
  }
  if (params) {
    for (const i in params) {
      if (!params[i]) {
        delete params[i]
      }
    }
  }
  return new Promise((resolve, reject) => {
    service({
      url,
      method: 'get',
      params
    }).then((response) => {
      resolve(response)
    }).catch((err) => {
      reject(err)
    })
  })
}

export {
  $get
}
