import Component from '@/App.vue'
import { mount } from 'vue-test-utils'

describe('App.vue', () => {
  it('should render footers', () => {
    const wrapper = mount(Component)
    expect(wrapper.html()).toContain('Scriptor')
  })
})
