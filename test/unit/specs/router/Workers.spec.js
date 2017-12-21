import { mount, createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import Component from '@/router/worker/Workers'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('router worker Workers.vue', () => {
  let store
  let workersMock
  let getters

  beforeEach(() => {
    workersMock = jest.fn()
    workersMock.mockReturnValue([{
      name: 'worker',
      description: 'description',
      tasks: []
    }])
    getters = {
      workers: workersMock
    }
    store = new Vuex.Store({
      getters
    })
  })

  it('should render worker', () => {
    const wrapper = mount(Component, {
      store,
      localVue
    })
    expect(wrapper.find('h1').text()).toEqual('Workers 1')
  })
})
