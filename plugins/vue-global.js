/**
 * @author Liu Yin
 * @date 2020/2/10
 * @Description: 定义全局组件,函数
 */
import ListView from '../components/listView'
import urls from '../static/urls'
import { toggleLoading } from '../utils/tools'

export default {
  install (Vue) {
    Vue.component(ListView.name, ListView)

    Vue.prototype.urls = urls

    Vue.prototype.toggleLoading = toggleLoading

    Vue.prototype.$myInjectedFunction = string => console.log('This is an example', string)
  }
}
