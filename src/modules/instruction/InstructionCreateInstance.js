import Instruction from './Instruction'
import TYPE from './TYPE'

/**
 * Instruction for instance creation
 * @memberof instruction
 * @extends Instruction
 * @property {Instance} instance Instance
 */
class InstructionCreateInstance extends Instruction {
  constructor (data) {
    super('create_instance', TYPE.CREATE_INSTANCE)
    this.instance = data.instance
  }
}

export default InstructionCreateInstance
