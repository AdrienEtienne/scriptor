import { mount } from 'vue-test-utils'

import Component from '@/components/Entity'

describe('Entity.vue', () => {
  let propsData = null

  beforeEach(() => {
    propsData = {
      name: 'name',
      description: 'description',
      type: 'need'
    }
  })
  it('display the name', () => {
    const wrapper = mount(Component, { propsData })
    expect(wrapper.text()).toEqual('name')
  })

  it('dont display description', () => {
    delete propsData.description
    const wrapper = mount(Component, { propsData })
    expect(wrapper.element.getAttribute('data-original-title')).toEqual('')
  })

  it('add the description', () => {
    const wrapper = mount(Component, { propsData })
    expect(wrapper.element.getAttribute('data-original-title')).toEqual('description')
  })

  describe('variant', () => {
    it('return dark by default', () => {
      const wrapper = mount(Component, { propsData })
      expect(wrapper.find('.badge-dark').exists()).toBe(true)
    })
    it('return warning if worker', () => {
      propsData.type = 'worker'
      const wrapper = mount(Component, { propsData })
      expect(wrapper.find('.badge-warning').exists()).toBe(true)
    })
    it('return primary if task', () => {
      propsData.type = 'task'
      const wrapper = mount(Component, { propsData })
      expect(wrapper.find('.badge-primary').exists()).toBe(true)
    })
  })
})
