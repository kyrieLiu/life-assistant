
import Cookies from 'js-cookie'
const state = () => ({
// 列表table固定高度
  tableHeight: -1,
  // 侧边栏打开关闭
  sidebar: {
    opened: true
  }

})

const getters = {
  tableHeight: state => state.tableHeight,
  sidebar: state => state.sidebar
}

const mutations = {
  setTableHeight (state, val) {
    state.tableHeight = val
  },
  TOGGLE_SIDEBAR: (state) => {
    state.sidebar.opened = !state.sidebar.opened
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  }
}

const actions = {
  setTableHeight: ({ commit }, tableHeight) => {
    commit('setTableHeight', tableHeight)
  },
  toggleSideBar ({ commit }) {
    commit('TOGGLE_SIDEBAR')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
