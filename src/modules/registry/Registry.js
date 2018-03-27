import validators from '../validators'
import ScriptorError from '../ScriptorError'
import Query from '../query/RegistryQuery'
import {
  construct
} from './tools'

/**
 * Scriptor Registry
 * @property {model.Worker[]} workers Array of workers
 * @property {query.RegistryQuery} query Query for the registry
 */
class Registry {
  /**
   * constructor - Registry create
   *
   * @param  {worker[]} arr            Workers array
   */
  constructor (arr) {
    this._workers = []

    this.set(arr)
  }

  get workers () {
    return this._workers
  }

  get query () {
    return new Query(this)
  }

  /**
   * set - Set an array in registry
   *
   * @param  {worker[]} arr Array to use as registry
   */
  set (arr) {
    let result
    result = validators.schema.registry(arr)
    if (result.status > 0) throw new ScriptorError('Cannot validate model schema', result.errors)
    result = validators.functional.registry(arr)
    if (result.status > 0) throw new ScriptorError('Cannot validate functional model', result.errors)

    const workers = construct(arr)

    this._workers = workers
  }
}

export default Registry
