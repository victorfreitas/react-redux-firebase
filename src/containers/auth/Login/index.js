import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'

import { setNotify } from '../../../actions'
import Login from '../../../components/auth/Login'

const mapStateToProps = state => ({
  notify: state.notify,
})

const mapDispatchToProps = {
  setNotify,
}

export default compose(
  firebaseConnect(),
  connect(mapStateToProps, mapDispatchToProps)
)(Login)
