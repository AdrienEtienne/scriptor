import Scriptor from '@/modules/scriptor/Scriptor'
import genRegistry from '../registry/index.spec'
import {
  INSTANCE_CREATE,
  INSTANCE_CALL
} from '@/modules/instruction/TYPES'

let registry
let scriptor

describe('Scriptor.create', () => {
  beforeEach(() => {
    registry = genRegistry()
    scriptor = new Scriptor(registry)
  })
  it('add instruction', () => {
    const worker = scriptor.query.worker.value
    scriptor.create(INSTANCE_CREATE, {
      instance: {
        name: 'instance',
        workerId: worker.id
      }
    })
    expect(scriptor.instructions).toHaveLength(1)
    expect(scriptor.position).toEqual(1)
  })
  it('throw if type undefined', () => {
    expect(() => scriptor.create('undefined')).toThrow('Instruction type not defined')
    expect(() => scriptor.create()).toThrow('Instruction type not defined')
  })

  describe(INSTANCE_CREATE, function () {
    it('add instruction', () => {
      const worker = scriptor.query.worker.value
      const instruction = scriptor.create(INSTANCE_CREATE, {
        instance: { name: 'name', workerId: worker.id }
      })
      expect(instruction.id).toEqual(expect.anything())
      expect(instruction.instance.id).toEqual(expect.anything())
      expect(instruction.instance.name).toEqual('name')
      expect(instruction.instance.workerId).toEqual(worker.id)
    })
    it('throw if no instance', () => {
      try {
        scriptor.create(INSTANCE_CREATE, {})
      } catch (e) {
        expect(e.message).toEqual('Cannot validate instruction schema')
        expect(e.errors).toHaveLength(1)
      }
      expect.hasAssertions()
    })
    it('throw if worker not exist', () => {
      try {
        scriptor.create(INSTANCE_CREATE, {
          instance: { name: 'name', workerId: 'fake_id' }
        })
      } catch (e) {
        expect(e.message).toEqual('Cannot validate instruction information')
        expect(e.errors).toHaveLength(1)
        expect(e.errors[0].property).toEqual('instance')
        expect(e.errors[0].argument).toEqual('workerId')
        expect(e.errors[0].message).toEqual('Worker not found')
      } finally {
        expect.hasAssertions()
      }
    })
    it('throw if instance name taken', () => {
      const worker = scriptor.query.worker.value
      scriptor.create(INSTANCE_CREATE, {
        instance: { name: 'name 1', workerId: worker.id }
      })
      scriptor.create(INSTANCE_CREATE, {
        instance: { name: 'name 2', workerId: worker.id }
      })
      try {
        scriptor.goTo(1)
        scriptor.create(INSTANCE_CREATE, {
          instance: { name: 'name 2', workerId: worker.id }
        })
      } catch (e) {
        expect(e.message).toEqual('Cannot validate instruction information')
        expect(e.errors).toHaveLength(1)
        expect(e.errors[0].property).toEqual('instance')
        expect(e.errors[0].argument).toEqual('name 2')
        expect(e.errors[0].message).toEqual('Instance name "name 2" taken')
      }
    })
  })
  describe(INSTANCE_CALL, function () {
    beforeEach(() => {
      const worker = scriptor.query.worker.value
      scriptor.create(INSTANCE_CREATE, {
        instance: { name: 'name', workerId: worker.id }
      })
    })
  })
})
