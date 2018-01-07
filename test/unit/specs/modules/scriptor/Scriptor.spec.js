import Scriptor from '@/modules/scriptor/Scriptor'
import genRegistry from '../registry/index.spec'
import {
  INSTRUCTION
} from '@/modules/instruction'

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

  describe.skip('create(type, obj)', function () {
    it('add instruction', () => {
      const worker = scriptor.query.worker.value
      scriptor.create(INSTRUCTION.INSTANCE_CREATE, {
        name: 'instance',
        workerId: worker.id
      })
    })
  })
})
