import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, Navigate } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { register } from "../state/auth/authActions";

// Styles
import { AuthFormContainer, DarkOverlay, LandingImg } from "../Styles";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const index = ({ register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    nameFeedback: "",
    password2Feedback: "",
    emailFeedback: "",
    passwordFeedback: "",
  });

  const {
    name,
    email,
    password,
    password2,
    nameFeedback,
    password2Feedback,
    emailFeedback,
    passwordFeedback,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault(e);
    let nameFeedback,
      password2Feedback,
      emailFeedback,
      passwordFeedback = "";
    let isError = false;

    if (name.length < 4 || name.length > 30) {
      nameFeedback = "is-invalid";
      isError = true;
    }
    if (
      !String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      emailFeedback = "is-invalid";
      isError = true;
    }
    if (password !== password2) {
      password2Feedback = "is-invalid";
      isError = true;
    }
    if (password.length < 6 || password.length > 30) {
      passwordFeedback = "is-invalid";
      isError = true;
    }
    if (!isError) {
      register({ name, email, password });
    }
    setFormData({
      ...formData,
      nameFeedback,
      emailFeedback,
      passwordFeedback,
      password2Feedback,
    });
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <LandingImg>
      <DarkOverlay>
        <AuthFormContainer>
          <div className="text-center">
            <h1 className="display-4 mb-3">Sign Up</h1>
            <p>
              <FontAwesomeIcon icon={faUser} /> Create Your Account
            </p>
            <form align="center">
              <div className="mb-3">
                <input
                  className={`form-control ${nameFeedback}`}
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={(e) => onChange(e)}
                  required
                  autoComplete="on"
                  noValidate
                />
                <div className="invalid-feedback">
                  *Name must be at least 4 and 30 characters
                </div>
              </div>
              <div className="mb-3">
                <input
                  className={`form-control ${emailFeedback}`}
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  onChange={(e) => onChange(e)}
                  required
                  autoComplete="on"
                  noValidate
                />
                <div className="invalid-feedback">*Email is invalid</div>
              </div>
              <div className="mb-3">
                <input
                  className={`form-control ${passwordFeedback}`}
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => onChange(e)}
                  minLength="6"
                  autoComplete="new-password"
                  noValidate
                />
                <div className="invalid-feedback">
                  *Password must be at least 6 and 30 characters
                </div>
              </div>
              <div className="mb-3">
                <input
                  className={`form-control ${password2Feedback}`}
                  type="password"
                  placeholder="Confirm Password"
                  name="password2"
                  value={password2}
                  onChange={(e) => onChange(e)}
                  minLength="6"
                  autoComplete="new-password"
                  noValidate
                />
                <div className="invalid-feedback">*Password must match</div>
              </div>
              <div className="d-grid mb-3">
                <button
                  className="btn btn-primary"
                  onClick={(e) => onSubmit(e)}
                  type="submit"
                  link="/register"
                  color="primary"
                  width="100%"
                >
                  Submit
                </button>
              </div>
            </form>
            <p>
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </div>
        </AuthFormContainer>
      </DarkOverlay>
    </LandingImg>
  );
};

index.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register })(index);
