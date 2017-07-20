import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import Async from './middleware/async'
import 'semantic-ui-css/semantic.min.css'
import './styles/index.css'

import App from './container/app'
import rootReducer from './reducer/rootReducer'
import registerServiceWorker from './registerServiceWorker'

let storeWithMiddleware = applyMiddleware(Async)(createStore)

ReactDOM.render(
  <Provider store={storeWithMiddleware(rootReducer)}>
    <App />
  </Provider>,
  document.getElementById('root'))
registerServiceWorker()
