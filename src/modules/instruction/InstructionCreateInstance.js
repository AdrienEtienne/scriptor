import Instruction from './Instruction'

/**
 * Instruction for instance creation
 * @memberof instruction
 * @extends Instruction
 * @property {Instance} instance Instance
 */
class InstructionCreateInstance extends Instruction {
  constructor (data) {
    super('create_instance')
    this.instance = data.instance
  }
}

export default InstructionCreateInstance