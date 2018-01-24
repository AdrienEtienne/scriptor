import validators from '@/modules/validators'
import INSTRUCTION from '@/modules/instruction/TYPE'
import Result from '@/modules/validators/Result'

const {
  registry,
  instruction
} = validators.schema

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
      expect(error.argument).toEqual('name')
      expect(error.property).toEqual('workers[0]')
    })
    it('return error for task', () => {
      delete arr[0].tasks[0].name
      const error = errors(arr)[0]
      expect(error.message).toEqual('requires property "name"')
      expect(error.argument).toEqual('name')
      expect(error.property).toEqual('workers[0].tasks[0]')
    })
    it('return error for need', () => {
      delete arr[0].tasks[0].needs[0].name
      const error = errors(arr)[0]
      expect(error.message).toEqual('requires property "name"')
      expect(error.argument).toEqual('name')
      expect(error.property).toEqual('workers[0].tasks[0].needs[0]')
    })
  })
  describe('instruction', function () {
    const errors = (type, arg) => instruction(type, arg).errors

    describe(INSTRUCTION.INSTANCE_CREATE, function () {
      it('validation success', () => {
        expect(instruction(INSTRUCTION.INSTANCE_CREATE, {
          instance: {
            name: 'name',
            workerId: 'workerId'
          }
        }).status).toEqual(0)
      })

      it('validate instruction ' + INSTRUCTION.INSTANCE_CREATE, () => {
        const errs = errors(INSTRUCTION.INSTANCE_CREATE, {
          instance: {}
        })
        expect(errs[0].message).toEqual('requires property "name"')
        expect(errs[0].argument).toEqual('name')
        expect(errs[0].property).toEqual('instance')
        expect(errs[1].message).toEqual('requires property "workerId"')
        expect(errs[1].argument).toEqual('workerId')
        expect(errs[1].property).toEqual('instance')
      })
    })
  })
})
