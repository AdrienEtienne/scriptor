import { mount } from 'vue-test-utils'
import Component from '@/router/sandbox/Sandbox'

describe('router Sandbox.vue', () => {
  it('should render sandbox', () => {
    const wrapper = mount(Component)
    expect(wrapper.find('h1').text()).toEqual('Sandbox')
  })
})
