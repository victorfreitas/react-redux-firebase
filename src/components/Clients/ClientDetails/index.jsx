import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import Spinner from '../../layout/Spinner'
import { formatAmount } from '../../../helpers'
import { clientsCollection as collection } from '../../../environments'

class ClientDetails extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showBalanceUpdate: false,
      balanceUpdateAmount: 0,
    }
  }

  handleUpdateBalance = (event) => {
    event.preventDefault()

    this.setState(state => ({
      showBalanceUpdate: !state.showBalanceUpdate,
    }))
  }

  handleChangeBalance = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    })
  }

  handleSubmitBalance = (event) => {
    event.preventDefault()

    const { balanceUpdateAmount } = this.state
    const { client: { id: doc }, firestore } = this.props

    const clientUpdate = {
      balance: parseFloat(balanceUpdateAmount),
    }

    firestore.update({ collection, doc }, clientUpdate)
    this.setState({
      showBalanceUpdate: false,
      balanceUpdateAmount: 0,
    })
  }

  handleClickDelete = (event) => {
    event.preventDefault()

    const { client, firestore, history } = this.props

    firestore
      .delete({ collection, doc: client.id })
      .then(history.push('/'))
  }

  renderBalanceForm() {
    const { showBalanceUpdate } = this.state
    const { client } = this.props

    if (!showBalanceUpdate) {
      return null
    }

    return (
      <form autoComplete="off" className="d-inline-block pull-right" onSubmit={this.handleSubmitBalance}>
        <div className="input-group input-group-sm col-sm-9 pr-0 pull-right">
          <div className="input-group-prepend">
            <span className="input-group-text">$</span>
          </div>
          <input
            type="number"
            className="form-control"
            name="balanceUpdateAmount"
            placeholder="New balance"
            defaultValue={client.balance}
            onChange={this.handleChangeBalance}
            step="0.01"
          />
          <div className="input-group-append">
            <input type="submit" value="Update" className="btn btn-outline-dark" />
          </div>
        </div>
      </form>
    )
  }

  render() {
    const { client } = this.props

    if (!client) {
      return <Spinner />
    }

    const balance = parseFloat(client.balance)

    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fa fa-arrow-circle-left" /> Back To Dashboard
            </Link>
          </div>
          <div className="col-md-6">
            <div className="btn-group float-right">
              <Link to={`/client/edit/${client.id}`} className="btn btn-dark">
                Edit
              </Link>
              <button className="btn btn-danger" onClick={this.handleClickDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>

        <hr />

        <div className="card">
          <h3 className="card-header">
            {client.firstName} {client.lastName}
          </h3>
          <div className="card-body">
            <div className="row">
              <div className="col-md-8 col-sm-6">
                <h4>Client ID: <span className="text-secondary">{client.id}</span></h4>
              </div>
              <div className="col-md-4 col-sm-6">
                <h3 className="pull-right">
                  Balance: <span className={classNames({
                    'text-danger': balance > 0,
                    'text-success': 0 === balance,
                  })}>{formatAmount(balance)}</span>

                  <small className="ml-1">
                    <a href="#!" onClick={this.handleUpdateBalance}>
                      <i className="fa fa-pencil" />
                    </a>
                  </small>
                </h3>
                {this.renderBalanceForm()}
              </div>
            </div>

            <hr />

            <ul className="list-group">
              <li className="list-group-item">
                Email: {client.email}
              </li>
              <li className="list-group-item">
                Phone: {client.phone}
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

ClientDetails.propTypes = {
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
)(ClientDetails)
