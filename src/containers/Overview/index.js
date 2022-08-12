import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getRoster } from "../../state/roster/rosterActions";

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

const index = ({
  getRoster,
  auth: { user },
  league: { league },
  roster: { roster, loading },
}) => {
  // Check to see if league is full
  if (!league.participantsFull) {
    return (
      <Fragment>
        {"League not full. " +
          league.participants.length +
          "/" +
          league.numOfParticipants +
          " players. Have your friends join. League code: " +
          league.leagueId}
      </Fragment>
    );
  }
  // Check to see if draft is complete
  if (!league.draftComplete) {
    return (
      <Fragment>Draft in progress. Come back after draft is complete.</Fragment>
    );
  }

  useEffect(() => {
    getRoster(league._id, user._id);
  }, []);

  let userData = [];

  if (roster !== null && league !== null) {
    for (let i = 0; i < roster.length; i++) {
      userData.push(<PlayerRoster player={roster[i]} />);
    }
  }

  return roster === null && league === null ? (
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
          {userData}
        </RosterContent>
      </MainRow>
    </Fragment>
  );
};

index.propTypes = {
  getRoster: PropTypes.func.isRequired,
  roster: PropTypes.object.isRequired,
  players: PropTypes.object.isRequired,
  league: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  players: state.players,
  auth: state.auth,
  league: state.league,
  roster: state.roster,
});

export default connect(mapStateToProps, { getRoster })(index);
