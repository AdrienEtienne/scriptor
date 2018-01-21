import { forEach } from 'lodash'

export function composer (scriptor) {
  return (...validators) => {
    let errors = []

    forEach(validators, el => {
      let goToNext = true
      let validator = el
      if (validator instanceof Array) {
        goToNext = validator[1]
        validator = validator[0]
      }

      try {
        validator(scriptor)
      } catch (e) {
        errors.push(e)
        if (!goToNext) return false
      }
    })

    return errors
  }
}
