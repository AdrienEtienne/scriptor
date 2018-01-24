import Instruction from './Instruction'

/**
 * Instruction for task call
 * @memberof instruction
 * @extends Instruction
 * @property {string} instanceId Instance Id
 * @property {string} taskId Task Id
 * @property {string[]} needs Needs for task as array of instance id
 *
 */
class InstructionCallTask extends Instruction {
  constructor (data) {
    super('call_task')
    this.instanceId = data.instanceId
    this.taskId = data.taskId
    this.needs = data.needs
  }
}

export default InstructionCallTask
