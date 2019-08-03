import { composeWithDevTools } from 'redux-devtools-extension'
import { reduxFirestore } from 'redux-firestore'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { reactReduxFirebase } from 'react-redux-firebase'

import firebase from './firebase'
import reducers from '../reducers'

const initialState = {}
const createStoreWithFirebase = composeWithDevTools(
  reduxFirestore(firebase),
  applyMiddleware(thunk),
  reactReduxFirebase(firebase, {
    userProfile: 'users',
    useFirestoreForProfile: true,
  })
)(createStore)

export default createStoreWithFirebase(
  reducers,
  initialState,
  reactReduxFirebase(firebase)
)
