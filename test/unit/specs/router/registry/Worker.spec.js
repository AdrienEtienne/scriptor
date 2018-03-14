import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/router/registry/Worker'

const localVue = createLocalVue()
localVue.use(Vuex)

let store
let $route
let $router
let getters
let actions

const wrap = () => {
  store = new Vuex.Store({
    getters,
    actions
  })
  return mount(Component, {
    store,
    localVue,
    mocks: { $route, $router }
  })
}

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
    $router = {
      push: jest.fn()
    }
  })

  it('should render worker', () => {
    const wrapper = wrap()
    expect(wrapper.find('h3').text()).toEqual('worker')
  })

  it('should redirect to "notFound"', () => {
    getters.worker = () => (null)
    wrap()
    expect($router.push).toHaveBeenCalledWith('/notFound')
  })
})
