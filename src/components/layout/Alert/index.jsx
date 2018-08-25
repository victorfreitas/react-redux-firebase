import React from 'react'
import PropTypes from 'prop-types'

const Alert = ({ message, messageType }) => (
  <div className={`alert alert-${messageType}`}>
    {message}
  </div>
)

Alert.defaultProps = {
  type: 'success',
}

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  messageType: PropTypes.string,
}

export default Alert
