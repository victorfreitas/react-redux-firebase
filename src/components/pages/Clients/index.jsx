import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect, isLoaded } from 'react-redux-firebase'

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
    const { isLoaded, clients } = this.props
    const { totalOwed } = this.state

    return isLoaded
      ? <ClientsContent data={{ totalOwed, clients }} />
      : <Spinner />
  }
}

export default compose(
  firestoreConnect([{
    collection: 'clients',
    orderBy: ['createdAt', 'desc'],
  }]),
  connect(({ firestore }) => ({
    isLoaded: isLoaded(firestore.ordered.clients),
    clients: firestore.ordered.clients,
  }))
)(clientsWithProps(Clients))
