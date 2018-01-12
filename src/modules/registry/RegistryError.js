class RegistryError extends Error {
  constructor (message, errors) {
    super(message)
    this.errors = errors
  }
}

export default RegistryError
