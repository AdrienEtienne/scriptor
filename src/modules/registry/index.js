import schema from './validators/schema'
import functional from './validators/functional'
import RegistryError from './RegistryError'
import {
  setIds,
  construct
} from './tools'

class Registry {
  constructor (arr, options = {}) {
    this.options = options

    this._workers = []

    this.set(arr)
  }

  get workers () {
    return this._workers
  }

  set (arr = []) {
    let result
    result = schema(arr)
    if (result.status > 0) throw new RegistryError('Cannot validate model schema', result.errors)
    result = functional(arr)
    if (result.status > 0) throw new RegistryError('Cannot validate functional model', result.errors)

    let workers
    workers = setIds(arr)
    workers = construct(workers)

    this._workers = workers
  }
}

export default Registry
