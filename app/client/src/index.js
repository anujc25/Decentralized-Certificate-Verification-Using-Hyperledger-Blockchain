import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import BrowserRouters from './components/BrowserRouters'
import { BrowserRouter } from 'react-router-dom'
import allReducers from './reducers'
import {createStore} from 'redux'
import {Provider} from 'react-redux'

const store = createStore(allReducers)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <BrowserRouters />
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'))
registerServiceWorker()
