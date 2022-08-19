import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../state/profile/profileActions";
import { getLeagues } from "../../state/leagues/leaguesActions";

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
  getLeagues,
  auth: { user },
  profile: { profile, loading },
  leagues: { leagues },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  useEffect(() => {
    if (user !== null) {
      getLeagues(user._id);
    }
  }, [user]);

  let leagueList = [];
  if (leagues !== null) {
    for (let i = 0; i < leagues.length; i++) {
      leagueList.push(<League league={leagues[i]} />);
    }
  }

  return loading || leagues === null ? (
    <Spinner />
  ) : (
    <Container>
      {profile !== null ? (
        <Fragment>
          <H1 size="L">
            <FontAwesomeIcon icon={faUser} /> Welcome {user && user.name}
          </H1>
          <Row>
            {/*<Button link="/edit-profile" color="primary">
              <FontAwesomeIcon icon={faCircleUser} /> Edit
      </Button>*/}
            <Button link="/create-league" color="primary">
              <FontAwesomeIcon icon={faFilePen} /> Create
            </Button>
            <Button link="/join-league" color="primary">
              <FontAwesomeIcon icon={faPlus} /> Join
            </Button>
          </Row>

          {leagueList.length >= 1 ? (
            leagueList
          ) : (
            <Row>
              <P size="lead">You have not joined any leagues.</P>
            </Row>
          )}
        </Fragment>
      ) : (
        <CreateProfile />
      )}
    </Container>
  );
};

index.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getLeagues: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  leagues: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  leagues: state.leagues,
});

export default connect(mapStateToProps, { getCurrentProfile, getLeagues })(
  index
);
