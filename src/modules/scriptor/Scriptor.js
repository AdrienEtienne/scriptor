import Registry from '../registry'
import createInstruction from '../instruction'
import Query from '../query/ScriptorQuery'

class Scriptor {
  constructor (registry) {
    this._position = 0
    this._instructions = []

    if (!(registry instanceof Registry)) {
      throw new Error('Argument shall be an instance of Registry')
    }
    this._registry = registry
  }

  get position () {
    return this._position
  }

  get instructions () {
    return this._instructions
  }

  get query () {
    return new Query(this)
  }

  get registry () {
    return this._registry
  }

  get add () {
    return createInstruction(this)
  }

  get createTest () {
    return createInstruction(this, false)
  }

  goTo (position) {
    if (position > -1 && position < this._instructions.length + 1) {
      this._position = position
      return true
    }
    return false
  }

  goToTail () {
    this._position = this._instructions.length
  }
}

export default Scriptor
