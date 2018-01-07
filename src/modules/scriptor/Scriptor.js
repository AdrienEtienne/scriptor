import Registry from '../registry'
import Query from './Query'
import {
  INSTRUCTION
} from '../instruction'

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

  get query () {
    return new Query(this._registry)
  }

  goTo (position) {
    if (position > -1 && position < this._instructions.length + 1) {
      this._position = position
      return true
    }
    return false
  }

  create (type, obj) {
    let instruction = null

    if (type === INSTRUCTION.INSTANCE_CREATE) {
      // const workerId = this.query.worker.id(obj.workerId).value
    }

    if (instruction) {
      this._instructions.splice(this.position, 0, instruction)
      this.goTo(this.position + 1)
    }

    return instruction
  }
}

export default Scriptor
