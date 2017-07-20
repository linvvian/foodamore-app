import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import 'semantic-ui-css/semantic.min.css'
import './styles/index.css'

import App from './container/App'
import rootReducer from './reducer/rootReducer'
import registerServiceWorker from './registerServiceWorker'

let store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
