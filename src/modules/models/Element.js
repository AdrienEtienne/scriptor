import {
  uniqueId
} from 'lodash'

/**
 * Scriptor Element
 * @memberof model
 * @property {string} id Id
 * @property {string} name Name
 * @property {string} description Description
 */
class Element {
  /**
   * constructor - Create Element
   *
   * @param  {string} prefix    Id prefix
   * @param  {object} data   Element data
   * @param  {string} data.id Element id if exist
   * @param  {string} data.name Element name
   * @param  {string} data.description Element description
   */
  constructor (prefix, data) {
    this.id = data.id || uniqueId(prefix + '_')
    this.name = data.name
    this.description = data.description || ''
  }
}

export default Element
