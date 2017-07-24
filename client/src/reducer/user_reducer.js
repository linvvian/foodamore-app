import { SET_USER } from '../actions/types'

export default (state = {}, action) => {
  switch (action.type) {
    case SET_USER:
      return action.user
    default:
      return state
    }
}
