import { mount, createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import Component from '@/router/worker/Tasks'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('router worker Tasks.vue', () => {
  let store
  let getTasksMock
  let $route
  let getters

  beforeEach(() => {
    getTasksMock = jest.fn()
    getTasksMock.mockReturnValue([{
      name: 'task',
      description: 'description',
      needs: []
    }])
    getters = {
      getTasks: () => getTasksMock
    }
    $route = {
      params: {
        worker: 'worker'
      }
    }
    store = new Vuex.Store({
      getters
    })
  })

  it('should render needs count', () => {
    const wrapper = mount(Component, {
      store,
      localVue,
      mocks: { $route }
    })
    expect(wrapper.find('h4 .badge').text()).toEqual('1')
  })

  it('should render needs count if no needs', () => {
    getTasksMock.mockReturnValue([{
      name: 'task',
      description: 'description'
    }])
    const wrapper = mount(Component, {
      store,
      localVue,
      mocks: { $route }
    })
    expect(wrapper.find('h4 .badge').text()).toEqual('1')
  })
})
