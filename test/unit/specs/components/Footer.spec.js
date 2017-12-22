import FooterApp from '@/components/FooterApp'
import { mount } from 'vue-test-utils'

describe('FooterApp.vue', () => {
  it('should render footer Vue', () => {
    const wrapper = mount(FooterApp)
    expect(wrapper.text()).toContain('Developped with')
    expect(wrapper.text()).toContain('Vue.js')
  })
  it('should render footer Bootstrap', () => {
    const wrapper = mount(FooterApp)
    expect(wrapper.text()).toContain('Bootstrap V4 +')
    expect(wrapper.text()).toContain('Bootstrap Vue')
  })
})
