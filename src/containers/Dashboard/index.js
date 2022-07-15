import React, { Fragment, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import Container from "../../components/Container";
import H1 from "../../components/H1";
import P from "../../components/P";
import Button from "../../components/Button";
import DashLinks from "../../components/DashLinks";
import CreateProfile from "../../containers/CreateProfile";
import { getCurrentProfile } from "../../state/profile/profileActions";

const index = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Container>
      {profile !== null ? (
        <Fragment>
          <H1 size="L" color="primary">
            Dashboard
          </H1>
          <P size="lead">
            <FontAwesomeIcon icon={faUser} /> Welcome {user && user.name}
          </P>
          <DashLinks />
        </Fragment>
      ) : (
        <CreateProfile />
      )}
    </Container>
  );
};

index.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(index);
