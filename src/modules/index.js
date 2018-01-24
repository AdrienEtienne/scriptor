
import Registry from './registry'
import Scriptor from './scriptor'

/**
 * Exported elements
 * @module {scriptor} export
 * @property {Registry} Registry Registry class
 * @property {Scriptor} Scriptor Scriptor class
 */
export {
   Registry,
   Scriptor
 }

 /**
  * createScriptor - Instanciate a scriptor from a registry worker array
  * @module default
  * @param {worker[]} workers Array of workers
  * @return {Scriptor}     A newly created scriptor
  */
function createScriptor (workers) {
  const registry = new Registry(workers)
  const scriptor = new Scriptor(registry)
  return scriptor
}

 /**
  * Expected format for a worker
  * @typedef {object} worker
  * @global
  * @property {string} name Name
  * @property {task[]} tasks Array of tasks
  */

/**
  * Expected format for a task
  * @typedef {object} task
  * @global
  * @property {string} name Name
  * @property {need[]} needs Array of needs
  */

/**
 * Expected format for a need
 * @typedef {Object} need
 * @global
 * @property {string} name Name
 * @property {string} worker Name of the worker to use for typing
 */

export default createScriptor
