import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import registry from './modules/registry'
import scriptor from './modules/scriptor'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    registry,
    scriptor
  },
  strict: false
})
