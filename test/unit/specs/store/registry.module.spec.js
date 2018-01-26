import module from '@/store/modules/registry'
const getters = module.getters

describe('store registry', () => {
  let state = null

  beforeEach(() => {
    state = {
      workers: [{
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
    describe('workers', () => {
      it('return list of workers', () => {
        expect(getters.registryWorkers(state)).toHaveLength(state.workers.length)
      })
    })
  })
})
