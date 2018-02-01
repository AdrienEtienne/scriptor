import { get } from 'lodash'
// getters

export default {
  instructions (state) {
    return state.instructions
  },
  workers (state) {
    return state.query.workers
  },
  worker (state) {
    return state.query.workers.length > 0 ? state.query.workers[0] : null
  },
  tasks (state) {
    return state.query.tasks
  },
  task (state) {
    return state.query.tasks.length > 0 ? state.query.tasks[0] : null
  },
  needs (state) {
    return state.query.needs.map((need) => ({
      ...need,
      worker: state.workers.find(worker => worker.id === need.workerId)
    }))
  },
  instances (state) {
    return state.query.instances
  },
  getInstancesByWorkerId (state) {
    return (workerId) => state.instances.filter(instance => instance.workerId === workerId)
  },
  getErrorMessage (state) {
    return (property) => {
      if (!property) {
        const message = get(state.error, 'message', null)
        return message
      }
      const errors = get(state.error, 'errors', [])
      const error = errors.find((error) => error.property === property)
      if (!error) return null
      return error.message
    }
  },
  getValidationState (state, getters) {
    return (submitted, property) => {
      if (!submitted) return null
      const message = getters.getErrorMessage(property)
      return !message
    }
  }
}
