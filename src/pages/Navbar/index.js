import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFutbol, faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../state/auth/authActions";

import "./nav-structure.css";

const index = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul className="menu">
      <li>
        <Link to="/dashboard">
          <FontAwesomeIcon icon={faUser} /> Dashboard
        </Link>
      </li>
      <li>
        <Link to="/login" onClick={logout}>
          <FontAwesomeIcon icon={faSignOut} /> Logout
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="menu">
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/register">Sign Up</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="top-nav">
      <Link to="/">
        <h1>
          <FontAwesomeIcon icon={faFutbol} /> Draft League
        </h1>
      </Link>
      <input id="menu-toggle" type="checkbox" />
      <label className="menu-button-container" htmlFor="menu-toggle">
        <div className="menu-button"></div>
      </label>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

index.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(index);
