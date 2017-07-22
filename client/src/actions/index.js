const baseURL = 'http://localhost:3000/api/v1'

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    user: user,
  }
}

export const fetchUser = (userId) => {
  const user = fetch(`${baseURL}/users/${userId}`, {
    headers: headers()
  }).then(res => res.json())
  .then(user => user)
  .catch((error) => {
    console.log(error.message)
  })
  return {
    type: 'FETCH_USER',
    payload: user
  }
}

export const fetchUserRecipes = (userId) => {
  const user = fetch(`${baseURL}/users/${userId}`, {
    headers: headers()
  }).then(res => res.json())
  .then(user => user)
  .catch((error) => {
    console.log(error.message)
  })
  return {
    type: 'FETCH_USER_RECIPES',
    payload: user.recipes
  }
}

export const fetchTags = () => {
  const tags = fetch(`${baseURL}/tags`, {
    headers: headers()
  }).then(res => res.json())
  .then(tags => tags)
  .catch((error) => {
    console.log(error.message)
  })
  return {
    type: 'FETCH_TAGS',
    payload: tags
  }
}

function headers () {
  return {
    'content-type': 'application/json',
    'accept': 'application/json',
    'Authorization': localStorage.getItem('jwt')
  }
}
