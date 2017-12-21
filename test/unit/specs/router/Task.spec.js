import { mount, createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import Component from '@/router/worker/Task'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('router worker Task.vue', () => {
  let store
  let getTaskByNameMock
  let getWorkerByNameMock
  let $route
  let getters

  beforeEach(() => {
    getTaskByNameMock = jest.fn()
    getWorkerByNameMock = jest.fn()
    getTaskByNameMock.mockReturnValue({
      name: 'task',
      description: 'description',
      needs: [{
        name: 'need',
        description: 'description',
        worker: 'worker'
      }]
    })
    getWorkerByNameMock.mockReturnValue({
      name: 'worker',
      description: 'description'
    })
    getters = {
      getTaskByName: () => getTaskByNameMock,
      getWorkerByName: () => getWorkerByNameMock
    }
    $route = {
      params: {
        worker: 'worker',
        task: 'task'
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
    expect(wrapper.find('h3 .badge').text()).toEqual('task')
  })

  it('should render function example', () => {
    const wrapper = mount(Component, {
      store,
      localVue,
      mocks: { $route }
    })
    expect(wrapper.findAll('p').at(1).text()
      .replace(/\n/g, '').replace(/\s/g, ''))
    .toEqual('workercantaskusing:need')
  })
})
