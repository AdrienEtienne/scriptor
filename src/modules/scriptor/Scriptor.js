import Registry from '../registry'
import createInstruction from '../instruction'
import Query from '../query/ScriptorQuery'

/**
 * Scriptor used for script creation
 * @property {number} position Current position in _instructions
 * @property {instruction.Instruction[]} instructions Array of instructions
 * @property {query.ScriptorQuery} query Query for current state of the scriptor
 * @property {Registry} registry Registry used for the scriptor
 * @property {object} add Methods for instruction creation
 */
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

  get addTest () {
    return createInstruction(this, false)
  }

  /**
   * goTo - Set the position
   *
   * @param  {number} position New position
   * @return {boolean}          True if successfully setted
   */
  goTo (position) {
    if (position > -1 && position < this._instructions.length + 1) {
      this._position = position
      return true
    }
    return false
  }

  /**
   * goToTail - Set position to tail
   */
  goToTail () {
    this._position = this._instructions.length
  }
}

export default Scriptor
