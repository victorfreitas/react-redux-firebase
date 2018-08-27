import React from 'react'
import PropTypes from 'prop-types'

const Alert = ({ message, messageType }) => {
  if (!message) {
    return null
  }

  return (
    <div className={`alert alert-${messageType}`}>
      {message}
    </div>
  )
}

Alert.defaultProps = {
  message: '',
  messageType: 'success',
}

Alert.propTypes = {
  message: PropTypes.string,
  messageType: PropTypes.string,
}

export default Alert
