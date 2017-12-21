import { mount, createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import Component from '@/router/worker/Worker'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('router worker Worker.vue', () => {
  let store
  let getWorkerByNameMock
  let $route
  let getters

  beforeEach(() => {
    getWorkerByNameMock = jest.fn()
    getWorkerByNameMock.mockReturnValue({
      name: 'worker',
      description: 'description',
      needs: []
    })
    getters = {
      getWorkerByName: () => getWorkerByNameMock
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

  it('should render worker', () => {
    const wrapper = mount(Component, {
      store,
      localVue,
      mocks: { $route }
    })
    expect(wrapper.find('h1').text()).toEqual('worker worker')
  })
})
