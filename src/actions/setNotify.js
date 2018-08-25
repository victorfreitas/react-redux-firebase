import { NOTIFY_USER } from './types'

export default ({ message, messageType }) => ({
  type: NOTIFY_USER,
  message,
  messageType,
})
