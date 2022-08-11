import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import Spinner from "../../components/Spinner";
import { PlayerRoster } from "./PlayerRoster";
import {
  OverviewContent,
  FieldImg,
  FieldContent,
  PlayerWrapper,
  RosterContent,
  RosterRow,
  RosterItem,
  MainCOl,
  MainRow,
  RosterHeader,
  RosterRowHeader,
} from "../../components/Div";

const index = ({ auth: { user }, players, leagues: { league, loading } }) => {
  let userData = [];
  let roster = [];

  // Get the user's data such as teamname and roster (array)
  for (let i = 0; i < league.participants.length; i++) {
    if (user._id === league.participants[i].user) {
      userData = league.participants[i];
      break;
    }
  }
  let color = "white";

  for (let i = 0; i < userData.team.length; i++) {
    switch (color) {
      case "#CCCCCC":
        color = "white";
        break;
      case "white":
        color = "#CCCCCC";
        break;
    }
    roster.push(<PlayerRoster player={userData.team[i]} />);
  }

  return loading || players === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <MainRow>
        <FieldImg>
          <FieldContent>
            <MainRow>
              <PlayerWrapper />
            </MainRow>
            <MainRow>
              <PlayerWrapper />
              <PlayerWrapper />
              <PlayerWrapper />
              <PlayerWrapper />
              <PlayerWrapper />
            </MainRow>
            <MainRow>
              <PlayerWrapper />
              <PlayerWrapper />
              <PlayerWrapper />
              <PlayerWrapper />
              <PlayerWrapper />
            </MainRow>
            <MainRow>
              <PlayerWrapper />
              <PlayerWrapper />
              <PlayerWrapper />
            </MainRow>
          </FieldContent>
        </FieldImg>
        <RosterContent>
          <RosterRowHeader>
            <RosterHeader>Roster</RosterHeader>
          </RosterRowHeader>
          {roster}
        </RosterContent>
      </MainRow>
    </Fragment>
  );
};

index.propTypes = {
  players: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  players: state.players,
  auth: state.auth,
  leagues: state.league,
});

export default connect(mapStateToProps, {})(index);
