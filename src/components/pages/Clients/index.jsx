import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

import { sumTotalOwed } from '../../../helpers'
import Spinner from '../../layout/Spinner'
import ClientsContent from './ClientsContent'
import clientsWithProps from './clientsWithProps'

class Clients extends Component {
  state = { totalOwed: 0 }

  static getDerivedStateFromProps({ clients }) {
    return clients ? { totalOwed: sumTotalOwed(clients) } : 0
  }

  render() {
    const { isLoading, clients } = this.props
    const { totalOwed } = this.state

    return isLoading ? <Spinner /> : <ClientsContent data={{ totalOwed, clients }} />
  }
}

export default compose(
  firestoreConnect([{
    collection: 'clients',
    orderBy: ['createdAt', 'desc'],
  }]),
  connect(({ firestore }) => ({
    isLoading: firestore.status.requesting.clients,
    clients: firestore.ordered.clients,
  }))
)(clientsWithProps(Clients))
