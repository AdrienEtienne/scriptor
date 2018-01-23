import Scriptor from '@/modules/scriptor/Scriptor'
import genRegistry from '../registry/index.spec'
import {
  INSTANCE_CREATE,
  TASK_CALL
} from '@/modules/instruction/TYPES'

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

  describe(INSTANCE_CREATE, function () {
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
  describe(TASK_CALL, function () {
    beforeEach(() => {
      const worker = registry.query.worker.value
      scriptor.add.createInstance('name', worker.id)
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
    it('throw if task not exist', () => {
      try {
        scriptor.add.callTask(
          scriptor.query.instance.value.id,
          'task id'
        )
      } catch (e) {
        expect(e.errors).toHaveLength(1)
        expect(e.errors[0].argument).toEqual('id')
        expect(e.errors[0].property).toEqual('task')
        expect(e.errors[0].value).toEqual('task id')
        expect(e.errors[0].message).toEqual('Task does not exist')
      } finally {
        expect.hasAssertions()
      }
    })
    it.skip('add instruction', () => {
      scriptor.add.callTask(
        scriptor.query.instance.value.id,
        registry.query.task.value.id
      )
    })
  })
})
