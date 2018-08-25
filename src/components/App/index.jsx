import React, { Fragment } from 'react'
import { BrowserRouter } from 'react-router-dom'

import './style.css'

import AppNavBar from '../layout/AppNavBar'
import Routes from '../Routes'

const App = () => (
  <BrowserRouter>
    <Fragment>
      <AppNavBar />
      <Routes />
    </Fragment>
  </BrowserRouter>
)

export default App
