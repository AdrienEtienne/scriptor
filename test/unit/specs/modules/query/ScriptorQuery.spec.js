import genRegistry from '../registry/index.spec'
import Scriptor from '@/modules/scriptor/Scriptor'

let scriptor

describe('Scriptor Query', () => {
  beforeEach(() => {
    scriptor = new Scriptor(genRegistry())
  })

  it('return empty instance list', () => {
    expect(scriptor.query.instance.values).toHaveLength(0)
  })

  it('return one instance', () => {
    const worker = scriptor.query.worker.value
    scriptor.add.createInstance('instance', worker.id)
    expect(scriptor.query.instance.values).toHaveLength(1)
  })

  it('return only one instance when position before instance', () => {
    const worker = scriptor.query.worker.value
    scriptor.add.createInstance('instance', worker.id)
    scriptor.add.createInstance('instance 2', worker.id)
    scriptor.goTo(1)
    expect(scriptor.query.instance.values).toHaveLength(1)
  })
})
