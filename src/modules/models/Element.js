import {
  uniqueId
} from 'lodash'

/**
 * Scriptor Element
 * @memberof model
 * @property {string} id Id
 * @property {string} name Name
 */
class Element {
  /**
   * constructor - Create Element
   *
   * @param  {string} prefix    Id prefix
   * @param  {object} data   Element data
   * @param  {string} data.id Element id if exist
   * @param  {string} data.name Element name
   */
  constructor (prefix, data) {
    this.id = data.id || uniqueId(prefix + '_')
    this.name = data.name
  }
}

export default Element
