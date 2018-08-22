import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => (
  <Link to="/client/add" className="btn btn-success btn-block">
    <i className="fa fa-plus" /> New
  </Link>
)

export default Sidebar
