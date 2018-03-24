import Scriptor from '@/modules/scriptor/Scriptor'
import genRegistry from '../registry/index.spec'

let registry
let scriptor

describe('Scriptor.create', () => {
  beforeEach(() => {
    registry = genRegistry()
    scriptor = new Scriptor(registry)
  })
  it('create instruction but not add it into the list', () => {
    const worker = registry.query.worker.value
    const instruction = scriptor.addTest.createInstance('instance', worker.id)
    expect(scriptor.instructions).toHaveLength(0)
    expect(scriptor.position).toEqual(0)
    expect(instruction).not.toBeUndefined()
  })
})
