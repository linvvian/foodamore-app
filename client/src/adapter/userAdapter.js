const baseURL = 'http://localhost:3000/api/v1'

export default class UserAdapter {
  static getUserInfo(userId) {
    return fetch(`${baseURL}/user/${userId}`, {
      headers: headers()
    }).then(res => res.json())
  }
}

function headers () {
  return {
    'content-type': 'application/json',
    'accept': 'application/json',
    'Authorization': localStorage.getItem('jwt')
  }
}
