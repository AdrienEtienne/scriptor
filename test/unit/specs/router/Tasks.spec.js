import { mount, createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import Component from '@/router/registry/Tasks'

const localVue = createLocalVue()
localVue.use(Vuex)

let store
let getters

const wrap = () => {
  return mount(Component, {
    store,
    localVue
  })
}

describe('Tasks.vue', () => {
  beforeEach(() => {
    getters = {
      tasks: jest.fn().mockReturnValue([])
    }
    store = new Vuex.Store({
      getters
    })
  })

  it('should render task count', () => {
    const wrapper = wrap()
    expect(wrapper.find('h4 .badge').text()).toEqual('0')
  })
})
