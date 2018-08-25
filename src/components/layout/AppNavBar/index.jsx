import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { firebaseConnect } from 'react-redux-firebase'

import './style.css'

class AppNavBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isAuthenticated: false,
    }
  }

  static getDerivedStateFromProps({ auth }) {
    return { isAuthenticated: !!auth.uid }
  }

  handleLogout = (event) => {
    event.preventDefault()

    const { firebase } = this.props

    firebase.logout()
  }

  renderNavItems() {
    const { isAuthenticated } = this.state
    const { auth } = this.props

    if (!isAuthenticated) {
      return null
    }

    return (
      <div className="collapse navbar-collapse" id="navbar-main">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Dashboard
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link">
              {auth.email}
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link logout-link" onClick={this.handleLogout}>
              Logout
            </a>
          </li>
        </ul>
      </div>
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
          {this.renderNavItems()}
        </div>
      </nav>
    )
  }
}

AppNavBar.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
}

export default compose(
  firebaseConnect(),
  connect(state => ({ auth: state.firebase.auth }))
)(AppNavBar)
