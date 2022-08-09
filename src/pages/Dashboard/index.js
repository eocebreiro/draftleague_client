import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../state/profile/profileActions";

//Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPlus,
  faCircleUser,
  faFilePen,
} from "@fortawesome/free-solid-svg-icons";

//Styling Components
import Spinner from "../../components/Spinner";
import { Container, Row } from "../../components/Div";
import P from "../../components/P";
import H1 from "../../components/H1";
import { Button } from "../../components/Button";

// Other containers
import CreateProfile from "../CreateProfile";

// local components
import League from "./League";

const index = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <Container>
      {profile !== null ? (
        <Fragment>
          <H1 size="L">
            <FontAwesomeIcon icon={faUser} /> Welcome {user && user.name}
          </H1>
          <Row>
            <Button link="/edit-profile" color="primary">
              <FontAwesomeIcon icon={faCircleUser} /> Edit
            </Button>
            <Button link="/create-league" color="primary">
              <FontAwesomeIcon icon={faFilePen} /> Create
            </Button>
            <Button link="/join-league" color="primary">
              <FontAwesomeIcon icon={faPlus} /> Join
            </Button>
          </Row>
          <Row>
            {profile.leagues.length >= 1 ? (
              <League leagues={profile.leagues} />
            ) : (
              <Row>
                <P size="lead">You have not joined any leagues.</P>
              </Row>
            )}
          </Row>
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
