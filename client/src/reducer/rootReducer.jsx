const rootReducer = (state = {
  user: {},
  lists: [],
  recipes: [],
  tags: [],
  recipe: {},
}, action) => {

  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.user }
      break;
    case 'FETCH_USER':
      return { ...state, lists: action.payload.lists, recipes: action.payload.recipes }
      break;
    case 'FETCH_USER_RECIPES':
      return { ...state, recipes: action.payload }
      break;
    case 'FETCH_ONE_RECIPE':
      return { ...state, recipe: action.payload }
      break;
    case 'UPDATE_RECIPE':
      return { ...state, recipe: action.recipe }
      break;
    case 'FETCH_TAGS':
      return { ...state, tags: action.payload }
      break;
    default:
      return state
  }
}

export default rootReducer
