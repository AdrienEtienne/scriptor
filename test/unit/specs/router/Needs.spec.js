import { mount, shallow, createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import Component from '@/router/registry/Needs'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Needs.vue', () => {
  let store
  let getNeedsMock
  let getWorkerByNameMock
  let $route
  let getters

  beforeEach(() => {
    getNeedsMock = jest.fn()
    getWorkerByNameMock = jest.fn()
    getNeedsMock.mockReturnValue([{
      name: 'need',
      description: 'description',
      worker: 'worker'
    }])
    getWorkerByNameMock.mockReturnValue({
      name: 'worker',
      description: 'description'
    })
    getters = {
      getNeeds: () => getNeedsMock,
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

  it('should call getNeeds with good arguments', () => {
    shallow(Component, {
      store,
      localVue,
      mocks: { $route }
    })
    expect(getNeedsMock).toBeCalledWith('worker', 'task')
  })

  it('should call getWorkerByName one time', () => {
    shallow(Component, {
      store,
      localVue,
      mocks: { $route }
    })
    expect(getWorkerByNameMock).toBeCalledWith('worker')
    expect(getWorkerByNameMock).toHaveBeenCalledTimes(1)
  })

  it('should render needs count', () => {
    const wrapper = mount(Component, {
      store,
      localVue,
      mocks: { $route }
    })
    expect(wrapper.find('h4 .badge').text()).toEqual('1')
  })
})
