import {
  COUNTER_INCREMENT,
  COUNTER_RESET
} from '../mutations'

// initial state
const state = {
  count: 1
}

// getters
const getters = {
  getCount: state => state.count
}

// actions
const actions = {
  increment ({ commit }) {
    commit(COUNTER_INCREMENT)
  }
}

// mutations
const mutations = {
  [COUNTER_INCREMENT] (state) {
    state.count += 1
  },

  [COUNTER_RESET] (state) {
    state.count = 1
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
