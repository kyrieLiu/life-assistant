
import Cookies from 'js-cookie'
const state = () => ({
// 列表table固定高度
  tableHeight: -1,
  // 侧边栏打开关闭
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
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
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  }
}

const actions = {
  setTableHeight: ({ commit }, tableHeight) => {
    commit('setTableHeight', tableHeight)
  },
  toggleSideBar ({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar ({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
