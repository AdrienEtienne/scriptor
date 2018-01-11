import { mount } from 'vue-test-utils'
import Component from '@/router/registry/Registry'

describe('Registry.vue', () => {
  it('should render registry main page', () => {
    const wrapper = mount(Component)
    expect(wrapper.find('h1').text()).toEqual('Registry All that you can do in the sandbox is kept here')
  })
})
