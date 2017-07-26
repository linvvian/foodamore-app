import { combineReducers } from 'redux'
import authReducer from './auth_reducer'
import userReducer from './user_reducer'
import recipeReducer from './recipe_reducer'
import { tagsReducer, recipesReducer, searchReducer, listReducer } from './single_reducer'

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  recipes: recipesReducer,
  recipe: recipeReducer,
  tags: tagsReducer,
  searchTerm: searchReducer,
  lists: listReducer,
})

export default rootReducer
