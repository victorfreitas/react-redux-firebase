import PropTypes from 'prop-types'

export default Clients => {
  Clients.defaultProps = {
    clients: null,
  }

  Clients.propTypes = {
    firestore: PropTypes.object.isRequired,
    clients: PropTypes.array,
  }

  return Clients
}
