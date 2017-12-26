import validate from '@/modules/registry/validators/schema'
import Result from '@/modules/registry/validators/Result'

describe('schema validator', () => {
  let arr = null
  const errors = (arg) => validate(arg).errors
  const fn = (arg) => () => validate(arg)

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
    expect(validate(arr)).toBeInstanceOf(Result)
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
    expect(validate(arr).status).toEqual(0)
    expect(validate(arr).errors).toHaveLength(0)
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
