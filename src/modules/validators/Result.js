class Result {
  constructor () {
    this.status = 0
    this.errors = []
  }

  setErrors (errors) {
    if (errors.length > 0) {
      this.status = 1
      this.errors = errors
    }
  }
}

export default Result
