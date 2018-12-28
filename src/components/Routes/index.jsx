import React from 'react'
import { Switch, Route } from 'react-router-dom'

import routes from './routes'

const Routes = () => (
  <div className="container">
    <Switch>
      {routes.map(route => (
        <Route exact { ...route } />
      ))}
    </Switch>
  </div>
)

export default Routes
