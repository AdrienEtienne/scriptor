class ValidationError extends Error {
  constructor (message, {argument, property = ''} = {}) {
    super(message)
    this.argument = argument
    this.property = property
  }
}

export default ValidationError
