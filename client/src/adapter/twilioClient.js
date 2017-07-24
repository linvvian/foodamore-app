import axios from 'axios'

export const sendSms = function(to, message) {
  axios.post('http://localhost:3000/sendsms', { to, message } )
  .then(response => response)
  console.log('in twilio')
}
