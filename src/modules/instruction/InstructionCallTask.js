import Instruction from './Instruction'

/**
 * Instruction for task call
 * @extends Instruction
 * @property {string} instanceId Instance Id
 * @property {string} taskId Task Id
 *
 */
class CallTask extends Instruction {
  constructor (data) {
    super('call_task')
    this.instanceId = data.instanceId
    this.taskId = data.taskId
    this.needs = data.needs
  }
}

export default CallTask
