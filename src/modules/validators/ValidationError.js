class ValidationError extends Error {
  constructor (message, {worker = -1, task = -1, need = -1, attribute} = {}) {
    super(message)
    this.worker = worker
    this.task = task
    this.need = need
    this.attribute = attribute
  }
}

export default ValidationError
