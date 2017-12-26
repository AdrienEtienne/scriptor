import Registry from '@/modules/registry'

describe('Registry', () => {
  let arr = null
  let registry = null

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
    registry = new Registry(arr)
  })

  it('should contain elements of the array', () => {
    expect(registry.elements).toEqual(arr)
  })

  it('throw an arror if coding error', () => {
    expect(() => new Registry()).toThrow(Error)
  })

  it('throw a RegistryError with model schema error', () => {
    delete arr[0].name
    expect(() => new Registry(arr)).toThrow('Cannot validate model schema')
  })

  it('throw a RegistryError with functional model error', () => {
    arr[0].name = 'worker2'
    expect(() => new Registry(arr)).toThrow('Cannot validate functional model')
  })
})
