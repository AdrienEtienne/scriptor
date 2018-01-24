import { forEach, isFunction, noop } from 'lodash'

export function composer (scriptor) {
  return (...validators) => {
    let errors = []

    forEach(validators, el => {
      let validate
      let next = false
      let callback = noop
      if (!isFunction(el)) {
        validate = el.validator
        if (el.next !== undefined) next = el.next
        if (el.callback) callback = el.callback
      } else validate = el

      try {
        validate(scriptor, callback)
      } catch (e) {
        errors.push(e)
        if (!next) return false
      }
    })

    return errors
  }
}
