import React from 'react'
import { Link } from 'react-router-dom'

import { formatAmount } from '../../../helpers'

const ClientList = ({ list }) => (
  list.map(client => (
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
)

export default ClientList
