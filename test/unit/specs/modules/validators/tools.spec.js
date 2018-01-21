import {
  composer
} from '@/modules/validators/functional/tools'

describe('functional validator tools', () => {
  describe('composer', function () {
    let compose = composer()

    describe('goToNext', function () {
      it('return two errors if not array or true', () => {
        expect(compose(
          [() => { throw new Error() }, true],
          () => { throw new Error() }
        )).toHaveLength(2)
        expect(compose(
          () => { throw new Error() },
          () => { throw new Error() }
        )).toHaveLength(2)
      })
      it('return only one error if false', () => {
        expect(compose(
          [() => { throw new Error() }, false],
          () => { throw new Error() }
        )).toHaveLength(1)
      })
    })
  })
})
