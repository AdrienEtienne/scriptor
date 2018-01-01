import {
  map
} from 'lodash'
import models from '../models'

const {
  Worker,
  Task,
  Need
} = models

export const construct = (arr) => {
  let workers = map(arr, worker => new Worker(worker))

  workers.forEach(worker => {
    worker.tasks = map(worker.tasks, task => new Task(task))

    worker.tasks.forEach(task => {
      task.needs = map(task.needs, need => {
        const tmp = workers.find(el => el.name === need.worker)
        return new Need({
          ...need,
          workerId: tmp.id
        })
      })
    })
  })

  return workers
}
