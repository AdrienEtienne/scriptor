import NotFound from '@/components/NotFound'
import { mount } from '@vue/test-utils'

describe('NotFound.vue', () => {
  it('should render footer Vue', () => {
    const wrapper = mount(NotFound)
    expect(wrapper.text()).toEqual('Not Found')
  })
})
