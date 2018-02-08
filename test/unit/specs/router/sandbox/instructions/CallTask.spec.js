import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/router/sandbox/instructions/ModalCallTask'

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

describe('ModalCallTask.vue', () => {
  beforeEach(() => {
    getters = {
      instances: jest.fn().mockReturnValue([
        {id: 'instanceId', name: 'instance', workerId: 'workerId'},
        {id: 'instanceId2', name: 'instance2', workerId: 'workerId2'}
      ]),
      tasks: jest.fn().mockReturnValue([{
        id: 'taskId',
        name: 'task',
        needs: [{
          id: 'needId', name: 'need', workerId: 'workerId'}
        ]
      }]),
      getInstancesByWorkerId: () => jest.fn().mockReturnValue([{}]),
      getValidationState: () => jest.fn().mockReturnValue(null),
      getErrorMessage: () => jest.fn().mockReturnValue(null)
    }
    actions = {
      callTask: jest.fn(),
      query: jest.fn()
    }
  })

  describe('needs', function () {
    it('return empty if no taskId or no task found', () => {
      let wrapper = wrap()
      expect(wrapper.vm.needs).toHaveLength(0)
      wrapper.vm.form.taskId = 'badTaskId'
      wrapper = wrap()
      expect(wrapper.vm.needs).toHaveLength(0)
    })
    it('return on need', () => {
      const wrapper = wrap()
      wrapper.vm.form.taskId = 'taskId'
      expect(wrapper.vm.needs).toHaveLength(1)
    })
  })

  describe('onShow()', function () {
    it('call query', () => {
      const wrapper = wrap()
      wrapper.vm.onShow()
      expect(actions.query).toHaveBeenCalledTimes(1)
    })
  })
  describe('onInstanceChange(instanceId)', function () {
    let wrapper
    beforeEach(() => {
      wrapper = wrap()
      wrapper.vm.form.instanceId = 'instanceId'
    })

    it('dont change form value', () => {
      wrapper.vm.form.taskId = 'taskId'
      wrapper.vm.form.instanceId = 'instanceId'
      wrapper.vm.onInstanceChange('instanceId')
      expect(wrapper.vm.form.taskId).toEqual('taskId')
    })

    it('change form value', () => {
      wrapper.vm.form.taskId = 'taskId'
      wrapper.vm.onInstanceChange('instanceId2')
      expect(wrapper.vm.form.taskId).toEqual('')
      wrapper.vm.form.instanceId = 'instanceId'
      wrapper.vm.form.taskId = 'taskId'
      wrapper.vm.onInstanceChange('')
      expect(wrapper.vm.form.taskId).toEqual('')
    })
  })

  describe('onTaskChange(taskId)', function () {
    it('set needs at empty', () => {
      const wrapper = wrap()
      wrapper.vm.form.needs = ['toto']
      wrapper.vm.onTaskChange()
      expect(wrapper.vm.form.needs).toHaveLength(0)
    })
  })
  describe('onSubmit(evt)', function () {
    it('throw error', () => {
      actions.callTask = () => { throw new Error() }
      const wrapper = wrap()
      wrapper.vm.submitted = false
      const evt = {preventDefault: jest.fn()}
      wrapper.vm.onSubmit(evt)
      expect(wrapper.vm.submitted).toBeTruthy()
      expect(evt.preventDefault).toHaveBeenCalledTimes(1)
    })
    it('call query', () => {
      const wrapper = wrap()
      wrapper.vm.onSubmit()
      expect(actions.callTask).toHaveBeenCalledTimes(1)
    })
  })
  describe('onReset()', function () {
    it('call preventDefault', () => {
      const wrapper = wrap()
      const evt = {preventDefault: jest.fn()}
      wrapper.vm.onReset(evt)
      expect(evt.preventDefault).toHaveBeenCalledTimes(1)
    })
  })
})
