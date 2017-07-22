const baseURL = 'http://localhost:3000/api/v1'

export default class AuthAdapter {
  static login (loginParams) {
    return fetch(`${baseURL}/login`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(loginParams)
    }).then(res => res.json())
    .catch((error) => {
      console.log(error.message)
    })
  }

  static currentUser () {
    return fetch(`${baseURL}/me`, {
      headers: headers()
    }).then(res => res.json())
    .catch((error) => {
      console.log(error.message)
    })
  }
}

function headers () {
  return {
    'content-type': 'application/json',
    'accept': 'application/json',
    'Authorization': localStorage.getItem('jwt')
  }
}
