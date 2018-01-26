import { mount, createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import Component from '@/App.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

const wrap = () => mount(Component, {
  store,
  localVue
})

let store
let getters
let actions

describe('App.vue', () => {
  beforeEach(() => {
    getters = {
      registryWorkers: jest.fn().mockReturnValue([]),
      workers: jest.fn().mockReturnValue([{
        id: 'id',
        tasks: [{id: 'id'}]
      }, {id: 'id2'}]),
      instances: jest.fn().mockReturnValue([{id: 'id'}])
    }
    actions = {
      instanciateScriptor: jest.fn(),
      createInstance: jest.fn(),
      callTask: jest.fn()
    }
    store = new Vuex.Store({
      getters,
      actions
    })
  })

  it('should render footers', () => {
    const wrapper = wrap()
    expect(wrapper.html()).toContain('Scriptor')
  })
})
