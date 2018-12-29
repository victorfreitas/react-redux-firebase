import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'

import { setNotifyUser } from '../../../actions'
import Login from '../../../components/auth/Login'

const mapStateToProps = state => ({
  notifyUser: state.notifyUser,
})

const mapDispatchToProps = {
  setNotifyUser,
}

export default compose(
  firebaseConnect(),
  connect(mapStateToProps, mapDispatchToProps)
)(Login)
