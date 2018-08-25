import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import PropTypes from 'prop-types'

import './style.css'

import Alert from '../../layout/Alert'
import Spinner from '../../layout/Spinner'

import { setNotify } from '../../../actions'

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      wait: false,
    }
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const { firebase, history, setNotify } = this.props
    const { email, password } = this.state

    this.setState({ isWait: true })

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ isWait: false })
        setNotify({ message: null, messageType: null })
        history.push('/')
      })
      .catch(err => {
        this.setState({ isWait: false })
        setNotify({
          message: err.message,
          messageType: 'danger',
        })
      })
  }

  renderNotify() {
    const { notify } = this.props

    if (!notify.message) {
      return null
    }

    return <Alert {...notify} />
  }

  render() {
    const { email, password, isWait } = this.state

    if (isWait) {
      return <Spinner />
    }

    return (
      <div className="row login">
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="card-body">
              <h1 className="text-center pb-4 pt-3">
                <span className="text-primary">
                  <i className="fa fa-lock" /> Login
                </span>
              </h1>

              {this.renderNotify()}

              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fa fa-at"></i>
                      </span>
                    </div>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={email}
                      onChange={this.handleChange}
                      placeholder="Email"
                      autoComplete="off"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fa fa-lock" />
                      </span>
                    </div>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={password}
                      onChange={this.handleChange}
                      placeholder="Password"
                      autoComplete="off"
                    />
                  </div>
                </div>

                <input type="submit" className="btn btn-primary btn-block" value="Login" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  firebase: PropTypes.object.isRequired,
  setNotify: PropTypes.func.isRequired,
  notify: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  notify: state.notify,
})

const mapDispatchToProps = {
  setNotify,
}

export default compose(
  firebaseConnect(),
  connect(mapStateToProps, mapDispatchToProps)
)(Login)
