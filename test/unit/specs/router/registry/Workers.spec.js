import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/router/registry/Workers'

const localVue = createLocalVue()
localVue.use(Vuex)

let store
let getters
let actions

const wrap = () => mount(Component, {
  store,
  localVue
})

describe('Workers.vue', () => {
  beforeEach(() => {
    getters = {
      workers: jest.fn().mockReturnValue([]),
      registryWorkers: () => []
    }
    actions = {
      query: jest.fn()
    }
    store = new Vuex.Store({
      getters,
      actions
    })
  })

  it('should render workers count', () => {
    const wrapper = wrap()
    expect(wrapper.find('h3 > span.badge').text()).toEqual('0')
  })
})
