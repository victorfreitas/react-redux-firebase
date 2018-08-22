import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import './style.css'

import AppNavBar from '../layout/AppNavBar'
import Dashboard from '../layout/Dashboard'
import AddClient from '../Clients/AddClient'
import ClientDetails from '../Clients/ClientDetails'
import EditClient from '../Clients/EditClient'

class App extends Component {
  render() {
    return (
      <div className="app">
        <AppNavBar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/client/add" component={AddClient} />
            <Route exact path="/client/:id" component={ClientDetails} />
            <Route exact path="/client/edit/:id" component={EditClient} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App
