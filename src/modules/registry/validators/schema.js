import {
  Validator
} from 'jsonschema'
import ValidationError from './ValidationError'
import Result from './Result'

const SCHEMA_WORKER = {
  'id': '/Worker',
  'type': 'object',
  'properties': {
    'name': {'type': 'string'},
    'tasks': {
      'type': 'array',
      'items': {'$ref': '/Task'}
    }
  },
  'required': ['name']
}

const SCHEMA_TASK = {
  'id': '/Task',
  'type': 'object',
  'properties': {
    'name': {'type': 'string'},
    'return': {'type': 'string'},
    'needs': {
      'type': 'array',
      'items': {'$ref': '/Need'}
    }
  },
  'required': ['name']
}

const SCHEMA_NEED = {
  'id': '/Need',
  'type': 'object',
  'properties': {
    'name': {'type': 'string'},
    'worker': {'type': 'string'}
  },
  'required': ['name']
}

const SCHEMA = {
  'id': '/All',
  'type': 'object',
  'properties': {
    'name': {'type': 'string'},
    'workers': {
      'type': 'array',
      'items': {'$ref': '/Worker'}
    }
  }
}

const v = new Validator()
v.addSchema(SCHEMA_NEED, '/Need')
v.addSchema(SCHEMA_TASK, '/Task')
v.addSchema(SCHEMA_WORKER, '/Worker')

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

export default (toValidate) => {
  const result = new Result()

  if (!(toValidate instanceof Array)) {
    throw new ValidationError('The json to validate is not an Array')
  } else if (toValidate.length === 0) {
    throw new ValidationError('You cannot pass an empty Array')
  }
  const validation = v.validate({
    workers: toValidate
  }, SCHEMA)

  const errors = []
  validation.errors.forEach(error => {
    errors.push(parseError(error))
  })
  if (errors.length > 0) result.setErrors(errors)

  return result
}
