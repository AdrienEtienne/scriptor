// initial state
const state = {
  workers: [{
    name: 'IT Guy',
    description: 'A serial coder',
    tasks: [{
      name: 'Code something good',
      description: 'The man code as usual',
      needs: []
    }, {
      name: 'Code something really great',
      description: 'A great development can be done, but he needs help',
      needs: [{
        worker: 'IT Guy',
        name: 'A developper',
        description: 'An help because the task cant be done alone'
      }]
    }]
  }, {
    name: 'HR Collector',
    description: 'Always looking for a full package',
    tasks: [{
      name: 'Find a developer',
      description: 'Recruit a guy for the hard work',
      needs: [{
        worker: 'IT Guy',
        name: 'A Professional',
        description: 'Someone who have necessary knownledges'
      }, {
        worker: 'IT Guy',
        name: 'A Second One',
        description: 'Because a secondary point of view can be good'
      }]
    }]
  }]
}

// getters
const getters = {
  registryWorkers: (state) => state.workers
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
