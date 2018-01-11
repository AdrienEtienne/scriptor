import { mount, createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import Component from '@/router/registry/Workers'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Workers.vue', () => {
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

  it('should render workers count', () => {
    const wrapper = mount(Component, {
      store,
      localVue
    })
    expect(wrapper.find('h3 > span.badge').text()).toEqual('1')
  })
})
