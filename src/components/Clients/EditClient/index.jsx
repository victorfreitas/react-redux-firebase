import React, { Component, Fragment } from 'react'

import { compose } from 'redux'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import PropTypes from 'prop-types'

import { clientsCollection as collection } from '../../../environments'
import Spinner from '../../layout/Spinner'

class EditClient extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value })
  }

  renderFormGroup(name, label, type = 'text', step = null) {
    const { client } = this.props

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

    const { client, firestore, history } = this.props
    const newClient = { ...client, ...this.state }

    delete newClient.id

    if (!newClient.balance) {
      newClient.balance = 0
    }

    newClient.balance = parseFloat(newClient.balance)

    firestore
      .update({ collection, doc: client.id }, newClient)
      .then(history.push('/'))
  }

  render() {
    const { client } = this.props

    if (!client) {
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
    collection,
    storeAs: 'client',
    doc: params.id,
  }]),
  connect(({ firestore: { ordered } }) => ({
    client: ordered.client && ordered.client[0],
  }))
)(EditClient)
