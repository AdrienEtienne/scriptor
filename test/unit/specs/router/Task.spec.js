import { mount, createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import Component from '@/router/registry/Task'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Task.vue', () => {
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
    const text = wrapper.find('h3').text()
    expect(text).toContain('worker')
    expect(text).toContain('can')
    expect(text).toContain('task')
    expect(text).toContain('with')
    expect(text).toContain('need')
  })
})
