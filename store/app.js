const state = () => ({
// 列表table固定高度
  tableHeight: -1
})

const getters = {
  tableHeight: state => state.tableHeight
}

const mutations = {
  setTableHeight (state, val) {
    state.tableHeight = val
  }
}

const actions = {
  setTableHeight: ({ commit }, tableHeight) => {
    commit('setTableHeight', tableHeight)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
