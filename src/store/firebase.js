import 'firebase/firestore'
import 'firebase/auth'
import firebase from 'firebase/app'

import serviceAccount from '../config/serviceAccount'

firebase.initializeApp(serviceAccount)
firebase
  .firestore()
  .settings({ timestampsInSnapshots: true })

export default firebase
