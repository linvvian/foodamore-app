const rootReducer = (state = {
  user: {},
  lists: [],
}, action) => {
  console.log(action)
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.user }
      break;
    case 'FETCH_USER':
      return { ...state, lists: action.payload.lists, recipes: action.payload.recipes }
      break;
    default:
      return state
  }
}

export default rootReducer
