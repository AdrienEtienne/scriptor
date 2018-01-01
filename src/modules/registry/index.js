import schema from './validators/schema'
import functional from './validators/functional'
import RegistryError from './RegistryError'
import {
  construct
} from './tools'

/**
 * Scriptor Registry
 * @property {Worker[]} workers Array of workers
 */
class Registry {
  /**
   * constructor - Registry create
   *
   * @param  {Array} arr            Workers array
   * @param  {object} options = {}  Options
   */
  constructor (arr, options = {}) {
    this.options = options

    this._workers = []

    this.set(arr)
  }

  get workers () {
    return this._workers
  }

  /**
   * set - Set an array in registry
   *
   * @param  {Array} arr Array to use as registry
   */
  set (arr) {
    let result
    result = schema(arr)
    if (result.status > 0) throw new RegistryError('Cannot validate model schema', result.errors)
    result = functional(arr)
    if (result.status > 0) throw new RegistryError('Cannot validate functional model', result.errors)

    const workers = construct(arr)

    this._workers = workers
  }
}

export default Registry
