import { mount } from 'vue-test-utils'

import Component from '@/components/Tasks'

describe('Tasks.vue', () => {
  let task = null

  beforeEach(() => {
    task = {
      name: 'name',
      description: 'description',
      needs: []
    }
  })

  it('should render columns', () => {
    const wrapper = mount(Component, {
      propsData: {
        tasks: [task]
      }
    })
    const line = wrapper.findAll('tr').at(1)
    expect(line.findAll('td').at(0).text()).toEqual('name')
    expect(line.findAll('td').at(1).text()).toEqual('description')
    expect(line.findAll('td').at(2).text()).toEqual('0')
  })
})
