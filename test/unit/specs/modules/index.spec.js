import createScriptor, {Scriptor} from '@/modules'

describe('modules', () => {
  it('should create a scriptor', () => {
    const scriptor = createScriptor([{name: 'worker'}])
    expect(scriptor).toBeInstanceOf(Scriptor)
  })
  it('should create a scriptor with an object', () => {
    const scriptor = createScriptor({
      workers: [{name: 'worker'}]
    })
    expect(scriptor).toBeInstanceOf(Scriptor)
  })
})
