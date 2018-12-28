import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { firebaseConnect, firestoreConnect } from 'react-redux-firebase'

import './style.css'

import { envCollection as collection } from '../../../environments'

class AppNavBar extends Component {
  componentWillMount() {
    const { firestore } = this.props
    firestore.get(collection)
  }

  handleLogout = (event) => {
    event.preventDefault()

    const { firebase } = this.props
    firebase.logout()
  }

  renderNavItems() {
    const { auth } = this.props

    if (!auth.uid) {
      return null
    }

    return (
      <Fragment>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/client/add" className="nav-link">
              Add New
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <span className="nav-link">
              {auth.email}
            </span>
          </li>
          <li className="nav-item">
            <Link to="/settings" className="nav-link">
              Settings
            </Link>
          </li>
          <li className="nav-item">
            <span className="nav-link logout-link" onClick={this.handleLogout}>
              Logout
            </span>
          </li>
        </ul>
      </Fragment>
    )
  }

  renderNavItemsWithoutLogin() {
    const { settings, auth } = this.props

    if (!settings.allowRegistration || auth.uid) {
      return null
    }

    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
      </ul>
    )
  }

  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
        <div className="container">
          <Link to="/" className="navbar-brand">
            ClientPanel
          </Link>
          <button
            type="button"
            data-toggle="collapse"
            data-target="#navbar-main"
            className="navbar-toggler"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbar-main">
            {this.renderNavItems()}
            {this.renderNavItemsWithoutLogin()}
          </div>
        </div>
      </nav>
    )
  }
}

AppNavBar.defaultProps = {
  settings: {},
}

AppNavBar.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
}

export default compose(
  firebaseConnect(),
  firestoreConnect(),
  connect(({ firebase, firestore }) => ({
    auth: firebase.auth,
    settings: firestore.data.env && firestore.data.env.settings,
  }))
)(AppNavBar)
