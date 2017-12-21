import FooterVue from '@/components/FooterVue'
import FooterBootstrap from '@/components/FooterBootstrap'
import { mount } from 'vue-test-utils'

describe('Footers', () => {
  it('should render footer Vue', () => {
    const wrapper = mount(FooterVue)
    expect(wrapper.text()).toContain('Developped with')
    expect(wrapper.text()).toContain('Vue.js')
  })
  it('should render footer Bootstrap', () => {
    const wrapper = mount(FooterBootstrap)
    expect(wrapper.text()).toContain('Bootstrap V4 +')
    expect(wrapper.text()).toContain('Bootstrap Vue')
  })
})
