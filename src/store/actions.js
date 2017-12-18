import {
    COUNTER_RESET
} from './mutations'

export const resetCounter = ({commit}) => {
  commit(COUNTER_RESET)
}
