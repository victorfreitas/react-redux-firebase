import React, { memo } from 'react'

const ClientsHead = () => (
  <thead className="thead-inverse">
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Balance</th>
      <th />
    </tr>
  </thead>
)

export default memo(ClientsHead)
