import { uniqueId } from 'lodash'

/**
 * Instruction
 * @property {string} id Id
 */
class Instruction {
  /**
   * constructor - Constructor
   *
   * @param  {string} name Instruction name
   */
  constructor (name) {
    this.id = uniqueId('instruction_' + name + '_')
  }
}

export default Instruction
