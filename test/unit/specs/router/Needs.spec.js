import { mount, createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import Component from '@/router/registry/Needs'

const localVue = createLocalVue()
localVue.use(Vuex)

let store
let getters

const wrap = () => {
  return mount(Component, {
    store,
    localVue
  })
}

describe('Needs.vue', () => {
  beforeEach(() => {
    getters = {
      needs: () => []
    }
    store = new Vuex.Store({
      getters
    })
  })

  it('should render needs count', () => {
    const wrapper = wrap()
    expect(wrapper.find('h4 .badge').text()).toEqual('0')
  })
})
