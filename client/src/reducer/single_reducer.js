import {
  FETCH_USER,
  FETCH_USER_RECIPES,
  FETCH_TAGS,
  ADD_RECIPE,
  SEARCH_TERM,
  CLEAR_SEARCH,
  DELETE_RECIPE,
} from '../actions/types'

export const recipesReducer = (state=[], action) => {
  switch (action.type) {
    case FETCH_USER_RECIPES:
      return action.payload
    case DELETE_RECIPE:
      return state.filter(recipe => recipe.id !== action.payload.id)
    case ADD_RECIPE:
      return state.concat(action.payload)
    default:
      return state
  }
}

export const tagsReducer = (state=[], action) => {
  switch (action.type) {
    case FETCH_TAGS:
      return action.payload
    default:
      return state
  }
}

export const searchReducer = (state='', action) => {
  switch (action.type) {
    case SEARCH_TERM:
      return action.payload
    case CLEAR_SEARCH:
      return ''
    default:
      return state
  }
}
