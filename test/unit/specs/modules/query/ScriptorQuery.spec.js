import genRegistry from '../registry/index.spec'
import Scriptor from '@/modules/scriptor/Scriptor'

let scriptor

describe('Scriptor Query', () => {
  beforeEach(() => {
    scriptor = new Scriptor(genRegistry())
  })

  it('test', () => {
    expect(scriptor.query.instance.values).toEqual('toto')
    expect(scriptor.query.worker.values).toHaveLength(1)
  })
})
