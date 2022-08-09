import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

//Styling Components
import Spinner from "../../components/Spinner";

const index = () => {
  return <Fragment>Logs Coming Soon</Fragment>;
};

index.propTypes = {};

export default index;
