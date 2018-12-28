import React from 'react'

import './style.css'

import Spinner from '../../layout/Spinner'
import Form from './Form'

const Content = ({
  isWait,
  notify,
  email,
  password,
  handleSubmit,
  handleChange,
}) => (
  isWait
    ? <Spinner />
    : <Form
        notify={notify}
        email={email}
        password={password}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
)

export default Content
