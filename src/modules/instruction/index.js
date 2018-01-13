import ScriptorError from '../ScriptorError'
import validators from '../validators'
import * as INSTRUCTION from './TYPES'
import Instance from '../models/Instance'
import InstructionCreateInstance from './InstructionCreateInstance'

function createInstruction (scriptor) {
  let schema = validators.schema.instruction
  let functional = validators.functional.instruction(scriptor)

  return (type, obj) => {
    let instruction = null

    if (!INSTRUCTION[type]) {
      throw new Error('Instruction type not defined')
    }

    let result = schema(type, obj)
    if (result.status > 0) throw new ScriptorError('Cannot validate instruction schema', result.errors)
    result = functional(type, obj)
    if (result.status > 0) throw new ScriptorError('Cannot validate instruction information', result.errors)

    const instance = new Instance({
      name: obj.instance.name,
      workerId: obj.instance.workerId
    })
    instruction = new InstructionCreateInstance({
      instance
    })

    return instruction
  }
}

export default createInstruction
