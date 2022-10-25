import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";
import { logout } from "../state/auth/authActions";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFutbol,
  faSignOut,
  faHouse,
  faUserPen,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  let navbar = null;
  if (isAuthenticated) {
    navbar = (
      <nav className="bg-dark navbar fixed-top ps-5 pe-5">
        <Link to="/" className="navbar-brand text-light">
          <FontAwesomeIcon icon={faFutbol} />{" "}
          <span className="d-none d-md-inline"> Draft League</span>
        </Link>
        <ul className="nav">
          <li className="nav-item me-4">
            <Link to="/dashboard" className="text-light">
              <FontAwesomeIcon icon={faHouse} />{" "}
              <span className="d-none d-md-inline ">Dashboard</span>
            </Link>
          </li>
          <li className="nav-item me-4">
            <Link to="/edit-profile " className="text-light">
              <FontAwesomeIcon icon={faUserPen} />{" "}
              <span className="d-none d-md-inline">Edit Profile</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="text-light" onClick={logout}>
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

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
