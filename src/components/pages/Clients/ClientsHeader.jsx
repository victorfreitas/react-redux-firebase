import React from 'react'

import { formatAmount } from '../../../helpers'

const ClientsHeader = ({ total }) => (
  <div className="row">
    <div className="col-md-6">
      <h2 className="text-left">
        <i className="fa fa-users" /> List
      </h2>
    </div>
    <div className="col-md-6">
      <h5 className="text-right text-secondary">
        Total Owed <span className="text-primary bold">{formatAmount(total)}</span>
      </h5>
    </div>
  </div>
)

export default ClientsHeader
