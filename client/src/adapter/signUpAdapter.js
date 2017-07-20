const  baseURL = 'http://localhost:3000/api/v1/'

export default class SignUpAdapter {

  static login (loginParams) {
    return fetch(`${prodUrl}/auth`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(loginParams)
    }).then(res => res.json())
  }
}
