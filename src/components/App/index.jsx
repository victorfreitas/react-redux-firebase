import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import './style.css'

import AppNavBar from '../layout/AppNavBar'
import Dashboard from '../layout/Dashboard'
import AddClient from '../Clients/AddClient'
import ClientDetails from '../Clients/ClientDetails'
import EditClient from '../Clients/EditClient'
import Login from '../auth/Login'
import NotFound from '../pages/NotFound'

import { UserIsAuthenticated, UserIsNotAuthenticated } from '../../helpers/auth'

class App extends Component {
  render() {
    return (
      <div className="app">
        <AppNavBar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={UserIsAuthenticated(Dashboard)} />
            <Route exact path="/client/add" component={UserIsAuthenticated(AddClient)} />
            <Route exact path="/client/:id" component={UserIsAuthenticated(ClientDetails)} />
            <Route exact path="/client/edit/:id" component={UserIsAuthenticated(EditClient)} />
            <Route exact path="/login" component={UserIsNotAuthenticated(Login)} />
            <Route path="*" component={UserIsAuthenticated(NotFound)} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App
