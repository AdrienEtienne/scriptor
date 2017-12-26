import schema from './validators/schema'
import functional from './validators/functional'
import RegistryError from './RegistryError'

class Registry {
  constructor (arr, options = {}) {
    this.options = options

    this._elements = []

    this.set(arr)
  }

  get elements () {
    return this._elements
  }

  set (arr = []) {
    let result
    result = schema(arr)
    if (result.status > 0) throw new RegistryError('Cannot validate model schema', result.errors)
    result = functional(arr)
    if (result.status > 0) throw new RegistryError('Cannot validate functional model', result.errors)

    this._elements = arr
  }
}

export default Registry
