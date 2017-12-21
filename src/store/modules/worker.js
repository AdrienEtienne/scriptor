import text from '@/text'

const {
  WORKER_1,
  WORKER_1_DESC,
  WORKER_2,
  WORKER_2_DESC,
  TASK_1,
  TASK_1_DESC,
  TASK_2,
  TASK_2_DESC,
  TASK_3,
  TASK_3_DESC,
  NEED_1,
  NEED_1_DESC,
  NEED_2,
  NEED_2_DESC,
  NEED_3,
  NEED_3_DESC
} = text

// initial state
const state = {
  all: [{
    name: WORKER_1,
    description: WORKER_1_DESC,
    tasks: [{
      name: TASK_1,
      description: TASK_1_DESC,
      needs: []
    }, {
      name: TASK_2,
      description: TASK_2_DESC,
      needs: [{
        worker: WORKER_1,
        name: NEED_1,
        description: NEED_1_DESC
      }]
    }]
  }, {
    name: WORKER_2,
    description: WORKER_2_DESC,
    tasks: [{
      name: TASK_3,
      description: TASK_3_DESC,
      needs: [{
        worker: WORKER_1,
        name: NEED_2,
        description: NEED_2_DESC
      }, {
        worker: WORKER_1,
        name: NEED_3,
        description: NEED_3_DESC
      }]
    }]
  }]
}

// getters
const getters = {
  workers: (state) => {
    return state.all
  },
  getWorkerByName: (state) => (name) => {
    const worker = state.all.find(el => el.name === name)
    return worker || null
  },
  getTasks: (state) => (workerName) => {
    const worker = getters.getWorkerByName(state)(workerName)
    if (worker) return worker.tasks || []
    return []
  },
  getTaskByName: (state) => (workerName, name) => {
    const tasks = getters.getTasks(state)(workerName)
    const task = tasks.find(el => el.name === name)
    return task || null
  },
  getNeeds: (state) => (worker, task) => {
    const tmpTask = getters.getTaskByName(state)(worker, task)
    if (tmpTask) return tmpTask.needs
    return []
  }
}

// actions
const actions = {}

// mutations
const mutations = {}

export default {
  state,
  getters,
  actions,
  mutations
}
