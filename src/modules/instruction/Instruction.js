import { uniqueId } from 'lodash'

/**
 * Instruction
 * @memberof instruction
 * @property {string} id Id
 */
class Instruction {
  /**
   * constructor - Constructor
   *
   * @param  {string} name Instruction name
   * @param  {string} type Instruction type
   */
  constructor (name, type) {
    this.id = uniqueId('instruction_' + name + '_')
    this.type = type
  }
}

export default Instruction
