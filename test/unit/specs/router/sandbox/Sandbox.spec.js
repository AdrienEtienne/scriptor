import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/router/sandbox/Sandbox'

const localVue = createLocalVue()
localVue.use(Vuex)

let store
let actions

const wrap = () => {
  store = new Vuex.Store({
    actions
  })
  return mount(Component, {
    store,
    localVue,
    stubs: {
      ModalCallTask: '<div>modal-call-task</div>',
      ModalCreateInstance: '<div>modal-create-instance</div>',
      instructions: '<div>instructions</div>'
    }
  })
}

describe('router Sandbox.vue', () => {
  beforeEach(() => {
    actions = {
      query: jest.fn()
    }
  })
  it('should render sandbox', () => {
    const wrapper = wrap()
    expect(wrapper.find('h1').text()).toEqual('Sandbox This is where the magic happen')
  })
  it('should call query', () => {
    wrap()
    expect(actions.query).toHaveBeenCalledTimes(1)
  })
})
