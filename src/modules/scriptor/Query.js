import {
  filter,
  forEach,
  isMatch,
  union,
  map
} from 'lodash'

class Query {
  constructor (registry) {
    this._registry = registry

    this._result = []

    this._resultElementType = null

    this._worker = {}
    this._task = {}
    this._need = {}
  }

  get values () {
    if (!this._resultElementType) return []

    let result = []
    result = filter(this._registry.workers, worker => {
      if (!isMatch(worker, this._worker)) return false

      let result = true

      forEach(worker.tasks, task => {
        if (!isMatch(task, this._task)) {
          result = false
          return false
        }
        forEach(task.needs, need => {
          if (!isMatch(need, this._need)) {
            result = false
            return false
          }
        })
      })

      return result
    })

    if (this._resultElementType === 'worker') return result

    result = union(...map(result, 'tasks'))
    if (this._resultElementType === 'task') return result

    result = union(...map(result, 'needs'))

    return result
  }

  get value () {
    const result = this.values
    return result.length > 0 ? result[0] : null
  }

  get worker () {
    this._resultElementType = 'worker'
    return this
  }

  get task () {
    this._resultElementType = 'task'
    return this
  }

  get need () {
    this._resultElementType = 'need'
    return this
  }

  id (id) {
    if (this._resultElementType) {
      const type = '_' + this._resultElementType
      this[type].id = id
    }
    return this
  }
}

export default Query
