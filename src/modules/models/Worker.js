import Element from './Element'

/**
 * An element Worker
 * @extends Element
 * @property {Task[]} tasks Tasks
 */
class Worker extends Element {
  /**
   * constructor - Worker
   *
   * @param  {object} data Data
   * @param  {Task[]} data.tasks Tasks
   */
  constructor (data) {
    super('worker', data)
    this.tasks = data.tasks || []
  }
}

export default Worker
