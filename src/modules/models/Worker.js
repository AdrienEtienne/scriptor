import Element from './Element'

/**
 * An element Worker
 * @memberof model
 * @extends model.Element
 * @property {model.Task[]} tasks Tasks
 */
class Worker extends Element {
  /**
   * constructor - Worker
   *
   * @param  {object} data Data
   * @param  {model.Task[]} data.tasks Tasks
   */
  constructor (data) {
    super('worker', data)
    this.tasks = data.tasks || []
  }
}

export default Worker
