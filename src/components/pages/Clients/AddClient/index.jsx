import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'

import Spinner from '../../../layout/Spinner'
import { clientsCollection as collection } from '../../../../environments'

class AddClient extends Component {
  constructor(props) {
    super(props)

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      balance: '',
    }
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const newClient = { ...this.state }
    const { firestore, history } = this.props

    if (!newClient.balance) {
      newClient.balance = 0
    }

    newClient.balance = parseFloat(newClient.balance)
    newClient.createdAt = firestore.FieldValue.serverTimestamp()

    firestore
      .add({ collection }, newClient)
      .then(() => history.push('/'))
  }

  renderFormGroup(name, label, type = 'text', step = null) {
    const { settings } = this.props
    const state = { ...this.state }

    if ('balance' === name && settings.disableBalanceOnAdd) {
      return (
        <div className="form-group">
          <label>{label}</label>
          <input className="form-control" placeholder="Balance is disabled" readOnly />
        </div>
      )
    }

    return (
        <div className="form-group">
          <label htmlFor={name}>
            {label}
          </label>
          <input
            type={type}
            className="form-control"
            name={name}
            placeholder={`Enter your ${label.toLowerCase()}`}
            onChange={this.handleChange}
            value={state[name]}
            step={step}
          />
        </div>
    )
  }

  componentWillMount() {
    const { firestore } = this.props
    firestore.get('env')
  }

  render() {
    const { settings } = this.props

    if (!settings) {
      return <Spinner />
    }

    return (
      <Fragment>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fa fa-arrow-circle-left" /> Back To Dashboard
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            Add Client
          </div>
          <div className="card-body">
            <form autoComplete="off" onSubmit={this.handleSubmit}>
              {this.renderFormGroup('firstName', 'First Name')}
              {this.renderFormGroup('lastName', 'Last Name')}
              {this.renderFormGroup('email', 'Email', 'email')}
              {this.renderFormGroup('phone', 'Phone', 'tel')}
              {this.renderFormGroup('balance', 'Balance', 'number', '0.01')}

              <input
                type="submit"
                value="Submit"
                className="btn btn-primary btn-block"
              />
            </form>
          </div>
        </div>
      </Fragment>
    )
  }
}

AddClient.defaultProps = {
  settings: null
}

AddClient.propTypes = {
  firebase: PropTypes.object.isRequired,
  settings: PropTypes.any,
}

export default compose(
  firestoreConnect(),
  connect(({ firestore: { data } }) => ({
    settings: data.env && data.env.settings,
  }))
)(AddClient)
