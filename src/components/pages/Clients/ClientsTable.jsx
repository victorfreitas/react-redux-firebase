import React from 'react'

import ClientsHead from './ClientsHead'
import ClientsBody from './ClientsBody'

const ClientsTable = ({ clients }) => (
  <table className="table table-striped border">
    <ClientsHead />
    <ClientsBody clients={clients} />
  </table>
)

export default ClientsTable
