import {
  map,
  uniqueId
} from 'lodash'
import models from '../models'

const {
  Worker,
  Task,
  Need
} = models

export const mapWithId = (arr = [], prefix, fn) => {
  fn = fn || function (el) {
    return el
  }
  return map(arr, el => (fn({
    ...el,
    id: uniqueId(prefix + '_')
  })))
}

export const setIds = (arr) => {
  let workers = mapWithId(arr, 'worker')

  workers.forEach(worker => {
    worker.tasks = mapWithId(worker.tasks, 'task')

    worker.tasks.forEach(task => {
      task.needs = mapWithId(task.needs, 'need')

      task.needs.forEach(need => {
        const worker = workers.find(el => el.name === need.worker)
        need.workerId = worker.id
      })
    })
  })

  return workers
}

export const construct = (arr) => {
  return map(arr, worker => (new Worker({
    ...worker,
    tasks: map(worker.tasks, task => (new Task({
      ...task,
      needs: map(task.needs, need => (new Need(need)))
    })))
  })))
}
