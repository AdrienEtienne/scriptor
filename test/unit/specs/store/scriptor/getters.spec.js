import { cloneDeep } from 'lodash'
import initialState from '@/store/modules/scriptor/state'
import getters from '@/store/modules/scriptor/getters'

let state

describe('scriptor getters', () => {
  beforeEach(() => {
    state = cloneDeep(initialState)
  })

  describe('instructions', function () {
    it('return array of instructions', () => {
      expect(getters.instructions(state)).toEqual([])
    })
  })
  describe('workers', function () {
    it('return array', () => {
      expect(getters.workers(state)).toEqual([])
    })
  })
  describe('worker', function () {
    it('return one element', () => {
      state.query.workers.push('toto')
      expect(getters.worker(state)).toEqual('toto')
    })
    it('return null', () => {
      expect(getters.worker(state)).toBeNull()
    })
  })
  describe('tasks', function () {
    it('return array', () => {
      expect(getters.tasks(state)).toEqual([])
    })
  })
  describe('task', function () {
    it('return one element', () => {
      state.query.tasks.push('toto')
      expect(getters.task(state)).toEqual('toto')
    })
    it('return null', () => {
      expect(getters.task(state)).toBeNull()
    })
  })
  describe('needs', function () {
    it('return array', () => {
      state.query.needs.push({workerId: 'id'})
      state.workers.push({id: 'id'})
      expect(getters.needs(state)).toEqual([{
        worker: {id: 'id'},
        workerId: 'id'
      }])
    })
  })
  describe('instances', function () {
    it('return array', () => {
      expect(getters.instances(state)).toEqual([])
    })
  })
  describe('getInstancesByWorkerId(workerId)', function () {
    it('return one instance', () => {
      expect(getters.getInstancesByWorkerId({
        instances: [{workerId: 'id'}]
      })('id')).toEqual([{workerId: 'id'}])
    })
    it('return empty array', () => {
      expect(getters.getInstancesByWorkerId({
        instances: [{workerId: 'id'}]
      })('id2')).toHaveLength(0)
    })
  })
  describe('getErrorMessage(state)(property)', function () {
    it('return error message', () => {
      expect(getters.getErrorMessage({
        error: { message: 'error' }
      })()).toEqual('error')
    })
    it('return null if no message match', () => {
      expect(getters.getErrorMessage({
        error: null
      })()).toBeNull()
      expect(getters.getErrorMessage({
        error: { errors: [] }
      })('property')).toBeNull()
    })
    it('return error message for property', () => {
      expect(getters.getErrorMessage({
        error: {
          errors: [{property: 'property', message: 'error'}]
        }
      })('property')).toEqual('error')
    })
  })
  describe('getValidationState(submitted, property)', () => {
    it('return null', () => {
      expect(getters.getValidationState(null, jest.fn())(false))
        .toBeNull()
    })
    it('return false if message', () => {
      const state = getters.getValidationState(null, {
        getErrorMessage: jest.fn().mockReturnValue('message')
      })(true)
      expect(state)
        .not.toBeTruthy()
    })
    it('return true if no message', () => {
      const state = getters.getValidationState(null, {
        getErrorMessage: jest.fn().mockReturnValue(null)
      })(true)
      expect(state)
        .toBeTruthy()
    })
  })
})
