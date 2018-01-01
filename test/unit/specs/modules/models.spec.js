import models from '@/modules/models'

const {
  Task
} = models

describe('models', () => {
  describe('Task', () => {
    it('have array with element', () => {
      expect((new Task({})).needs).toHaveLength(0)
    })
  })
})
