import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";
import { getCurrentProfile } from "../state/profile/profileActions";
import { getLeagues } from "../state/leagues/leaguesActions";
import { getFixtures } from "../state/fixtures/fixturesActions";

// Style
import { Container, TabContainer, DesktopView, MobileView } from "../Styles";

//Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

// Containers
import MyLeagues from "../containers/MyLeagues";
import JoinLeague from "../containers/JoinLeague";
import CreateLeague from "../containers/CreateLeague";

// Old Componentsd
import CreateProfile from "../pages/CreateProfile";
import Spinner from "../components/Spinner";

const Dashboard = ({
  getCurrentProfile,
  getLeagues,
  getFixtures,
  auth: { user },
  profile: { profile, loading },
  leagues: { leagues },
}) => {
  // Load user profile
  useEffect(() => {
    getCurrentProfile();
    getFixtures();
  }, []);

  // if user has a profile, load the leagues they are in
  useEffect(() => {
    if (user !== null) {
      getLeagues(user._id);
    }
  }, [user]);

  let leagueList = [];
  if (leagues !== null) {
    for (let i = 0; i < leagues.length; i++) {
      leagueList.push(<MyLeagues league={leagues[i]} />);
    }
  }

  // State of tabs (dashboard nav)
  const [active, setActive] = useState({
    myLeaguesTab: "active",
    createTab: "",
    joinTab: "",
  });

  const { myLeaguesTab, createTab, joinTab } = active;

  const handleActive = (e) => {
    e.preventDefault();
    setActive({
      myLeaguesTab: "",
      createTab: "",
      joinTab: "",
      [e.currentTarget.name]: "active",
    });
  };

  return loading || leagues === null ? (
    <Spinner />
  ) : (
    <Container className="container">
      {profile !== null ? (
        <Fragment>
          {/* Dashboard Desktop Nav Bar view */}
          <DesktopView>
            <ul className="nav nav-pills nav-fill mb-3" role="tablist">
              <li className="nav-item">
                <button
                  className={`nav-link ${myLeaguesTab}`}
                  aria-current="page"
                  name="myLeaguesTab"
                  onClick={(e) => handleActive(e)}
                >
                  <h5>My Leagues</h5>
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${createTab}`}
                  aria-current="page"
                  name="createTab"
                  onClick={(e) => handleActive(e)}
                >
                  <h5>Create a League</h5>
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${joinTab}`}
                  aria-current="page"
                  name="joinTab"
                  onClick={(e) => handleActive(e)}
                >
                  <h5>Join a League</h5>
                </button>
              </li>
            </ul>
          </DesktopView>

          {/* Dashboard Mobile Nav Bar view */}
          <MobileView>
            <div class="btn-group mb-3">
              <button
                class="btn no-focus dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className="fw-bold">
                  {myLeaguesTab === "active"
                    ? "My Leagues"
                    : createTab === "active"
                    ? "Create a League"
                    : joinTab === "active"
                    ? "Join a League"
                    : "Choose an option"}{" "}
                  <FontAwesomeIcon icon={faCaretDown} />
                </h5>
              </button>

              <ul class="dropdown-menu ps-1">
                <li className="nav-item">
                  <a
                    href="#"
                    className={`nav-link ${myLeaguesTab}`}
                    aria-current="page"
                    name="myLeaguesTab"
                    onClick={(e) => handleActive(e)}
                  >
                    <span>My Leagues</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#"
                    className={`nav-link ${createTab}`}
                    aria-current="page"
                    name="createTab"
                    onClick={(e) => handleActive(e)}
                  >
                    <span>Create a League</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#"
                    className={`nav-link ${joinTab}`}
                    aria-current="page"
                    name="joinTab"
                    onClick={(e) => handleActive(e)}
                  >
                    <span>Join a League</span>
                  </a>
                </li>
              </ul>
            </div>
          </MobileView>

          {/* Dashboard Content */}
          <TabContainer>
            <div className="tab-content" id="nav-tabContent">
              <div
                className={`tab-pane fade show ${myLeaguesTab}`}
                id="leagues"
                role="tabpanel"
                aria-labelledby="nav-home-tab"
              >
                {leagueList.length >= 1 ? (
                  leagueList
                ) : (
                  <div className="row">
                    <p className="lead">You have not joined any leagues.</p>
                  </div>
                )}
              </div>
            </div>
            <div className="tab-content" id="nav-tabContent">
              <div
                className={`tab-pane fade show ${createTab}`}
                id="create"
                role="tabpanel"
                aria-labelledby="nav-home-tab"
              >
                <CreateLeague />
              </div>
            </div>
            <div className="tab-content" id="nav-tabContent">
              <div
                className={`tab-pane fade show ${joinTab}`}
                id="join"
                role="tabpanel"
                aria-labelledby="nav-home-tab"
              >
                <JoinLeague />
              </div>
            </div>
          </TabContainer>
        </Fragment>
      ) : (
        <Fragment>
          {/* If there is no profile, send user to create a profile page */}
          <CreateProfile />
        </Fragment>
      )}
    </Container>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getLeagues: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  leagues: PropTypes.array.isRequired,
  getFixtures: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  leagues: state.leagues,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  getLeagues,
  getFixtures,
})(Dashboard);
