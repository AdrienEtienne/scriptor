export const WORKER = {
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

export const TASK = {
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

export const NEED = {
  'id': '/Need',
  'type': 'object',
  'properties': {
    'name': {'type': 'string'},
    'worker': {'type': 'string'}
  },
  'required': ['name']
}

export const REGISTRY = {
  'id': '/Registry',
  'type': 'object',
  'properties': {
    'workers': {
      'type': 'array',
      'items': {'$ref': '/Worker'}
    }
  },
  'required': ['workers']
}

export const INSTRUCTION_INSTANCE_CREATE = {
  'id': '/Instruction',
  'type': 'object',
  'properties': {
    'name': {'type': 'string'},
    'workerId': {'type': 'string'}
  },
  'required': ['name', 'workerId']
}
