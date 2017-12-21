import { mount } from 'vue-test-utils'

import Component from '@/components/Needs'

describe('Needs.vue', () => {
  let need = {
    name: 'name',
    description: 'description',
    worker: {
      name: 'worker'
    }
  }

  it('should render columns', () => {
    const wrapper = mount(Component, {
      propsData: {
        needs: [need]
      }
    })
    const line = wrapper.findAll('tr').at(1)
    expect(line.findAll('td').at(0).text()).toEqual('name')
    expect(line.findAll('td').at(1).text()).toEqual('description')
    expect(line.findAll('td').at(2).text()).toEqual('worker')
  })
})
