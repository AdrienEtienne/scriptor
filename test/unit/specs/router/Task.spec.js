import { mount, createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import Component from '@/router/registry/Task'

const localVue = createLocalVue()
localVue.use(Vuex)

let store
let $route
let getters
let actions

const wrap = () => {
  return mount(Component, {
    store,
    localVue,
    mocks: { $route }
  })
}

describe('Task.vue', () => {
  beforeEach(() => {
    getters = {
      task: () => ({name: 'task', needs: [{name: 'need'}]}),
      worker: () => ({name: 'worker'})
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
    store = new Vuex.Store({
      getters,
      actions
    })
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
})
