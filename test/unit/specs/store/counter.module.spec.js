import counter from '@/store/modules/counter'
import {
  COUNTER_INCREMENT,
  COUNTER_RESET
} from '@/store/mutations'

describe('Counter', () => {
  let state = {}

  beforeEach(() => {
    state = {
      count: 1
    }
  })

  describe('getters', () => {
    it('should return count', () => {
      expect(counter.getters.getCount(state)).toEqual(1)
    })
  })

  describe('actions', () => {
    it('should return count', () => {
      const commit = jest.fn()
      counter.actions.increment({commit})
      expect(commit).toHaveBeenCalled()
    })
  })

  describe('mutations', () => {
    it('add one to current count', () => {
      counter.mutations[COUNTER_INCREMENT](state)
      expect(state.count).toEqual(2)
    })
    it('set count to one', () => {
      state.count = 2
      counter.mutations[COUNTER_RESET](state)
      expect(state.count).toEqual(1)
    })
  })
})
