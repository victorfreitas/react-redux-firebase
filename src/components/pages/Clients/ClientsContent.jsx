import React, { Fragment } from 'react'

import ClientsHeader from './ClientsHeader'
import ClientsTable from './ClientsTable'

const ClientsContent = ({ data: { totalOwed, clients } }) => (
  <Fragment>
    <ClientsHeader total={totalOwed} />
    <ClientsTable clients={clients} />
  </Fragment>
)

export default ClientsContent
