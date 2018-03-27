import { mount } from '@vue/test-utils'

import Component from '@/components/JsonTree'

describe('JsonTree.vue', () => {
  let propsData = null

  beforeEach(() => {
    propsData = {
      data: {toto: 'tata'}
    }
  })
  it('display the name', () => {
    const wrapper = mount(Component, { propsData })
    expect(wrapper.text()).toEqual('Json')
  })
})
