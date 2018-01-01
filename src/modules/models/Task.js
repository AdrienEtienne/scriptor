import Element from './Element'

/**
 * An element Task
 * @extends Element
 * @property {Need[]} needs Needs
 */
class Task extends Element {
  /**
   * constructor - Task
   *
   * @param  {object} data Data
   * @param  {Need[]} data.needs Needs
   */
  constructor (data) {
    super('task', data)
    this.needs = data.needs || []
  }
}

export default Task
