import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, firestoreConnect } from 'react-redux-firebase'
import PropTypes from 'prop-types'

import Spinner from '../../layout/Spinner'
import Alert from '../../layout/Alert'

import { setNotifyUser } from '../../../actions'
import { envCollection as collection } from '../../../environments'

class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isWait: false,
      email: '',
      password: '',
    }
  }

  async componentWillMount() {
    const { firestore, history } = this.props
    const doc = await firestore.get({ collection, doc: 'settings' })

    if (!doc.data || !doc.data().allowRegistration) {
      history.push('/')
    }
  }

  handleChange = ({ target: { name, value } }) => {
    const { setNotifyUser } = this.props

    setNotifyUser({ message: '', messageType: '' })
    this.setState({ [name]: value })
  }

  handleSubmit = (event) => {
    const { email, password } = this.state
    const { setNotifyUser, firebase } = this.props

    event.preventDefault()

    if (!email.trim()) {
      setNotifyUser({ message: 'Email is required', messageType: 'danger' })
      return
    }

    if (!password.trim()) {
      setNotifyUser({ message: 'Passowrd is required', messageType: 'danger' })
      return
    }

    this.setState({ isWait: true })
    firebase
      .createUser({ email, password })
      .catch(err => {
        this.setState({ isWait: false })
        setNotifyUser({ message: err.message, messageType: 'danger' })
      })
  }

  renderMessages() {
    const { notifyUser } = this.props

    return <Alert { ...notifyUser } />
  }

  render() {
    const { isWait, email, password } = this.state
    const { settings } = this.props

    if (isWait || !settings) {
      return <Spinner />
    }

    return (
      <div className="row login">
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="card-body">
              <h1 className="text-center pb-4 pt-3">
                <span className="text-primary">
                  <i className="fa fa-user" /> Register
                </span>
              </h1>

              {this.renderMessages()}

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
                <button className="btn btn-primary btn-block">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Register.propTypes = {
  firebase: PropTypes.object.isRequired,
  notifyUser: PropTypes.object.isRequired,
  setNotifyUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
}

const mapStateToProps = ({ notifyUser, firestore }) => ({
  notifyUser,
  settings: firestore.data.env && firestore.data.env.settings,
})

const mapDispatchToProps = {
  setNotifyUser,
}

export default compose(
  firebaseConnect(),
  firestoreConnect(),
  connect(mapStateToProps, mapDispatchToProps)
)(Register)
