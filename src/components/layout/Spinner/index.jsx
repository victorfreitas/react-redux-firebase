import React from 'react'

import './style.css'

import iconSpinner from '../../../assets/images/spinner.svg'

const Spinner = () => {
  return (
    <div className="spinner">
      <img src={iconSpinner} alt="Loading..." />
    </div>
  )
}

export default Spinner
