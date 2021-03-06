import Query from '@/modules/query/RegistryQuery'
import genRegistry from '../registry/index.spec'

let registry
let query

describe('Query', () => {
  beforeEach(() => {
    registry = genRegistry()
    query = new Query(registry)
  })

  describe('values / value', function () {
    it('return empty array if no element to find', () => {
      expect(query.values).toHaveLength(0)
    })

    it('return null if no element to find', () => {
      expect(query.value).toBeNull()
    })
  })

  describe('element', function () {
    describe('worker', function () {
      it('return one element', () => {
        expect(query.worker.values.length).toBeGreaterThan(0)
      })
      it('return the element', () => {
        expect(query.worker.value).toEqual(registry.workers[0])
      })
      it('return no element', () => {
        query._worker.name = 'fake worker'
        expect(query.worker.value).toBeNull()
      })
    })
    describe('task', function () {
      it('return one element', () => {
        expect(query.task.values.length).toBeGreaterThan(0)
      })
      it('return the element', () => {
        expect(query.task.value).toEqual(registry.workers[0].tasks[0])
      })
    })
    describe('need', function () {
      it('return at least one element', () => {
        expect(query.need.values.length).toBeGreaterThan(0)
      })
      it('return one element', () => {
        expect(query.need.value.id).toContain('need')
      })
      it('return no element', () => {
        query._need.name = 'fake need'
        expect(query.need.value).toBeNull()
      })
    })
  })

  describe('id', function () {
    it('do nothing if no type setted', () => {
      query.id()
    })
    it('set id', () => {
      const el = query
        .worker
        .id(registry.workers[0].id)
      expect(el._worker.id)
        .toEqual(registry.workers[0].id)
    })
  })

  describe('name', function () {
    it('do nothing if no type setted', () => {
      query.name()
    })
    it('set name', () => {
      query.worker.name('toto')
      expect(query._worker.name).toEqual('toto')
    })
    it('unset name', () => {
      query.worker
        .name('toto')
        .name()
      expect(query._worker.name).toBeUndefined()
    })
  })
})
