import {
  FETCH_USER,
  FETCH_USER_RECIPES,
  FETCH_TAGS,
  ADD_RECIPE,
  SEARCH_TERM,
  CLEAR_SEARCH,
} from '../actions/types'

export const recipes_listsReducer = (state={ lists:[], recipes: [], }, action) => {
  switch (action.type) {
    case FETCH_USER:
      return { ...state, lists: action.payload.lists, recipes: action.payload.recipes }
    case FETCH_USER_RECIPES:
      return { ...state, recipes: action.payload }
    case ADD_RECIPE:
      return { ...state, recipes: state.recipes.concat(action.payload) }
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
