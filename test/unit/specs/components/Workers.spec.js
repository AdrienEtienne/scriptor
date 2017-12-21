import { mount } from 'vue-test-utils'

import Component from '@/components/Workers'

describe('Workers.vue', () => {
  let worker = null

  beforeEach(() => {
    worker = {
      name: 'name',
      description: 'description',
      tasks: []
    }
  })

  it('should render columns', () => {
    const wrapper = mount(Component, {
      propsData: {
        workers: [worker]
      }
    })
    const line = wrapper.findAll('tr').at(1)
    expect(line.findAll('td').at(0).text()).toEqual('name')
    expect(line.findAll('td').at(1).text()).toEqual('description')
    expect(line.findAll('td').at(2).text()).toEqual('0')
  })
})
