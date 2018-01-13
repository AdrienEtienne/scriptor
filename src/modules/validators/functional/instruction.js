import ValidationError from '../ValidationError'
import Result from '../Result'
import * as INSTRUCTION from '../../instruction/TYPES'

function composer (scriptor) {
  return (validators) => {
    let errors = []

    validators.forEach(validator => {
      try {
        validator(scriptor)
      } catch (e) {
        errors.push(e)
      }
    })

    return errors
  }
}

const workerExist = (workerId) => (scriptor) => {
  const worker = scriptor.query.worker.id(workerId).value
  if (!worker) {
    throw new ValidationError('Worker not found', {
      argument: 'workerId',
      property: 'instance'
    })
  }
}

const instanceNameTaken = (name) => (scriptor) => {
  let position = scriptor.position
  scriptor.goToTail()
  let shallThrow = false
  scriptor.instances.forEach(instance => {
    if (instance.name === name) {
      shallThrow = true
      return false
    }
  })

  scriptor.goTo(position)

  if (shallThrow) {
    throw new ValidationError('Instance name "' + name + '" taken', {
      argument: name,
      property: 'instance'
    })
  }
}

export default function instruction (scriptor) {
  const compose = composer(scriptor)

  return function (type, obj) {
    const result = new Result()
    let errors = []

    if (INSTRUCTION.INSTANCE_CREATE === type) {
      errors = compose([
        workerExist(obj.instance.workerId),
        instanceNameTaken(obj.instance.name)
      ])
    } else {

    }

    result.setErrors(errors)
    return result
  }
}
