import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import reduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import 'semantic-ui-css/semantic.min.css'
import './styles/index.css'

import App from './container/app'
import rootReducer from './reducer/index'
import { AUTH_USER} from './actions/types'
import registerServiceWorker from './registerServiceWorker'

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(reduxThunk)
))

const token = localStorage.getItem('jwt')
const id = localStorage.getItem('id')

if (token) {
  console.log('valid token')
  store.dispatch({ type: AUTH_USER, id: id })
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'))
registerServiceWorker()
