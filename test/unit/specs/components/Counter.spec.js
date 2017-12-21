import Counter from '@/components/Counter'
import { shallow, createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Counter.vue', () => {
  let actions
  let getters
  let store

  beforeEach(() => {
    actions = {
      increment: jest.fn(),
      reset: jest.fn()
    }
    getters = {
      getCount: () => 1
    }
    store = new Vuex.Store({
      actions,
      getters
    })
  })

  it('should render with count at 1', () => {
    const wrapper = shallow(Counter, { store, localVue })
    const p = wrapper.find('div')
    expect(p.text())
      .toContain('Count 1')
  })

  it('should call method increment', () => {
    const wrapper = shallow(Counter, { store, localVue })
    const p = wrapper.find('.btn-success')
    p.trigger('click')
    expect(actions.increment).toHaveBeenCalledTimes(1)
  })
})
