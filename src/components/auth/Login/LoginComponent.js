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

  setNotifyUser = (message = '', messageType = '') => {
    const { setNotifyUser } = this.props

    setNotifyUser({ message, messageType })
  }

  onSuccess = () => {
    this.setState({ isWait: false })
    this.setNotifyUser()
  }

  onError = ({ message }) => {
    this.setState({ isWait: false })
    this.setNotifyUser(message, 'danger')
    setTimeout(this.setNotifyUser, 3000)
  }
}

LoginComponent.propTypes = {
  firebase: PropTypes.object.isRequired,
  setNotifyUser: PropTypes.func.isRequired,
  notifyUser: PropTypes.object.isRequired,
}

export default LoginComponent
