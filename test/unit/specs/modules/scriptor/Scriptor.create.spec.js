import Scriptor from '@/modules/scriptor/Scriptor'
import genRegistry from '../registry/index.spec'
import INSTRUCTION from '@/modules/instruction/TYPE'

let registry
let scriptor

describe('Scriptor.create', () => {
  beforeEach(() => {
    registry = genRegistry()
    scriptor = new Scriptor(registry)
  })
  it('add instruction', () => {
    const worker = registry.query.worker.value
    scriptor.add.createInstance('instance', worker.id)
    expect(scriptor.instructions).toHaveLength(1)
    expect(scriptor.position).toEqual(1)
  })

  describe(INSTRUCTION.CREATE_INSTANCE, function () {
    it('add instruction', () => {
      const worker = registry.query.worker.value
      const instruction = scriptor.add.createInstance('name', worker.id)
      expect(instruction.id).toEqual(expect.anything())
      expect(instruction.instance.id).toEqual(expect.anything())
      expect(instruction.instance.name).toEqual('name')
      expect(instruction.instance.workerId).toEqual(worker.id)
    })
    it('throw if worker not exist', () => {
      try {
        scriptor.add.createInstance('name', 'fake worker')
      } catch (e) {
        expect(e.message).toEqual('Cannot validate instruction information')
        expect(e.errors).toHaveLength(1)
        expect(e.errors[0].argument).toEqual('id')
        expect(e.errors[0].property).toEqual('worker')
        expect(e.errors[0].value).toEqual('fake worker')
        expect(e.errors[0].message).toEqual('Worker does not exist')
      } finally {
        expect.hasAssertions()
      }
    })
    it('throw if instance name taken', () => {
      const worker = registry.query.worker.value
      scriptor.add.createInstance('name 1', worker.id)
      scriptor.add.createInstance('name 2', worker.id)
      try {
        scriptor.goTo(1)
        scriptor.add.createInstance('name 2', worker.id)
      } catch (e) {
        expect(e.message).toEqual('Cannot validate instruction information')
        expect(e.errors).toHaveLength(1)
        expect(e.errors[0].argument).toEqual('name')
        expect(e.errors[0].property).toEqual('instance')
        expect(e.errors[0].value).toEqual('name 2')
        expect(e.errors[0].message).toEqual('Instance name "name 2" taken')
      } finally {
        expect.hasAssertions()
      }
    })
  })
  describe(INSTRUCTION.CALL_TASK, function () {
    let instance
    beforeEach(() => {
      const worker = registry.query.worker.value
      instance = scriptor.add.createInstance('instance 1', worker.id).instance
    })

    it('add instruction', () => {
      const instanceId = scriptor.query.instance.value.id
      const taskId = registry.query.task.value.id
      const instruction = scriptor.add.callTask(
        instanceId,
        taskId,
        [instanceId]
      )
      expect(instruction.instanceId).toEqual(instanceId)
      expect(instruction.taskId).toEqual(taskId)
      expect(instruction.needs).toEqual([instanceId])
    })
    it('throw if instance does not exist', () => {
      try {
        scriptor.add.callTask('instanceId', 'taskId')
      } catch (e) {
        expect(e.errors).toHaveLength(1)
        expect(e.errors[0].argument).toEqual('id')
        expect(e.errors[0].property).toEqual('instance')
        expect(e.errors[0].value).toEqual('instanceId')
        expect(e.errors[0].message).toEqual('Instance does not exist')
      } finally {
        expect.hasAssertions()
      }
    })
    it('throw if task not exist for a worker', () => {
      try {
        scriptor.add.callTask(
          instance.id,
          scriptor.query.task.values[1].id
        )
      } catch (e) {
        expect(e.errors).toHaveLength(1)
        expect(e.errors[0].argument).toEqual('id')
        expect(e.errors[0].property).toEqual('task')
        expect(e.errors[0].value).toEqual(scriptor.query.task.values[1].id)
        expect(e.errors[0].message).toEqual('Task does not exist')
      } finally {
        expect.hasAssertions()
      }
    })
    it('throw if needs missing', () => {
      try {
        scriptor.add.callTask(
          instance.id,
          scriptor.query.task.values[0].id
        )
      } catch (e) {
        expect(e.errors).toHaveLength(1)
        expect(e.errors[0].argument).toEqual('need')
        expect(e.errors[0].property).toEqual('needs[0]')
        expect(e.errors[0].message).toEqual('Task\'s need is missing')
      } finally {
        expect.hasAssertions()
      }
    })
    it('throw if need is in a bad type', () => {
      const worker = registry.query.worker.values[1]
      const instance2 = scriptor.add.createInstance('instance 2', worker.id).instance
      try {
        scriptor.add.callTask(
          instance.id,
          scriptor.query.task.values[0].id,
          [instance2.id]
        )
      } catch (e) {
        expect(e.errors).toHaveLength(1)
        expect(e.errors[0].argument).toEqual('need')
        expect(e.errors[0].property).toEqual('needs[0]')
        expect(e.errors[0].value).toEqual(instance2.id)
        expect(e.errors[0].message).toEqual('Task\'s need bad type')
      } finally {
        expect.hasAssertions()
      }
    })
  })
})
