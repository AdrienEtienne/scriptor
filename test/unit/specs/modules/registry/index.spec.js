import Registry from '@/modules/registry'

export default function gen (data) {
  return new Registry(data || [{
    name: 'worker',
    tasks: [{
      name: 'task',
      needs: [{
        name: 'need',
        worker: 'worker'
      }]
    }]
  }, {
    name: 'worker 2',
    tasks: [{
      name: 'task 1'
    }]
  }])
}

describe('Registry', () => {
  let arr = null
  let registry = null
  let workers

  beforeEach(() => {
    arr = [{
      name: 'worker',
      tasks: [{
        name: 'task',
        needs: [{
          name: 'need',
          worker: 'worker'
        }]
      }]
    }]
    registry = gen(arr)
  })

  beforeEach(() => {
    workers = registry.workers
  })

  it('throw an arror if coding error', () => {
    expect(() => new Registry()).toThrow(Error)
  })

  it('throw a RegistryError with model schema error', () => {
    delete arr[0].name
    expect(() => new Registry(arr)).toThrow('Cannot validate model schema')
  })

  it('throw a RegistryError with functional model error', () => {
    arr[0].name = 'worker2'
    expect(() => new Registry(arr)).toThrow('Cannot validate functional model')
  })

  it('create Worker object', () => {
    const worker = workers[0]
    expect(worker.id).toContain('worker_')
    expect(worker.name).toEqual('worker')
  })

  it('create Worker with empty tasks', () => {
    delete arr[0].tasks
    registry = new Registry(arr)
    const worker = registry.workers[0]
    expect(worker.tasks).toHaveLength(0)
  })

  it('create Task object', () => {
    const task = workers[0].tasks[0]
    expect(task.id).toContain('task_')
    expect(task.name).toEqual('task')
  })

  it('create Need object', () => {
    const need = workers[0].tasks[0].needs[0]
    expect(need.id).toContain('need_')
    expect(need.name).toEqual('need')
    expect(need.workerId).toEqual(workers[0].id)
  })
})
