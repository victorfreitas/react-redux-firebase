import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'

import notifyUserReducer from './notifyUser'

export default combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notifyUser: notifyUserReducer,
})
