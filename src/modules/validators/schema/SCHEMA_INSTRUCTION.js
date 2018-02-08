export const CREATE_INSTANCE = {
  'id': '/InstructionInstanceCreate',
  'type': 'object',
  'properties': {
    'instance': {'$ref': '/Instance'}
  },
  'required': ['instance']
}

export const CALL_TASK = {
  'id': '/InstructionInstanceCall',
  'type': 'object',
  'properties': {
    'instanceId': {'type': 'string'},
    'taskId': {'type': 'string'},
    'needs': {
      'type': 'array',
      'items': {'type': 'string'}
    }
  },
  'required': ['instanceId', 'taskId']
}
