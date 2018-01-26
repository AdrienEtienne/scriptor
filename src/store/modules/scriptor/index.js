import initialState from './state'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

const state = Object.assign({}, initialState)

export default {
  state,
  getters,
  actions,
  mutations
}
