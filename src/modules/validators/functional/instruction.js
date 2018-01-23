import ValidationError from '../ValidationError'
import Result from '../Result'
import {
  INSTANCE_CREATE,
  TASK_CALL
} from '../../instruction/TYPES'
import {
 composer
} from './tools'

const workerExist = (workerId) => (scriptor) => {
  const worker = scriptor.registry.query.worker.id(workerId).value
  if (!worker) {
    throw new ValidationError('Worker does not exist', {
      argument: 'id',
      property: 'worker',
      value: workerId
    })
  } else return worker
}

const instanceNameTaken = (name) => (scriptor) => {
  let position = scriptor.position
  scriptor.goToTail()
  let shallThrow = false
  scriptor.query.instance.values.forEach(instance => {
    if (instance.name === name) {
      shallThrow = true
      return false
    }
  })

  scriptor.goTo(position)

  if (shallThrow) {
    throw new ValidationError('Instance name "' + name + '" taken', {
      argument: 'name',
      property: 'instance',
      value: name
    })
  }
}

const instanceExist = (instanceId) => (scriptor) => {
  const instance = scriptor.query.instance.id(instanceId).value
  if (!instance) {
    throw new ValidationError('Instance does not exist', {
      argument: 'id',
      property: 'instance',
      value: instanceId
    })
  } else return instance
}

const taskExist = (taskId) => (scriptor) => {
  const task = scriptor.query.task.id(taskId).value
  if (!task) {
    throw new ValidationError('Task does not exist', {
      argument: 'id',
      property: 'task',
      value: taskId
    })
  } else return task
}

export default function instruction (scriptor) {
  const compose = composer(scriptor)

  return function (type, obj) {
    const result = new Result()
    let errors = []

    if (INSTANCE_CREATE === type) {
      errors = compose(
        workerExist(obj.instance.workerId),
        instanceNameTaken(obj.instance.name)
      )
    } else if (TASK_CALL === type) {
      errors = compose(
        instanceExist(obj.instanceId),
        taskExist(obj.taskId)
      )
    }

    result.setErrors(errors)
    return result
  }
}
