import genRegistry from '../registry/index.spec'
import Scriptor from '@/modules/scriptor/Scriptor'

let scriptor

describe('Scriptor Query', () => {
  beforeEach(() => {
    scriptor = new Scriptor(genRegistry())
    const worker = scriptor.query.worker.value
    const task = scriptor.query.task.value
    const instance = scriptor.add.createInstance('instance', worker.id).instance
    scriptor.add.callTask(instance.id, task.id, [instance.id])
  })

  it('return one instance', () => {
    expect(scriptor.query.instance.values).toHaveLength(1)
  })

  it('return only one instance when position before instance', () => {
    const worker = scriptor.query.worker.value
    scriptor.add.createInstance('instance 2', worker.id)
    scriptor.goTo(1)
    expect(scriptor.query.instance.values).toHaveLength(1)
  })
})
