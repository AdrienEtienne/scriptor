import { mount } from '@vue/test-utils'

import instruction from '@/components/instruction'

const {
  CreateInstance
} = instruction

describe('CreateInstance.vue', () => {
  let propsData = null

  beforeEach(() => {
    propsData = {
      instance: {
        name: 'instance',
        worker: {
          name: 'worker',
          description: 'worker description'
        }
      }
    }
  })

  it('display the full instruction', () => {
    const wrapper = mount(CreateInstance, { propsData })
    expect(wrapper.text()).toEqual('Declare instance as a new worker')
  })
})
