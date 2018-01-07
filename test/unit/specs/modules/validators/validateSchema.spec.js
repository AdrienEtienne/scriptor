import {
  registry,
  instruction
} from '@/modules/validators/validateSchema'
import * as SCHEMA from '@/modules/validators/SCHEMA'
import * as INSTRUCTION from '@/modules/instruction/TYPE'
import Result from '@/modules/validators/Result'

describe('schema validator', () => {
  describe('registry', function () {
    let arr = null
    const errors = (arg) => registry(arg).errors
    const fn = (arg) => () => registry(arg)

    beforeEach(() => {
      arr = [{
        name: 'worker',
        tasks: [{
          name: 'task',
          return: 'worker',
          needs: [{
            name: 'need',
            worker: 'worker'
          }]
        }]
      }]
    })

    it('return result object', () => {
      expect(registry(arr)).toBeInstanceOf(Result)
    })

    it('throw if arg is not an array', () => {
      expect(fn()).toThrowError(/is not an Array/)
      expect(fn('')).toThrowError(/is not an Array/)
      expect(fn({})).toThrowError(/is not an Array/)
    })

    it('throw if empty array', () => {
      expect(fn([])).toThrowError('You cannot pass an empty Array')
    })

    it('throw if bad type', () => {
      arr[0].tasks = 'string'
      expect(fn(arr)).toThrowError(/is not of a type/)
    })

    it('return empty array', () => {
      expect(registry(arr).status).toEqual(0)
      expect(registry(arr).errors).toHaveLength(0)
    })

    it('return one error', () => {
      delete arr[0].name
      expect(errors(arr)).toHaveLength(1)
    })
    it('return error for worker', () => {
      delete arr[0].name
      const error = errors(arr)[0]
      expect(error.message).toEqual('requires property "name"')
      expect(error.worker).toEqual(0)
      expect(error.task).toEqual(-1)
      expect(error.need).toEqual(-1)
      expect(error.attribute).toEqual('name')
    })
    it('return error for task', () => {
      delete arr[0].tasks[0].name
      const error = errors(arr)[0]
      expect(error.message).toEqual('requires property "name"')
      expect(error.worker).toEqual(0)
      expect(error.task).toEqual(0)
      expect(error.need).toEqual(-1)
      expect(error.attribute).toEqual('name')
    })
    it('return error for need', () => {
      delete arr[0].tasks[0].needs[0].name
      const error = errors(arr)[0]
      expect(error.message).toEqual('requires property "name"')
      expect(error.worker).toEqual(0)
      expect(error.task).toEqual(0)
      expect(error.need).toEqual(0)
      expect(error.attribute).toEqual('name')
    })
  })
  describe('instruction', function () {
    const errors = (schema, arg) => instruction(schema, arg).errors

    it('validation success', () => {
      expect(instruction(SCHEMA.INSTRUCTION_INSTANCE_CREATE, {
        name: 'name',
        workerId: 'workerId'
      }).status).toEqual(0)
    })

    it('validate instruction ' + INSTRUCTION.INSTANCE_CREATE, () => {
      const errs = errors(SCHEMA.INSTRUCTION_INSTANCE_CREATE, {})
      expect(errs[0].message).toEqual('requires property "name"')
      expect(errs[0].attribute).toEqual('name')
      expect(errs[1].message).toEqual('requires property "workerId"')
      expect(errs[1].attribute).toEqual('workerId')
    })
  })
})
