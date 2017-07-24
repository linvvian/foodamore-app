import {
  FETCH_USER,
  FETCH_USER_RECIPES,
  FETCH_TAGS,
} from '../actions/types'

export const recipes_listsReducer = (state={ lists:[], recipes: [], }, action) => {
  switch (action.type) {
    case FETCH_USER:
      return { ...state, lists: action.payload.lists, recipes: action.payload.recipes }
    case FETCH_USER_RECIPES:
      return { ...state, recipes: action.payload }
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
