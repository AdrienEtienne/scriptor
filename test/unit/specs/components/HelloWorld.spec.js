import HelloWorld from '@/components/HelloWorld'
import { shallow, createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('HelloWorld.vue', () => {
  let store

  beforeEach(() => {
    store = new Vuex.Store({})
  })

  it('should render correct contents', () => {
    const wrapper = shallow(HelloWorld, { store, localVue })
    const p = wrapper.find('.hello h1')
    expect(p.text())
      .toEqual('Welcome to Your Vue.js App')
  })
})
