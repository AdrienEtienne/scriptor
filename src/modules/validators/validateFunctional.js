import { map, countBy } from 'lodash'
import ValidationError from './ValidationError'
import Result from './Result'

const isNameAlreadyUsed = (collection, name) => {
  const count = countBy(collection, (el) => el.name)
  return count[name] && count[name] > 1
}
const nameAlreadyUsedError = (errors, name, ...lstIndex) => {
  return [
    ...errors,
    new ValidationError(
      `Name "${name}" already used`,
      ...lstIndex)
  ]
}
const workerIsNotDefined = (errors, workers, workerName, ...lstIndex) => {
  const names = map(workers, 'name')
  if (names.indexOf(workerName) === -1) {
    return [
      ...errors,
      new ValidationError(
        `Worker "${workerName}" is not defined`,
        ...lstIndex)
    ]
  }
  return errors
}

export function registry (arr) {
  const result = new Result()
  let errors = []

  let workers = arr
  workers.forEach((worker, iWorker) => {
    if (isNameAlreadyUsed(workers, worker.name)) {
      errors = nameAlreadyUsedError(errors, worker.name, iWorker)
    }

    if (!worker.tasks) return

    let tasks = worker.tasks
    tasks.forEach((task, iTask) => {
      if (isNameAlreadyUsed(tasks, task.name)) {
        errors = nameAlreadyUsedError(errors, task.name, iWorker, iTask)
      }

      if (!task.needs) return

      let needs = task.needs
      needs.forEach((need, iNeed) => {
        if (isNameAlreadyUsed(needs, need.name)) {
          errors = nameAlreadyUsedError(errors, need.name, iWorker, iTask, iNeed)
        }
        errors = workerIsNotDefined(errors, workers, need.worker, iWorker, iTask, iNeed)
      })
    })
  })
  result.setErrors(errors)
  return result
}
