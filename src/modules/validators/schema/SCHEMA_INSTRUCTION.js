export const INSTANCE_CREATE = {
  'id': '/InstructionInstanceCreate',
  'type': 'object',
  'properties': {
    'instance': {'$ref': '/Instance'}
  },
  'required': ['instance']
}

export const TASK_CALL = {
  'id': '/InstructionInstanceCall',
  'type': 'object',
  'properties': {
    'instanceId': {'type': 'string'},
    'taskId': {'type': 'string'},
    'needs': {
      'type': 'array',
      'items': {'$ref': '/Instance'}
    }
  },
  'required': ['instanceId', 'taskId']
}
