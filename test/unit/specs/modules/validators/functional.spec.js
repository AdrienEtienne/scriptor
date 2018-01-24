import validators from '@/modules/validators'
import Result from '@/modules/validators/Result'

const registry = validators.functional.registry
const instruction = validators.functional.instruction

describe('functional validator', () => {
  describe('registry', function () {
    let arr = null
    const getErrors = (arr) => registry(arr).errors

    beforeEach(() => {
      arr = [{
        name: 'worker',
        tasks: [{
          name: 'task',
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
    it('pass if no tasks', () => {
      delete arr[0].tasks
      expect(registry(arr).status).toEqual(0)
    })
    it('pass if no needs', () => {
      delete arr[0].tasks[0].needs
      expect(registry(arr).status).toEqual(0)
    })

    describe('errors', () => {
      let errors

      describe('name already used', () => {
        it('return errors for worker name used', () => {
          errors = getErrors([
            ...arr,
            ...arr
          ])
          expect(errors).toHaveLength(2)
          errors.forEach((error) => {
            expect(error.message).toEqual('Name "worker" already used')
          })
        })
        it('return errors for task name used', () => {
          arr[0].tasks.push(arr[0].tasks[0])
          errors = getErrors(arr)
          expect(errors).toHaveLength(2)
          errors.forEach((error) => {
            expect(error.message).toEqual('Name "task" already used')
          })
        })
        it('return errors for task name used', () => {
          arr[0].tasks[0].needs
            .push(arr[0].tasks[0].needs[0])
          errors = getErrors(arr)
          expect(errors).toHaveLength(2)
          errors.forEach((error) => {
            expect(error.message).toEqual('Name "need" already used')
          })
        })
      })

      describe('worker not exist', () => {
        it('return error for worker not exist', () => {
          arr[0].tasks[0].needs[0].worker = 'not exist'
          errors = getErrors(arr)
          expect(errors).toHaveLength(1)
          expect(errors[0].message).toEqual('Worker "not exist" is not defined')
        })
      })
    })
  })

  describe('instruction', function () {
    it('throw if type not defined', () => {
      expect(() => instruction()('undefined')).toThrow('Instruction type "undefined" undefined')
    })
  })
})
