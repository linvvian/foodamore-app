const rootReducer = (state = {
  user: {},
  lists: [],
}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.user }
      break;
    default:
      return state
  }
}

export default rootReducer
