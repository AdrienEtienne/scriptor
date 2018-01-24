class ValidationError extends Error {
  constructor (message, {argument, property = '', value = ''} = {}) {
    super(message)
    this.argument = argument
    this.property = property
    this.value = value
  }
}

export default ValidationError
