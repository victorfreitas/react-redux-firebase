import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

import './style.css'

import Spinner from '../../layout/Spinner'
import { collections } from '../../../environments'

const { CONFIG } = collections

class Settings extends Component {
  handleChange = ({ target: { name, checked } }) => {
    const { firestore, config: { settings } } = this.props
    const doc = { ...settings }

    doc[name] = checked
    firestore.update({ collection: CONFIG, doc: 'settings' }, doc)
  }

  render() {
    const { config: { settings } } = this.props

    if (!settings) {
      return <Spinner />
    }

    return (
      <Fragment>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fa fa-arrow-circle-left" /> Back To Dashboard
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            Settings
          </div>
          <div className="card-body">
            <form>
              <div className="custom-control custom-checkbox mb-2">
                <input
                  type="checkbox"
                  id="allow-registration"
                  name="allowRegistration"
                  className="custom-control-input"
                  checked={settings.allowRegistration}
                  onChange={this.handleChange}
                />
                <label htmlFor="allow-registration" className="custom-control-label">
                  Allow Registration
                </label>
              </div>
              <div className="custom-control custom-checkbox mb-2">
                <input
                  type="checkbox"
                  id="disable-balance-on-add"
                  name="disableBalanceOnAdd"
                  className="custom-control-input"
                  checked={settings.disableBalanceOnAdd}
                  onChange={this.handleChange}
                />
                <label htmlFor="disable-balance-on-add" className="custom-control-label">
                  Disable Balance on Add
                </label>
              </div>
              <div className="custom-control custom-checkbox mb-2">
                <input
                  type="checkbox"
                  id="disable-balance-on-edit"
                  name="disableBalanceOnEdit"
                  className="custom-control-input"
                  checked={settings.disableBalanceOnEdit}
                  onChange={this.handleChange}
                />
                <label htmlFor="disable-balance-on-edit" className="custom-control-label">
                  Disable Balance on Edit
                </label>
              </div>
            </form>
          </div>
        </div>
      </Fragment>
    )
  }
}

Settings.defaultProps = {
  config: { settings: null }
}

Settings.propTypes = {
  auth: PropTypes.object.isRequired,
  firestore: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  config: state.firestore.data[CONFIG],
})

export default compose(
  firestoreConnect([CONFIG]),
  connect(mapStateToProps)
)(Settings)
