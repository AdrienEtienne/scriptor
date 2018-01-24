import Element from './Element'

/**
 * An element Instance
 * @extends model.Element
 * @memberof model
 * @property {string} name Name
 * @property {string} workerId Worker Id
 */
class Instance extends Element {
  /**
   * constructor - Variable
   *
   * @param  {object} data Data
   * @param  {string} data.name Name
   * @param  {string} data.workerId Worker Id
   */
  constructor (data) {
    super('instance', data)
    this.name = data.name
    this.workerId = data.workerId
  }
}

export default Instance
