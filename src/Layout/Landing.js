import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, Navigate } from "react-router-dom";

// Redux
import { connect } from "react-redux";

// Styles
import { AuthFormContainer, DarkOverlay, LandingImg } from "../Styles";

const Landing = ({ isAuthenticated }) => {
  // Redirect if logged in
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <LandingImg>
      <DarkOverlay>
        <AuthFormContainer>
          <div className="text-center">
            <h1 className="display-1">Draft League</h1>
            <p className="lead">Draft a team and compete with others</p>
            <Link to="/register" className="btn btn-primary me-2">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-success ms-2">
              Login
            </Link>
          </div>
        </AuthFormContainer>
      </DarkOverlay>
    </LandingImg>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
