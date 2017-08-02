import {
  FETCH_ONE_RECIPE,
  UPDATE_RECIPE,
  SET_RECIPE,
} from '../actions/types'

export default (state={}, action) => {
  switch (action.type) {
    case FETCH_ONE_RECIPE:
      return action.payload
    case UPDATE_RECIPE:
      return state
    case SET_RECIPE:
      return action.recipe
    default:
      return state
  }
}
