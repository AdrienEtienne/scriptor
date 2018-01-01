import Element from './Element'

/**
 * An element Need
 * @extends Element
 * @property {string} workerId Worker Id
 */
class Need extends Element {
  /**
   * constructor - Need
   *
   * @param  {object} data Data
   * @param  {string} data.workerId Worker Id
   */
  constructor (data) {
    super('need', data)
    this.workerId = data.workerId
  }
}

export default Need
