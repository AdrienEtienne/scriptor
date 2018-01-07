import {
  Validator
} from 'jsonschema'
import ValidationError from './ValidationError'
import Result from './Result'
import * as SCHEMA from './SCHEMA'

export const parseError = (error) => {
  const message = error.message
  let attribute = error.argument
  let worker = -1
  let task = -1
  let need = -1

  if (/is not of a type/.test(message)) {
    throw new Error(error.stack)
  }

  const properties = error.property.split('.')
  const pattern = /(.*)\[(.*)\]/
  properties.forEach(property => {
    if (property === 'instance') return
    const matches = property.match(pattern)
    const el = matches[1]
    const index = matches[2]
    if (el === 'workers') worker = parseInt(index)
    else if (el === 'tasks') task = parseInt(index)
    else need = parseInt(index)
  })

  return new ValidationError(message, {
    worker, task, need, attribute
  })
}

export function registry (toValidate) {
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
}

export function instruction (schema, obj) {
  const result = new Result()

  const v = new Validator()
  const validation = v.validate(obj, schema)

  const errors = []
  validation.errors.forEach(error => {
    errors.push(parseError(error))
  })
  if (errors.length > 0) result.setErrors(errors)

  return result
}
