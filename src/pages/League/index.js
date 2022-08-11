import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import { getLeague } from "../../state/league/leagueActions";
import { checkRostersLock } from "../../state/league/leagueActions";

//Styling Components
import Spinner from "../../components/Spinner";
import { Container, Row, CenterDiv } from "../../components/Div";
import H1 from "../../components/H1";
import Form from "../../components/FormItems/Form";
import FormGroup from "../../components/FormItems/FormGroup";
import Input from "../../components/FormItems/Input";
import { Button } from "../../components/Button";
import Overview from "../../containers/Overview";
import Table from "../../containers/Table";
import Schedule from "../../containers/Schedule";
import Rosters from "../../containers/Rosters";
import Waviers from "../../containers/Waviers";
import Logs from "../../containers/Logs";
import PlayerList from "../../containers/PlayerList";
import NewPlayerList from "../../containers/NewPlayerList";

const index = ({
  auth: { user },
  getLeague,
  checkRostersLock,
  league: { league, loading },
}) => {
  const { id } = useParams();
  useEffect(() => {
    getLeague(id);
  }, []);

  const onClick = async (e) => {
    checkRostersLock(league._id);
  };

  const params = useParams();
  return (
    <Fragment>
      {league === null || loading ? (
        <Spinner />
      ) : (
        <Container>
          <Row>
            <Button link="/dashboard" color="primary">
              Back
            </Button>
            <Button link={"/league/" + id} color="primary">
              Overview
            </Button>
            <Button link={"/league/" + id + "/table"} color="primary">
              Table
            </Button>
            <Button link={"/league/" + id + "/schedule"} color="primary">
              Schedule
            </Button>
            <Button
              link={"/league/" + id + "/rosters"}
              color="primary"
              onClick={(e) => onClick(e)}
            >
              Rosters
            </Button>
            <Button link={"/league/" + id + "/waviers"} color="primary">
              Waivers
            </Button>
            <Button link={"/league/" + id + "/new-player-list"} color="primary">
              New Players
            </Button>
            <Button link={"/league/" + id + "/player-list"} color="primary">
              Players
            </Button>
            <Button link={"/league/" + id + "/logs"} color="primary">
              Logs
            </Button>
          </Row>
          <Routes>
            <Route exact path={"/"} element={<Overview league={league} />} />
            <Route exact path={"/table"} element={<Table />} />
            <Route
              exact
              path={"/schedule"}
              element={<Schedule league={league} />}
            />
            <Route
              exact
              path={"/rosters"}
              element={<Rosters league={league} />}
            />
            <Route exact path={"/waviers"} element={<Waviers />} />
            <Route exact path={"/logs"} element={<Logs />} />
            <Route
              exact
              path={"/new-player-list"}
              element={<NewPlayerList league={league} />}
            />
            <Route
              exact
              path={"/player-list"}
              element={<PlayerList league={league} />}
            />
          </Routes>
        </Container>
      )}
    </Fragment>
  );
};

index.propTypes = {
  getLeague: PropTypes.func.isRequired,
  checkRostersLock: PropTypes.func.isRequired,
  league: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ league: state.league, auth: state.auth });

export default connect(mapStateToProps, { getLeague, checkRostersLock })(index);
