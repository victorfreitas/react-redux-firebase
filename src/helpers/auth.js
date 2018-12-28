import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import LoadingScreen from '../components/layout/Spinner'

const authenticatingSelector = ({ firebase: { auth, isInitializing } }) => (
  !auth.isLoaded || isInitializing === true
)
const { getRedirectQueryParam } = locationHelperBuilder({})

export const UserIsAuthenticated = connectedRouterRedirect({
  AuthenticatingComponent: LoadingScreen,
  allowRedirectBack: true,
  authenticatingSelector,
  wrapperDisplayName: 'UserIsAuthenticated',
  authenticatedSelector: ({ firebase: { auth } }) => (
    auth.isLoaded && !auth.isEmpty
  ),
  redirectPath: (state, props) => (
    getRedirectQueryParam(props) || '/login'
  ),
})

export const UserIsNotAuthenticated = connectedRouterRedirect({
  AuthenticatingComponent: LoadingScreen,
  allowRedirectBack: false,
  authenticatingSelector,
  wrapperDisplayName: 'UserIsNotAuthenticated',
  authenticatedSelector: ({ firebase: { auth } }) => (
    auth.isLoaded && auth.isEmpty
  ),
  redirectPath: (state, props) => (
    getRedirectQueryParam(props) || '/'
  ),
})
