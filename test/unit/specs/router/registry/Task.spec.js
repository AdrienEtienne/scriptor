import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/router/registry/Task'

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

describe('Task.vue', () => {
  beforeEach(() => {
    getters = {
      task: () => ({name: 'task', needs: [{name: 'need'}]}),
      worker: () => ({name: 'worker'}),
      registryWorkers: () => []
    }
    actions = {
      query: jest.fn()
    }
    $route = {
      params: {
        worker: 'worker',
        task: 'task'
      }
    }
    $router = {
      push: jest.fn()
    }
  })

  it('should render needs count', () => {
    const wrapper = wrap()
    const text = wrapper.find('h3').text()
    expect(text).toContain('worker')
    expect(text).toContain('can')
    expect(text).toContain('task')
    expect(text).toContain('with')
    expect(text).toContain('need')
  })

  it('should redirect to "notFound"', () => {
    getters.task = () => (null)
    wrap()
    expect($router.push).toHaveBeenCalledWith('/notFound')
  })

  describe('registryTask', () => {
    it('should get task', () => {
      getters.registryWorkers = () => [{
        name: 'worker',
        tasks: [{name: 'task'}]
      }]
      const wrapper = wrap()
      expect(wrapper.vm.registryTask).not.toBeNull()
    })
  })
})
