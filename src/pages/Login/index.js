import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../state/auth/authActions";

//Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const index = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    isEmailMissing: false,
    isPasswordMissing: false,
    invalidAuth: false,
  });

  const {
    email,
    password,
    isEmailMissing,
    isPasswordMissing,
    invalidAuth,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    let testEmail,
      testPassword,
      isError = false;
    if (email === "") {
      testEmail = true;
      isError = true;
    }
    if (password === "") {
      testPassword = true;
      isError = true;
    }
    if (!isError) {
      await login({ email, password });
    }
    setFormData({
      ...formData,
      isEmailMissing: testEmail,
      isPasswordMissing: testPassword,
      invalidAuth: !isAuthenticated && true,
    });
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="landing">
      <div className="darkoverlay">
        <div className="Auth-form-container">
          <div className="col-4 text-center ">
            <h1 className="display-4 mb-3">Sign In</h1>
            <p>
              <FontAwesomeIcon icon={faUser} /> Sign into Your Account
            </p>
            {invalidAuth && (
              <div
                className="alert alert-danger mt-3 text-center fw-bold"
                role="alert"
              >
                Invalid Credentials
              </div>
            )}
            <form align="center">
              <input
                className="form-control mb-3"
                type="email"
                name="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => onChange(e)}
                required
                autoComplete="on"
                noValidate
                error={isEmailMissing}
              />
              <input
                className="form-control mb-3"
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => onChange(e)}
                minLength="6"
                autoComplete="current-password"
                noValidate
                error={isPasswordMissing}
              />
              <div className="d-grid mb-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={(e) => onSubmit(e)}
                >
                  Submit
                </button>
              </div>
            </form>
            <p>
              Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

index.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(index);
