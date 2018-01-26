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
})
