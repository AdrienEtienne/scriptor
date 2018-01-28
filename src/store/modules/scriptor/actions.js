import * as types from '../../mutations'
import createScriptor from '@/modules'

let scriptor = null

// actions
export default {
  setElements ({commit}) {
    if (scriptor) {
      commit(types.SET_ELEMENTS, {
        workers: scriptor.query.worker.values,
        tasks: scriptor.query.task.values,
        needs: scriptor.query.need.values,
        instances: scriptor.query.instance.values
      })
    }
  },
  instanciateScriptor ({commit, dispatch}, workers) {
    commit(types.INSTANTIATE_SCRIPTOR_REQUEST)
    scriptor = null
    try {
      scriptor = createScriptor(workers)
      commit(types.INSTANTIATE_SCRIPTOR_SUCCESS)
      dispatch('setElements')
    } catch (e) {
      commit(types.INSTANTIATE_SCRIPTOR_FAILURE, e)
      throw e
    }
  },
  createInstance ({commit, dispatch}, {name, workerId}) {
    commit(types.ADD_INSTRUCTION_REQUEST)
    try {
      const instruction = scriptor.add.createInstance(name, workerId)
      const worker = scriptor.query.worker.id(workerId).value
      commit(types.ADD_INSTRUCTION_SUCCESS, {
        instruction: {
          ...instruction,
          instance: {
            ...instruction.instance,
            workerId: undefined,
            worker
          }
        },
        position: scriptor.position
      })
      dispatch('setElements')
    } catch (e) {
      commit(types.ADD_INSTRUCTION_FAILURE, e)
      throw e
    }
  },
  callTask ({commit, dispatch}, {instanceId, taskId, needs}) {
    commit(types.ADD_INSTRUCTION_REQUEST)
    try {
      const instruction = scriptor.add.callTask(instanceId, taskId, needs)
      const instance = scriptor.query.instance.id(instanceId).value
      const task = scriptor.query.task.id(taskId).value
      commit(types.ADD_INSTRUCTION_SUCCESS, {
        instruction: {
          ...instruction,
          instance,
          task,
          needs: instruction.needs.map(need =>
            scriptor.query.instance.id(need).value)
        },
        position: scriptor.position
      })
      dispatch('setElements')
    } catch (e) {
      commit(types.ADD_INSTRUCTION_FAILURE, e)
      throw e
    }
  },
  query ({commit}, request = {}) {
    const {
      workerId,
      workerName,
      taskId,
      taskName,
      needId,
      needName,
      instanceId,
      instanceName
    } = request
    const query = scriptor.query
    if (workerId) query.worker.id(workerId)
    if (workerName) query.worker.name(workerName)
    if (taskId) query.task.id(taskId)
    if (taskName) query.task.name(taskName)
    if (needId) query.need.id(needId)
    if (needName) query.need.name(needName)
    if (instanceId) query.instance.id(instanceId)
    if (instanceName) query.instance.name(instanceName)

    commit(types.QUERY_ELEMENTS, {
      workers: query.worker.values,
      tasks: query.task.values,
      needs: query.need.values,
      instances: query.instance.values
    })
  }
}
