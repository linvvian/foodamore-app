import {
  FETCH_ONE_RECIPE,
  UPDATE_RECIPE,
  DELETE_RECIPE,
} from '../actions/types'

export default (state={}, action) => {
  switch (action.type) {
    case FETCH_ONE_RECIPE:
      return action.payload
    case UPDATE_RECIPE:
      return action.recipe
    default:
      return state
  }
}
