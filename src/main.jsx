import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/index.js'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import './i18n/i18next.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
  <Provider store={store}>
    {/* <ThemeProvider> */}
      {/* <CssBaseline /> */}
      <App />
    {/* </ThemeProvider> */}
  </Provider>
  //</React.StrictMode>,
)
