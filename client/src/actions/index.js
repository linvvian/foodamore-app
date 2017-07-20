export const setUser = (user) => {
  return {
    type: 'SET_USER',
    user: user,
  }
}

const baseURL = 'http://localhost:3000/api/v1'

export const fetchUser = () => {
  const user = fetch(`${baseURL}/users/1`, {
    headers: headers()
  }).then(res => res.json())
  .then(user => user)
  return {
    type: 'FETCH_USER',
    payload: user
  }
}

function headers () {
  return {
    'content-type': 'application/json',
    'accept': 'application/json',
    'Authorization': localStorage.getItem('jwt')
  }
}
