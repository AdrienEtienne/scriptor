class ValidationError extends Error {
  constructor (message, {property, value = ''} = {}) {
    super(message)
    this.property = property
    this.value = value
  }
}

export default ValidationError
