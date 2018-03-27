import * as types from '../../mutations'
import initialState from './state'

// mutations

function handleError (state, e) {
  state.error = {
    ...e,
    message: e.message,
    errors: e.errors ? e.errors.map(el => ({
      message: el.message,
      ...el
    })) : []
  }
}

export default {
  [types.INSTANTIATE_SCRIPTOR_REQUEST] (state) {
    Object.assign(state, initialState)
  },
  [types.INSTANTIATE_SCRIPTOR_FAILURE] (state, e) {
    handleError(state, e)
  },
  [types.INSTANTIATE_SCRIPTOR_SUCCESS] (state) {
    Object.assign(state, initialState, {isInstantiated: true})
  },
  [types.ADD_INSTRUCTION_REQUEST] (state) {
    Object.assign(state, {error: null})
  },
  [types.ADD_INSTRUCTION_FAILURE] (state, e) {
    handleError(state, e)
  },
  [types.ADD_INSTRUCTION_SUCCESS] (state, {instruction, position}) {
    Object.assign(state, {
      instructions: [...state.instructions, instruction],
      position
    })
  },

  [types.SET_ELEMENTS] (state, {workers, tasks, needs, instances}) {
    state.workers = state.query.workers = workers
    state.tasks = state.query.tasks = tasks
    state.needs = state.query.needs = needs
    state.instances = state.query.instances = instances
  },
  [types.QUERY_ELEMENTS] (state, {workers, tasks, needs, instances}) {
    state.query.workers = workers
    state.query.tasks = tasks
    state.query.needs = needs
    state.query.instances = instances
  }
}
