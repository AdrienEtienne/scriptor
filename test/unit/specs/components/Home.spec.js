import Component from '@/components/Home'
import { mount } from 'vue-test-utils'

describe('Home.vue', () => {
  it('should render correct contents', () => {
    const wrapper = mount(Component)
    const p = wrapper.find('.jumbotron .lead')
    expect(p.text())
      .toEqual('A user friendly way to write scripts')
  })
})
