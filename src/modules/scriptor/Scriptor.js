import Registry from '../registry'
import Query from './Query'
import createInstruction from '../instruction'
import InstructionCreateInstance from '../instruction/InstructionCreateInstance'

class Scriptor {
  constructor (registry) {
    this._position = 0
    this._instructions = []

    if (!(registry instanceof Registry)) {
      throw new Error('Argument shall be an instance of Registry')
    }
    this._registry = registry
    this._createInstruction = createInstruction(this)
  }

  get position () {
    return this._position
  }

  get instructions () {
    return this._instructions
  }

  get instances () {
    let instances = []

    this._instructions.forEach((instruction, index) => {
      if (index === this.position) return false
      if (instruction instanceof InstructionCreateInstance) {
        instances.push(instruction.instance)
      }
    })

    return instances
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

  goToTail () {
    this._position = this._instructions.length
  }

  create (type, obj) {
    let instruction = this._createInstruction(type, obj)

    this._instructions.splice(this.position, 0, instruction)
    this.goTo(this.position + 1)

    return instruction
  }
}

export default Scriptor
