import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/router/registry/Description'

const localVue = createLocalVue()
localVue.use(Vuex)

let store
let getters

const wrap = () => mount(Component, {
  store,
  localVue
})

describe('Workers.vue', () => {
  beforeEach(() => {
    getters = {
      registryWorkers: () => []
    }
    store = new Vuex.Store({
      getters
    })
  })

  it('should render workers count', () => {
    const wrapper = wrap()
    expect(wrapper.find('p').text()).toEqual('The registry allow you to define what you will be able to do in the Sandbox. There is 3 important entities to understand.')
  })
})
