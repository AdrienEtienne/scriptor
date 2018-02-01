import { cloneDeep } from 'lodash'
import * as types from '@/store/mutations'
import registry from '@/store/modules/registry'
import initialState from '@/store/modules/scriptor/state'
import scriptor from '@/store/modules/scriptor'

const {
  actions,
  mutations
} = scriptor

let state
let commit = (type, payload) => {
  commitMock(type, payload)
  mutations[type](state, payload)
}
let commitMock
let dispatch = (fn, obj) => actions[fn]({commit, dispatch}, obj)

describe('store scriptor', () => {
  beforeEach(() => {
    state = cloneDeep(initialState)
    commitMock = jest.fn()
  })
  describe('setElements', function () {
    it('should not update', () => {
      actions.setElements({commit})
      expect(state).toEqual(initialState)
    })
    it('update current state', () => {
      expect(state.workers.length).toEqual(0)
      actions.instanciateScriptor({
        commit, dispatch
      }, registry.state.workers)
      actions.setElements({commit})
      expect(state.workers.length).toBeGreaterThan(0)
    })
  })
  describe('instanciateScriptor', function () {
    it('cannot create', () => {
      try {
        actions.instanciateScriptor({commit}, [])
      } catch (error) {
        expect(commitMock)
          .toHaveBeenCalledTimes(2)
        expect(commitMock.mock.calls[1][0])
          .toEqual(types.INSTANTIATE_SCRIPTOR_FAILURE)
      } finally {
        expect.hasAssertions()
      }
    })
    it('create a scriptor', () => {
      actions.instanciateScriptor({
        commit, dispatch
      }, registry.state.workers)
      expect(state.isInstantiated)
        .toBeTruthy()
    })
  })
  describe('createInstance', function () {
    beforeEach(() => {
      actions.instanciateScriptor({
        commit, dispatch
      }, registry.state.workers)
      commitMock = jest.fn()
    })
    it('cannot add instruction', () => {
      try {
        actions.createInstance({commit, dispatch}, {})
      } catch (error) {
        expect(commitMock)
          .toHaveBeenCalledTimes(2)
        expect(commitMock.mock.calls[1][0])
          .toEqual(types.ADD_INSTRUCTION_FAILURE)
      } finally {
        expect.hasAssertions()
      }
    })
    it('add instruction', () => {
      actions.createInstance({commit, dispatch}, {
        name: 'instanceName',
        workerId: state.query.workers[0].id
      })
      expect(state.instructions).toHaveLength(1)
      expect(state.position).toEqual(1)
    })
  })
  describe('callTask', function () {
    beforeEach(() => {
      actions.instanciateScriptor({
        commit, dispatch
      }, registry.state.workers)
      actions.createInstance({commit, dispatch}, {
        name: 'instanceName',
        workerId: state.workers[0].id
      })
      commitMock = jest.fn()
    })
    it('cannot add instruction', () => {
      try {
        actions.callTask({commit, dispatch}, {})
      } catch (error) {
        expect(commitMock)
          .toHaveBeenCalledTimes(2)
        expect(commitMock.mock.calls[1][0])
          .toEqual(types.ADD_INSTRUCTION_FAILURE)
      } finally {
        expect.hasAssertions()
      }
    })
    it('add instruction', () => {
      actions.callTask({commit, dispatch}, {
        instanceId: state.instances[0].id,
        taskId: state.tasks[1].id,
        needs: [state.instances[0].id]
      })
      expect(state.instructions).toHaveLength(2)
      expect(state.position).toEqual(2)
    })
  })
  describe('query', function () {
    it('update query elements', () => {
      actions.instanciateScriptor({
        commit, dispatch
      }, registry.state.workers)
      commitMock = jest.fn()
      actions.query({commit}, {
        workerId: 'id',
        workerName: 'name',
        taskId: 'id',
        taskName: 'name',
        needId: 'id',
        needName: 'name',
        instanceId: 'id',
        instanceName: 'name'
      })
      expect(commitMock)
        .toHaveBeenCalledTimes(1)
      expect(state.query.workers).toHaveLength(0)
    })
    it('update query elements without filters', () => {
      actions.instanciateScriptor({
        commit, dispatch
      }, registry.state.workers)
      commitMock = jest.fn()
      actions.query({commit})
      expect(state.query.workers.length)
        .toBeGreaterThan(0)
    })
  })
})
