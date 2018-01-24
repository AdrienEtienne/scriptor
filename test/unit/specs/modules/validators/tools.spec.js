import {
  composer
} from '@/modules/validators/functional/tools'

describe('functional validator tools', () => {
  describe('composer', function () {
    let compose = composer()

    describe('next', function () {
      it('return two errors next at true', () => {
        expect(compose({
          validator: () => { throw new Error() },
          next: true
        },
          () => { throw new Error() }
        )).toHaveLength(2)
      })
      it('return only one error if false', () => {
        expect(compose({
          validator: () => { throw new Error() },
          next: false
        }, () => { throw new Error() }
        )).toHaveLength(1)
      })

      it('return only one error by default', () => {
        expect(compose(
          () => { throw new Error() },
          () => { throw new Error() }
        )).toHaveLength(1)
      })
    })
  })
})
