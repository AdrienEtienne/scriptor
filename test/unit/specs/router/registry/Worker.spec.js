import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/router/registry/Worker'

const localVue = createLocalVue()
localVue.use(Vuex)

let store
let $route
let getters
let actions

describe('Worker.vue', () => {
  beforeEach(() => {
    getters = {
      worker: jest.fn().mockReturnValue({name: 'worker'})
    }
    actions = {
      query: jest.fn()
    }
    $route = {
      params: {
        worker: 'worker'
      }
    }
    store = new Vuex.Store({
      getters,
      actions
    })
  })

  it('should render worker', () => {
    const wrapper = mount(Component, {
      store,
      localVue,
      mocks: { $route }
    })
    expect(wrapper.find('h3').text()).toEqual('worker')
  })
})
