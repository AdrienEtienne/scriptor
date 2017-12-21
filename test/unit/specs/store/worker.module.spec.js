import module from '@/store/modules/worker'
const getters = module.getters

describe('store module.worker', () => {
  let state = null

  beforeEach(() => {
    state = {
      all: [{
        name: 'worker',
        description: 'description',
        tasks: [{
          name: 'task',
          description: 'description task',
          needs: [{
            worker: 'worker',
            name: 'need',
            description: 'description'
          }]
        }]
      }]
    }
  })

  describe('getters', () => {
    describe('workers()', () => {
      it('return list of workers', () => {
        expect(getters.workers(state)).toHaveLength(state.all.length)
      })
    })

    describe('getWorkerByName(name)', () => {
      it('return worker with good name', () => {
        const worker = getters.getWorkerByName(state)('worker')
        expect(worker).toEqual(state.all[0])
      })
      it('return null if not found', () => {
        const worker = getters.getWorkerByName(state)('worker not exist')
        expect(worker).toBeNull()
      })
    })

    describe('getTasks(worker)', () => {
      it('return tasks', () => {
        expect(getters.getTasks(state)('worker'))
        .toHaveLength(1)
      })
      it('return empty array if no tasks', () => {
        delete state.all[0].tasks
        expect(getters.getTasks(state)('worker'))
        .toHaveLength(0)
      })
      it('return empty array if worker not exist', () => {
        expect(getters.getTasks(state)('worker not exist'))
        .toHaveLength(0)
      })
    })

    describe('getTask(worker, task)', () => {
      it('return good task', () => {
        const task = getters.getTaskByName(state)('worker', 'task')
        expect(task).toEqual(state.all[0].tasks[0])
      })
      it('return good task', () => {
        const task = getters.getTaskByName(state)('worker', 'task not exist')
        expect(task).toBeNull()
      })
    })

    describe('getNeeds(worker, task)', () => {
      it('return array', () => {
        expect(getters.getNeeds(state)('worker', 'task'))
          .toHaveLength(1)
      })
      it('return good value', () => {
        expect(getters.getNeeds(state)('worker', 'task')[0])
          .toEqual(state.all[0].tasks[0].needs[0])
      })
      it('return empty if task not found', () => {
        expect(getters.getNeeds(state)('worker', 'task not found'))
          .toHaveLength(0)
      })
    })
  })
})
