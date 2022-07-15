import React from "react";
import { Navigate } from "react-router-dom";

import LandingImg from "../../components/LandingImg";
import DarkOverlay from "../../components/DarkOverlay";

import DivContent from "../../components/DivContent";
import Row from "../../components/Row";
import Container from "../../components/Container";
import P from "../../components/P";
import Button from "../../components/Button";
import H1 from "../../components/H1";

import { connect } from "react-redux";
import PropTypes from "prop-types";

const index = ({ isAuthenticated }) => {
  // Redirect if logged in
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <LandingImg>
      <DarkOverlay>
        <Container>
          <Row>
            <DivContent>
              <H1 size={"XL"}>Draft League</H1>
              <P size={"lead"}>Draft a team and compete with others</P>
              <Button link="/register" color="primary" width="100px">
                Sign Up
              </Button>
              <Button link="/login" color="light" width="100px">
                Login
              </Button>
            </DivContent>
          </Row>
        </Container>
      </DarkOverlay>
    </LandingImg>
  );
};

index.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(index);
