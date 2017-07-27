import {
  FETCH_USER_RECIPES,
  FETCH_TAGS,
  ADD_RECIPE,
  SEARCH_TERM,
  CLEAR_SEARCH,
  DELETE_RECIPE,
  CREATE_LIST,
  SET_LIST,
  FETCH_USER_LISTS,
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

export const listReducer = (state=[], action) => {
  switch (action.type) {
    case CREATE_LIST:
      return state.concat(action.payload)
    case SET_LIST:
      return action.payload
    default:
      return state
  }
}

export const userListReducer = (state=[], action) => {
  switch (action.type) {
    case FETCH_USER_LISTS:
      action.payload
      return action.payload
    default:
      return state
  }
}
