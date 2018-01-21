import RegistryQuery from './RegistryQuery'

class ScriptorQuery extends RegistryQuery {
  constructor (scriptor) {
    super(scriptor._registry)
    this._scriptor = scriptor
  }

  get instance () {
    this._resultElementType = 'instance'
    return this
  }

  get values () {
    if (this._resultElementType === 'instance') {
      return 'toto'
    } else {
      return super.values
    }
  }
}

export default ScriptorQuery
