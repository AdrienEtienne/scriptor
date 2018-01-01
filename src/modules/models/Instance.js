import Element from './Element'

/**
 * An element Instance
 * @extends Element
 * @property {string} workerId Worker Id
 */
class Instance extends Element {
  /**
   * constructor - Variable
   *
   * @param  {object} data Data
   * @param  {string} data.workerId Worker Id
   */
  constructor (data) {
    super('instance', data)
    this.workerId = data.workerId
  }
}

export default Instance
