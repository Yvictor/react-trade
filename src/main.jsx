import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Theme } from 'react-daisyui'
import './index.css'
import store from './redux/store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Theme>
      <Provider store={store}>
        <App />
      </Provider>
    </Theme>
  </React.StrictMode>
)
