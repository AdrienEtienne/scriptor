import {
  Validator
} from 'jsonschema'
import ValidationError from '../ValidationError'
import Result from '../Result'
import * as SCHEMA from './SCHEMA'
import * as SCHEMA_INSTRUCTION from './SCHEMA_INSTRUCTION'

const parseError = (error) => {
  const message = error.message
  let argument = error.argument
  let property = error.property

  if (/is not of a type/.test(message)) {
    throw new Error(error.stack)
  }

  property = property.replace(/^instance\./, '')

  return new ValidationError(message, {
    argument,
    property
  })
}

export default {
  registry: function (toValidate) {
    const result = new Result()

    if (!(toValidate instanceof Array)) {
      throw new ValidationError('The json to validate is not an Array')
    } else if (toValidate.length === 0) {
      throw new ValidationError('You cannot pass an empty Array')
    }

    const v = new Validator()
    v.addSchema(SCHEMA.NEED, '/Need')
    v.addSchema(SCHEMA.TASK, '/Task')
    v.addSchema(SCHEMA.WORKER, '/Worker')
    v.addSchema(SCHEMA.REGISTRY, '/Registry')
    const validation = v.validate({
      workers: toValidate
    }, SCHEMA.REGISTRY)

    const errors = []
    validation.errors.forEach(error => {
      errors.push(parseError(error))
    })
    if (errors.length > 0) result.setErrors(errors)

    return result
  },

  instruction: function (type, obj) {
    const result = new Result()

    const v = new Validator()
    v.addSchema(SCHEMA.INSTANCE, '/Instance')

    let schema = SCHEMA_INSTRUCTION[type]
    const validation = v.validate(obj, schema)

    const errors = []
    validation.errors.forEach(error => {
      errors.push(parseError(error))
    })
    if (errors.length > 0) result.setErrors(errors)

    return result
  }
}