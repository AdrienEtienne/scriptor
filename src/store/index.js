import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import worker from './modules/worker'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    worker
  },
  strict: true
})
