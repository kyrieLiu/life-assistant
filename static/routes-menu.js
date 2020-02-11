/**
 * @author Liu Yin
 * @date 2020/2/11
 * @Description: 侧边栏路由树  pages增加页面,需要在这里增加对应的路由
 */

export const routes =
  [
    {
      path: '/',
      name: '首页',
      icon: 'el-icon-film'
    },
    {
      path: '/GoodsManage',
      name: '物资管理',
      icon: 'el-icon-help',
      children: [{
        path: 'consumable',
        name: '耗材',
        icon: 'el-icon-s-order'
      }, {
        path: 'tools',
        name: '物品',
        icon: 'el-icon-s-finance'
      }]
    }]
