export const INSTANCE_CREATE = {
  'id': '/InstructionInstanceCreate',
  'type': 'object',
  'properties': {
    'instance': {'$ref': '/Instance'}
  },
  'required': ['instance']
}

export const INSTANCE_CALL = {
  'id': '/InstructionInstanceCall',
  'type': 'object',
  'properties': {
    'instance': {'$ref': '/Instance'},
    'taskId': {'type': 'string'},
    'needs': {
      'type': 'array',
      'items': {'$ref': '/Instance'}
    }
  },
  'required': ['instance', 'task']
}
