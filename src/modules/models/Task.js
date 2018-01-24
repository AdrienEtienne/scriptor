import Element from './Element'

/**
 * An element Task
 * @memberof model
 * @extends model.Element
 * @property {model.Need[]} needs Needs
 */
class Task extends Element {
  /**
   * constructor - Task
   *
   * @param  {object} data Data
   * @param  {model.Need[]} data.needs Needs
   */
  constructor (data) {
    super('task', data)
    this.needs = data.needs || []
  }
}

export default Task
