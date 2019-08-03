import React, { Component, Fragment } from 'react'

import { compose } from 'redux'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import PropTypes from 'prop-types'

import { collections } from '../../../../environments'
import Spinner from '../../../layout/Spinner'

const { CONFIG, CLIENTS } = collections

class EditClient extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isWait: false,
    }
  }

  componentWillMount() {
    const { firestore } = this.props
    firestore.get(CONFIG)
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value })
  }

  renderFormGroup(name, label, type = 'text', step = null) {
    const { client, settings } = this.props

    if ('balance' === name && settings.disableBalanceOnEdit) {
      return (
        <div className="form-group">
          <label>{label}</label>
          <input className="form-control" value={client[name]} placeholder="Balance is disabled" readOnly />
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
          defaultValue={client[name]}
          step={step}
        />
      </div>
    )
  }

  handleSubmit = (event) => {
    event.preventDefault()

    this.setState({ isWait: true })

    const { client, firestore, history } = this.props
    const newClient = { ...client, ...this.state }

    delete newClient.id

    if (!newClient.balance) {
      newClient.balance = 0
    }

    newClient.balance = parseFloat(newClient.balance)

    firestore
      .update({ collection: CLIENTS, doc: client.id }, newClient)
      .then(() => history.push('/'))
  }

  render() {
    const { client, settings } = this.props
    const { isWait } = this.state

    if (!(client && settings) || isWait) {
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
            Edit Client
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

EditClient.propTypes = {
  firestore: PropTypes.object.isRequired,
  settings: PropTypes.object,
  client: PropTypes.shape({
    id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    balance: PropTypes.number,
  }),
}

export default compose(
  firestoreConnect(({ match: { params } }) => [{
    collection: CLIENTS,
    storeAs: 'client',
    doc: params.id,
  }]),
  connect(({ firestore: { data, ordered } }) => ({
    client: ordered.client && ordered.client[0],
    settings: data[CONFIG] && data[CONFIG].settings,
  }))
)(EditClient)
