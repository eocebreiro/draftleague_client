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
import { getRoster } from "../../state/roster/rosterActions";

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

const index = ({ auth: { user }, getLeague, league: { league, loading } }) => {
  const { id } = useParams();

  const onClick = async (e) => {
    getLeague(id, user._id);
  };

  const params = useParams();
  return (
    <Container>
      <Row>
        <Button link="/dashboard" color="primary">
          Back
        </Button>
        <Button
          link={"/league/" + id}
          color="primary"
          onClick={(e) => onClick(e)}
        >
          Overview
        </Button>
        <Button
          link={"/league/" + id + "/table"}
          color="primary"
          onClick={(e) => onClick(e)}
        >
          Table
        </Button>
        <Button
          link={"/league/" + id + "/schedule"}
          color="primary"
          onClick={(e) => onClick(e)}
        >
          Schedule
        </Button>
        <Button
          link={"/league/" + id + "/rosters"}
          color="primary"
          onClick={(e) => onClick(e)}
        >
          Rosters
        </Button>
        <Button
          link={"/league/" + id + "/waviers"}
          color="primary"
          onClick={(e) => onClick(e)}
        >
          Waivers
        </Button>
        <Button
          link={"/league/" + id + "/new-player-list"}
          color="primary"
          onClick={(e) => onClick(e)}
        >
          New Players
        </Button>
        <Button
          link={"/league/" + id + "/player-list"}
          color="primary"
          onClick={(e) => onClick(e)}
        >
          Players
        </Button>
        <Button
          link={"/league/" + id + "/logs"}
          color="primary"
          onClick={(e) => onClick(e)}
        >
          Logs
        </Button>
      </Row>
      {league === null || loading ? (
        <Spinner />
      ) : (
        <Routes>
          <Route exact path={"/"} element={<Overview />} />
          <Route exact path={"/table"} element={<Table />} />
          <Route exact path={"/schedule"} element={<Schedule />} />
          <Route exact path={"/rosters"} element={<Rosters />} />
          <Route exact path={"/waviers"} element={<Waviers />} />
          <Route exact path={"/logs"} element={<Logs />} />
          <Route exact path={"/new-player-list"} element={<NewPlayerList />} />
          <Route exact path={"/player-list"} element={<PlayerList />} />
        </Routes>
      )}{" "}
    </Container>
  );
};

index.propTypes = {
  getLeague: PropTypes.func.isRequired,
  getRoster: PropTypes.func.isRequired,
  league: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  league: state.league,
  auth: state.auth,
});

export default connect(mapStateToProps, { getLeague, getRoster })(index);
