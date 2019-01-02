import React from 'react'

import ClientList from './ClientList'

const ClientsBody = ({ clients }) => (
  <tbody>
    <ClientList list={clients} />
  </tbody>
)

export default ClientsBody
