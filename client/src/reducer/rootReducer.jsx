const rootReducer = (state = {
  user: {},
  lists: [],
  recipes: [],
  tags: [],
}, action) => {

  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.user }
      break;
    case 'FETCH_USER':
      return { ...state, lists: action.payload.lists, recipes: action.payload.recipes }
      break;
    case 'FETCH_TAGS':
      return { ...state, tags: action.payload }
      break;
    default:
      return state
  }
}

export default rootReducer
