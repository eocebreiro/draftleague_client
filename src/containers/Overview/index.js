import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getRoster } from "../../state/roster/rosterActions";

import Spinner from "../../components/Spinner";
import {
  OverviewContent,
  FieldImg,
  FieldContent,
  PlayerWrapper,
  RosterContent,
  RosterRow,
  RosterItem,
  MainCol,
  MainRow,
  RosterHeader,
  RosterRowHeader,
} from "../../components/Div";
import H1 from "../../components/H1";
import FieldPlayers from "./FieldPlayers";
import RosterPlayers from "./RosterPlayers";

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

  // Find user's opponent and data
  let opponent = null;
  let scheduleIndex;
  let dataIndex;
  let userTeam;
  for (let i = 0; i < league.schedule.length; i++) {
    if (league.schedule[i].active) {
      scheduleIndex = i;
      for (let j = 0; j < league.schedule[i].data.length; j++) {
        if (league.schedule[i].data[j].team_one.user_id === user._id) {
          dataIndex = j;
          userTeam = "team_one";
          opponent = league.schedule[i].data[j].team_two.teamname;
          break;
        }
        if (league.schedule[i].data[j].team_two.user_id === user._id) {
          dataIndex = j;
          userTeam = "team_two";
          opponent = league.schedule[i].data[j].team_one.teamname;
          break;
        }
      }
      break;
    }
  }

  let rosterList = [];
  let fieldGKList = [];
  let fieldDEFList = [];
  let fieldMIDList = [];
  let fieldFWDList = [];

  if (roster !== null && league !== null) {
    // Get field data
    let lineup =
      league.schedule[scheduleIndex].data[dataIndex][userTeam].lineup;

    let foundIndex;
    for (let j = 0; j < roster.length; j++) {
      for (let i = 0; i < lineup.length; i++) {
        foundIndex = null;
        if (roster[j].player_id === lineup[i].player_id) {
          foundIndex = [i];
          break;
        }
      }
      if (foundIndex) {
        if (lineup[foundIndex].position_id === 1) {
          fieldGKList.push(<FieldPlayers player={lineup[foundIndex]} />);
        }
        if (lineup[foundIndex].position_id === 2) {
          fieldDEFList.push(<FieldPlayers player={lineup[foundIndex]} />);
        }
        if (lineup[foundIndex].position_id === 3) {
          fieldMIDList.push(<FieldPlayers player={lineup[foundIndex]} />);
        }
        if (lineup[foundIndex].position_id === 4) {
          fieldFWDList.push(<FieldPlayers player={lineup[foundIndex]} />);
        }
      } else {
        rosterList.push(<RosterPlayers player={roster[j]} />);
      }
    }
  }
  return roster === null && league === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <MainRow>
        <H1 size="L">Week: {league.activeWeek}</H1>
        <H1 size="L">Opponent: {opponent}</H1>
      </MainRow>
      <MainRow>
        <FieldImg>
          <FieldContent>
            <MainRow>{fieldGKList}</MainRow>
            <MainRow>{fieldDEFList}</MainRow>
            <MainRow>{fieldMIDList}</MainRow>
            <MainRow>{fieldFWDList}</MainRow>
          </FieldContent>
        </FieldImg>
        <RosterContent>
          <RosterRowHeader>
            <RosterHeader>Roster</RosterHeader>
          </RosterRowHeader>
          {rosterList}
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
