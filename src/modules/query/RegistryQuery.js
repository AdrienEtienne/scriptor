import {
  clone,
  filter,
  isMatch,
  union,
  map
} from 'lodash'

/**
 * Query for element research
 * @namespace query
 */

/**
 * Query to find registry elements
 * @memberof query
 * @property {this} worker Set worker as active element
 * @property {this} task Set task as active element
 * @property {this} need Set need as active element
 * @property {model.Element} value Element found
 * @property {model.Element[]} values Elements found
 */
class RegistryQuery {
  constructor (registry) {
    this._registry = registry

    this._resultElementType = null

    this._worker = {}
    this._task = {}
    this._need = {}
  }

  get values () {
    if (!this._resultElementType) return []

    let results = map(this._registry.workers, (worker) => clone(worker))

    results = filter(results, worker => {
      if (!isMatch(worker, this._worker)) return false

      worker.tasks = filter(worker.tasks, task => {
        if (!isMatch(task, this._task)) return false

        task.needs = filter(task.needs, need => {
          if (!isMatch(need, this._need)) return false
          return true
        })
        return true
      })
      return true
    })

    if (this._resultElementType === 'worker') return results

    results = union(...map(results, 'tasks'))
    if (this._resultElementType === 'task') return results

    results = union(...map(results, 'needs'))
    return results
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

  /**
   * id - Set an id as filter for the current element
   *
   * @param  {string} id Id of the element
   * @return {this}    This
   */
  id (id) {
    if (this._resultElementType) {
      const type = '_' + this._resultElementType
      this[type].id = id
    }
    return this
  }

  /**
   * name - Set a name as a filter
   *
   * @param  {string} name Name of the element
   * @return {this}    This
   */
  name (name) {
    if (this._resultElementType) {
      const type = '_' + this._resultElementType
      if (name) this[type].name = name
      else delete this[type].name
    }
    return this
  }
}

export default RegistryQuery
