import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const index = ({
  component: Component,
  auth: { isAuthenticated, loading },
}) => {
  if (isAuthenticated && !loading) return <Component />;
  return <Navigate to="/login" />;
};

index.propTypes = {};

index.propTypes = { auth: PropTypes.object.isRequired };

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps)(index);
