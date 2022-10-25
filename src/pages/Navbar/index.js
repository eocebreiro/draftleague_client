import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFutbol,
  faSignOut,
  faUser,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../state/auth/authActions";

import "./nav-structure.css";

const index = ({ auth: { isAuthenticated, loading }, logout }) => {
  let navbar = null;
  if (isAuthenticated) {
    navbar = (
      <nav className="bg-dark navbar fixed-top ps-5 pe-5">
        <Link to="/">
          <h5>
            <FontAwesomeIcon icon={faFutbol} /> Draft League
          </h5>
        </Link>
        <input id="menu-toggle" type="checkbox" />
        <label className="menu-button-container" htmlFor="menu-toggle">
          <div className="menu-button"></div>
        </label>
        <ul className="menu">
          <li>
            <Link to="/dashboard">
              <FontAwesomeIcon icon={faUser} />{" "}
              <span className="d-none d-md-inline">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/edit-profile" color="primary">
              <FontAwesomeIcon icon={faCircleUser} />{" "}
              <span className="d-none d-md-inline">Edit Profile</span>
            </Link>
          </li>
          <li>
            <Link to="/login" onClick={logout}>
              <FontAwesomeIcon icon={faSignOut} />{" "}
              <span className="d-none d-md-inline">Logout</span>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
  return navbar;
};

index.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(index);
