import { Component } from 'react'
import PropTypes from 'prop-types'

class LoginComponent extends Component {
  state = {
    email: '',
    password: '',
    wait: false,
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value })
  }

  setNotify = (message = '', messageType = '') => {
    const { setNotify } = this.props

    setNotify({ message, messageType })
  }

  onSuccess = () => {
    this.setState({ isWait: false })
    this.setNotify()
  }

  onError = ({ message }) => {
    this.setState({ isWait: false })
    this.setNotify(message, 'danger')
    setTimeout(this.setNotify, 3000)
  }
}

LoginComponent.propTypes = {
  firebase: PropTypes.object.isRequired,
  setNotify: PropTypes.func.isRequired,
  notify: PropTypes.object.isRequired,
}

export default LoginComponent
