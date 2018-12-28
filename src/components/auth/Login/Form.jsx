import React from 'react'

import Alert from '../../layout/Alert'

const Form = ({
  notify,
  email,
  password,
  handleSubmit,
  handleChange,
}) => (
  <div className="row login">
    <div className="col-md-6 mx-auto">
      <div className="card">
        <div className="card-body">
          <h1 className="text-center pb-4 pt-3">
            <span className="text-primary">
              <i className="fa fa-lock" /> Login
            </span>
          </h1>

          <Alert { ...notify } />

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-at"></i>
                  </span>
                </div>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="Email"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-lock" />
                  </span>
                </div>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  placeholder="Password"
                  autoComplete="off"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
)

export default Form
