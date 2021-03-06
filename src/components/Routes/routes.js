import { UserIsAuthenticated, UserIsNotAuthenticated } from '../../helpers/auth'
import Login from '../../containers/auth/Login'
import Register from '../auth/Register'
import Dashboard from '../layout/Dashboard'
import AddClient from '../pages/Clients/AddClient'
import ClientDetails from '../pages/Clients/ClientDetails'
import EditClient from '../pages/Clients/EditClient'
import Settings from '../pages/Settings'
import NotFound from '../pages/NotFound'

export default [
  { key: '1', path: '/', component: UserIsAuthenticated(Dashboard) },
  { key: '2', path: '/client/add', component: UserIsAuthenticated(AddClient) },
  { key: '3', path: '/client/:id', component: UserIsAuthenticated(ClientDetails) },
  { key: '4', path: '/client/edit/:id', component: UserIsAuthenticated(EditClient) },
  { key: '5', path: '/login', component: UserIsNotAuthenticated(Login) },
  { key: '6', path: '/register', component: UserIsNotAuthenticated(Register) },
  { key: '7', path: '/settings', component: UserIsAuthenticated(Settings) },
  { key: '8', path: '*', component: UserIsAuthenticated(NotFound) },
]
