import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

//Styling Components
import {
  LandingImg,
  DarkOverlay,
  Container,
  LandingContent,
} from "../../components/Div";
import H1 from "../../components/H1";
import P from "../../components/P";
import { Button } from "../../components/Button";

const index = ({ isAuthenticated }) => {
  // Redirect if logged in
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <LandingImg>
      <DarkOverlay>
        <Container>
          <LandingContent>
            <H1 size={"XL"}>Draft League</H1>
            <P size={"lead"}>Draft a team and compete with others</P>
            <Button link="/register" color="primary" width="100px">
              Sign Up
            </Button>
            <Button link="/login" color="light" width="100px">
              Login
            </Button>
          </LandingContent>
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
