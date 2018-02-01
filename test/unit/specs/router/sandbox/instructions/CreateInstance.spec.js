import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/router/sandbox/instructions/ModalCreateInstance'

const localVue = createLocalVue()
localVue.use(Vuex)

let store
let getters
let actions

const wrap = () => {
  store = new Vuex.Store({
    getters,
    actions
  })
  return mount(Component, {
    store,
    localVue
  })
}

describe('ModalCreateInstance.vue', () => {
  beforeEach(() => {
    getters = {
      workers: jest.fn().mockReturnValue([{id: 'id', name: 'worker'}]),
      getValidationState: () => jest.fn().mockReturnValue(null),
      getErrorMessage: () => jest.fn().mockReturnValue(null)
    }
    actions = {
      createInstance: jest.fn()
    }
  })

  it('should render one worker', () => {
    const wrapper = wrap()
    const text = wrapper
      .find('#input-select-worker option:nth-child(2)')
      .text()
    expect(text).toEqual('worker')
  })

  describe('onSubmit', function () {
    it('set state at default if succeed', () => {
      const wrapper = wrap()
      wrapper.vm.submitted = true
      wrapper.vm.form.name = 'name'
      wrapper.vm.form.workerId = 'workerId'
      wrapper.vm.onSubmit()
      expect(wrapper.vm.submitted).not.toBeTruthy()
      expect(wrapper.vm.form.name).toEqual('')
      expect(wrapper.vm.form.workerId).toEqual('')
    })
    it('set submitted at true if failed', () => {
      actions.createInstance = () => { throw new Error() }
      const wrapper = wrap()
      wrapper.vm.onSubmit()
      expect(wrapper.vm.submitted).toBeTruthy()
    })
    it('call preventDefault', () => {
      actions.createInstance = () => { throw new Error() }
      const wrapper = wrap()
      const fn = {preventDefault: jest.fn()}
      wrapper.vm.onSubmit(fn)
      expect(fn.preventDefault.mock.calls.length).toBe(1)
    })
  })

  describe('onReset', function () {
    it('call preventDefault', () => {
      const wrapper = wrap()
      const fn = {preventDefault: jest.fn()}
      wrapper.vm.onReset(fn)
      expect(fn.preventDefault.mock.calls.length).toBe(1)
    })
  })
})
