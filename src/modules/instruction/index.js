import ScriptorError from '../ScriptorError'
import validators from '../validators'
import * as INSTRUCTION from './TYPES'
import Instance from '../models/Instance'
import InstructionCreateInstance from './InstructionCreateInstance'
import InstructionCallTask from './InstructionCallTask'

function validateInstruction (scriptor) {
  let schema = validators.schema.instruction
  let functional = validators.functional.instruction(scriptor)

  return (type, obj) => {
    if (!INSTRUCTION[type]) {
      throw new Error('Instruction type not defined')
    }

    let result = schema(type, obj)
    if (result.status > 0) throw new ScriptorError('Cannot validate instruction schema', result.errors)
    result = functional(type, obj)
    if (result.status > 0) throw new ScriptorError('Cannot validate instruction information', result.errors)
  }
}

function createInstruction (scriptor, add = true) {
  const validate = validateInstruction(scriptor)
  return (type, obj) => {
    validate(type, obj)

    let instruction
    if (type === INSTRUCTION.INSTANCE_CREATE) {
      const instance = new Instance({
        name: obj.instance.name,
        workerId: obj.instance.workerId
      })
      instruction = new InstructionCreateInstance({
        instance
      })
    } else if (type === INSTRUCTION.TASK_CALL) {
      instruction = new InstructionCallTask({
        instanceId: obj.instanceId,
        taskId: obj.taskId,
        needs: []
      })
    }

    if (add && instruction) {
      scriptor._instructions.splice(scriptor.position, 0, instruction)
      scriptor.goTo(scriptor.position + 1)
    }

    return instruction
  }
}

export default function (scriptor, add) {
  const create = createInstruction(scriptor, add)
  return {
    createInstance: (name, workerId) =>
      create(INSTRUCTION.INSTANCE_CREATE, {
        instance: {
          name,
          workerId
        }
      }),
    callTask: (instanceId, taskId, needs) =>
      create(INSTRUCTION.TASK_CALL, {
        instanceId,
        taskId,
        needs
      })
  }
}
