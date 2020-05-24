/**
 * @author Liu Yin
 * @date 2020/1/16
 * @Description: 定义公用属性或函数
 */
import { Loading } from 'element-ui'

const options = {
  lock: true,
  text: '请稍后...',
  spinner: 'el-icon-loading',
  background: 'transparent'
}
let loadingInstance

// 更新loading加载状态
export function toggleLoading (isShow = false) {
  if (isShow) {
    loadingInstance = Loading.service(options)
  } else if (loadingInstance) {
    loadingInstance.close()
  }
}
export function clone (source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = clone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}
export function formattingData (list, value) {
  if (!list || !value) {
    return value
  }
  const match = list.find((item) => {
    if (item.dictCode === value) {
      return true
    }
  })
  return match ? match.dictValue : value
}

/**
 *  根据code转化为对应的Name
 * @param list
 * @param codeValue  code编码数据
 * @param codeKey  code对应的键
 * @param valueKey 需要获取值的键
 * @returns {*}
 */
export function formattingField (list, codeValue, codeKey, valueKey) {
  if (!list || !codeValue) {
    return codeValue
  }
  const match = list.find((item) => {
    if (item[codeKey] === codeValue) {
      return true
    }
  })
  return match ? match[valueKey] : codeValue
}
