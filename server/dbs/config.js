/**
 * @author Liu Yin
 * @date 2020/1/31
 * @Description: 服务器配置
 */
export default {
  dbs: 'mongodb://127.0.0.1:27017/assistant',
  redis: {
    get host () {
      return '127.0.0.1'
    },
    get port () {
      return 6379
    }
  }
}
