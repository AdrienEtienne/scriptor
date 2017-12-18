import {
    resetCounter
} from '@/store/actions'

describe('Actions', () => {
  it('should return count', () => {
    const commit = jest.fn()
    resetCounter({commit})
    expect(commit).toHaveBeenCalled()
  })
})
