const baseURL = 'http://localhost:3000/api/v1'

export const postUser = (user) => {
  const newUser = fetch('http://localhost:3000/api/v1/users', {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(user)
  })
  .then(res => res.json())
  .then(user => {
    if (user.status === 200){
      localStorage.setItem('jwt', user.jwt )
    }
    return user
  })
  .catch((error) => console.log('sign up error', error.message))
  console.log(newUser)
  return {
    type: 'POST_USER',
    user: newUser,
  }
}

export const setUser = (user) => {
  console.log('setting user', user)
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
  .catch((error) => console.log('fetch user', error.message))
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
  .catch((error) => console.log('fetch user recipes', error.message))
  return {
    type: 'FETCH_USER_RECIPES',
    payload: user.recipes
  }
}

export const fetchRecipe = (id) => {
  const recipe = fetch(`${baseURL}/recipes/${id}`, {
    headers: headers()
  }).then(res => res.json())
  .then(recipe => recipe)
  .catch((error) => console.log('fetch single recipe', error.message))
  return {
    type: 'FETCH_ONE_RECIPE',
    payload: recipe,
  }
}

export const updateRecipe = (recipe) => {
  const recipeUpdated = fetch(`${baseURL}/recipes/${recipe.id}`, {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify(recipe),
  })
  .then(res => res.json())
  .then(recipe => {
    if(recipe.status === 200){
      // history.push('')
      return recipe
    }
  })
  .catch((error) => console.log('update recipe', error.message))
  return {
    type: 'UPDATE_RECIPE',
    recipe: recipeUpdated,
  }
}

export const fetchTags = () => {
  const tags = fetch(`${baseURL}/tags`, {
    headers: headers()
  }).then(res => res.json())
  .then(tags => tags)
  .catch((error) => console.log('fetch tags', error.message))
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
