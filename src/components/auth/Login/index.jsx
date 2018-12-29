import React from 'react'

import LoginComponent from './LoginComponent'
import Content from './Content'

class Login extends LoginComponent {
  handleSubmit = (event) => {
    const { firebase } = this.props
    const { email, password } = this.state

    this.setState({ isWait: true })

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(this.onSuccess)
      .catch(this.onError)
      event.preventDefault()
  }

  render() {
    const { isWait, email, password } = this.state
    const { notifyUser } = this.props

    return (
      <Content
        isWait={isWait}
        notify={notifyUser}
        email={email}
        password={password}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
      />
    )
  }
}

export default Login
