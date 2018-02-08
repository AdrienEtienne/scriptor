import ValidationError from '../ValidationError'
import Result from '../Result'
import INSTRUCTION from '../../instruction/TYPE'
import {
 composer
} from './tools'

const workerExist = (workerId) => (scriptor) => {
  const worker = scriptor.registry.query.worker.id(workerId).value
  if (!worker) {
    throw new ValidationError('Worker does not exist', {
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
      property: 'instance.name',
      value: name
    })
  }
}

const instanceExist = (instanceId) => (scriptor, callback) => {
  const instance = scriptor.query.instance.id(instanceId).value
  if (!instance) {
    throw new ValidationError('Instance does not exist', {
      property: 'instance',
      value: instanceId
    })
  }
  callback(instance)
}

const taskExistForWorker = (workerId, taskId) => (scriptor, callback) => {
  const task = scriptor.query
    .worker.id(workerId)
    .task.id(taskId).value
  if (!task) {
    throw new ValidationError('Task does not exist', {
      property: 'task',
      value: taskId
    })
  }
  callback(task)
}

const needsFulfilled = (task, needs = []) => scriptor => {
  task.needs.forEach((need, index) => {
    const instanceId = needs[index]

    if (!instanceId) {
      throw new ValidationError('Task\'s need is missing', {
        property: 'needs[' + index + ']'
      })
    }
    const instance = scriptor.query.instance.id(instanceId).value
    if (instance.workerId !== need.workerId) {
      throw new ValidationError('Task\'s need bad type', {
        property: 'needs[' + index + ']',
        value: instanceId
      })
    }
  })
}

export default function instruction (scriptor) {
  const compose = composer(scriptor)

  return function (type, obj) {
    const result = new Result()
    let errors = []

    if (INSTRUCTION.CREATE_INSTANCE === type) {
      errors = compose(
        workerExist(obj.instance.workerId),
        instanceNameTaken(obj.instance.name)
      )
    } else if (INSTRUCTION.CALL_TASK === type) {
      let instance
      let task
      errors = compose({
        validator: instanceExist(obj.instanceId),
        callback: (obj) => { instance = obj }
      }, {
        validator: (...args) => taskExistForWorker(instance.workerId, obj.taskId)(...args),
        callback: (obj) => { task = obj }
      }, (...args) => needsFulfilled(task, obj.needs)(...args))
    } else {
      throw Error('Instruction type "' + type + '" undefined')
    }

    result.setErrors(errors)
    return result
  }
}
