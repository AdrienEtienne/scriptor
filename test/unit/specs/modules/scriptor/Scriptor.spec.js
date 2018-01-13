import Scriptor from '@/modules/scriptor/Scriptor'
import genRegistry from '../registry/index.spec'
import {
  INSTANCE_CREATE
} from '@/modules/instruction/TYPES'

let registry
let scriptor

describe('Scriptor', () => {
  beforeEach(() => {
    registry = genRegistry()
    scriptor = new Scriptor(registry)
  })

  it('throw if not a registry', () => {
    expect(() => new Scriptor('toto'))
      .toThrow('Argument shall be an instance of Registry')
  })

  describe('goTo(number)', function () {
    it('return false if cannot go to position', () => {
      expect(scriptor.goTo(-1)).toBeFalsy()
      expect(scriptor.goTo(1)).toBeFalsy()
    })
    it('return true when position changed', () => {
      scriptor._instructions.push('toto')
      expect(scriptor.goTo(1)).toBeTruthy()
      expect(scriptor.position).toEqual(1)
    })
  })

  describe('instances', function () {
    it('return zero elements', () => {
      expect(scriptor.instances).toHaveLength(0)
    })

    it('return only one instance', () => {
      const worker = scriptor.query.worker.value
      scriptor.create(INSTANCE_CREATE, {
        instance: { name: 'name 1', workerId: worker.id }
      })
      scriptor.create(INSTANCE_CREATE, {
        instance: { name: 'name 2', workerId: worker.id }
      })
      expect(scriptor.instances).toHaveLength(2)
      scriptor.goTo(1)
      expect(scriptor.instances).toHaveLength(1)
    })
  })
})
