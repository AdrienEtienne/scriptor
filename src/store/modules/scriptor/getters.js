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
  }
}
