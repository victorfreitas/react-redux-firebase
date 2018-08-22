import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import PropTypes from 'prop-types'

import Spinner from '../layout/Spinner'

import { formatAmount } from '../../helpers'

class Clients extends Component {
  constructor(props) {
    super(props)

    this.state = {
      totalOwed: null,
    }
  }

  static getDerivedStateFromProps(props) {
    const { clients } = props

    if (!clients) {
      return null
    }

    const total = clients.reduce((total, client) => (
      total + parseFloat(client.balance)
    ), 0)

    return { totalOwed: total }
  }

  renderClients(list) {
    return list.map(client => (
      <tr key={client.id}>
        <td>{client.firstName} {client.lastName}</td>
        <td>{client.email}</td>
        <td>{formatAmount(client.balance)}</td>
        <td>
          <Link to={`client/${client.id}`} className="btn btn-secondary btn-sm">
            <i className="fa fa-arrow-circle-right" /> Details
          </Link>
        </td>
      </tr>
    ))
  }

  render() {
    const { clients } = this.props
    const { totalOwed } = this.state

    if (!clients) {
      return <Spinner />
    }

    return (
      <Fragment>
        <div className="row">
          <div className="col-md-6">
            <h2>
              <i className="fa fa-users" /> Clients
            </h2>
          </div>
          <div className="col-md-6">
            <h5 className="text-right text-secondary">
              Total Owed <span className="text-primary bold">{formatAmount(totalOwed)}</span>
            </h5>
          </div>
        </div>
        <table className="table table-striped border">
          <thead className="thead-inverse">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Balance</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.renderClients(clients)}
          </tbody>
        </table>
      </Fragment>
    )
  }
}

Clients.propTypes = {
  firestore: PropTypes.object.isRequired,
  clients: PropTypes.array,
}

export default compose(
  firestoreConnect([{ collection: 'clients' }]),
  connect(state => ({ clients: state.firestore.ordered.clients }))
)(Clients)
