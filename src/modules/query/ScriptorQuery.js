import { forEach, isMatch } from 'lodash'
import InstructionCreateInstance from '../instruction/InstructionCreateInstance'
import RegistryQuery from './RegistryQuery'

/**
 * Query to find scriptor elements
 * @memberof query
 * @extends query.RegistryQuery
 * @property {this} instance Set Instance as current element
 */
class ScriptorQuery extends RegistryQuery {
  constructor (scriptor) {
    super(scriptor._registry)
    this._scriptor = scriptor

    this._instance = {}
  }

  get instance () {
    this._resultElementType = 'instance'
    return this
  }

  get values () {
    if (this._resultElementType === 'instance') {
      let scriptor = this._scriptor
      let instances = []

      forEach(scriptor.instructions, (instruction, index) => {
        if (index === scriptor.position) return false
        if (instruction instanceof InstructionCreateInstance) {
          let instance = instruction.instance
          if (isMatch(instance, this._instance)) {
            instances.push(instruction.instance)
          }
        }
      })

      return instances
    } else {
      return super.values
    }
  }
}

export default ScriptorQuery
