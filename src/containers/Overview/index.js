import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getRoster } from "../../state/roster/rosterActions";
import { getLineup } from "../../state/lineup/lineupActions";
import { getFixtures } from "../../state/fixtures/fixturesActions";

import Spinner from "../../components/Spinner";
import {
  OverviewContent,
  FieldImg,
  FieldContent,
  PlaceHolderWrapper,
  RosterContent,
  MainRow,
  RosterHeader,
  RosterRowHeader,
  FixturesContent,
  FixtureRowHeader,
  FixtureItemHeader,
} from "../../components/Div";
import H1 from "../../components/H1";
import FieldPlayers from "./FieldPlayers";
import RosterPlayers from "./RosterPlayers";
import Fixtures from "./Fixtures";

const index = ({
  getRoster,
  auth: { user },
  league: { league },
  roster: { roster, loading },
  getLineup,
  lineup: { lineup },
  getFixtures,
  fixtures: { fixtures },
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
    getFixtures();
  }, []);

  // Find user's opponent and data
  let opponent = null;
  let scheduleIndex;
  let dataIndex;
  let userTeam;
  for (let i = 0; i < league.schedule.length; i++) {
    if (league.schedule[i].week === league.activeWeek) {
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

  let userLineup = [];

  let fixturesList = [];

  // waiting for state
  if (roster !== null && league !== null && fixtures !== null) {
    // Get field data
    userLineup =
      league.schedule[scheduleIndex].data[dataIndex][userTeam].lineup;

    let foundIndex;
    for (let j = 0; j < roster.length; j++) {
      for (let i = 0; i < userLineup.length; i++) {
        foundIndex = null;
        if (roster[j].player_id === userLineup[i].player_id) {
          foundIndex = [i];
          break;
        }
      }
      if (foundIndex) {
        if (userLineup[foundIndex].position_id === 1) {
          fieldGKList.push(<FieldPlayers player={userLineup[foundIndex]} />);
        }
        if (userLineup[foundIndex].position_id === 2) {
          fieldDEFList.push(<FieldPlayers player={userLineup[foundIndex]} />);
        }
        if (userLineup[foundIndex].position_id === 3) {
          fieldMIDList.push(<FieldPlayers player={userLineup[foundIndex]} />);
        }
        if (userLineup[foundIndex].position_id === 4) {
          fieldFWDList.push(<FieldPlayers player={userLineup[foundIndex]} />);
        }
      } else {
        rosterList.push(<RosterPlayers player={roster[j]} />);
      }
    }

    // fixtures
    for (let i = 0; i < fixtures.data.length; i++) {
      fixturesList.push(<Fixtures fixture={fixtures.data[i]} />);
    }
  }

  useEffect(() => {
    getLineup(league._id, user._id);
  }, [userLineup.length]);

  return roster === null || league === null || lineup == null ? (
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
            <MainRow>
              {fieldGKList.length === 0 ? <PlaceHolderWrapper /> : fieldGKList}
            </MainRow>
            <MainRow>
              {fieldDEFList.length === 0 ? (
                <PlaceHolderWrapper />
              ) : (
                fieldDEFList
              )}
            </MainRow>
            <MainRow>
              {fieldMIDList.length === 0 ? (
                <PlaceHolderWrapper />
              ) : (
                fieldMIDList
              )}
            </MainRow>
            <MainRow>
              {fieldFWDList.length === 0 ? (
                <PlaceHolderWrapper />
              ) : (
                fieldFWDList
              )}
            </MainRow>
          </FieldContent>
        </FieldImg>
        <RosterContent>
          <RosterRowHeader>
            <RosterHeader>Roster</RosterHeader>
          </RosterRowHeader>
          {rosterList}
        </RosterContent>
      </MainRow>
      <MainRow>
        <FixturesContent>
          <FixtureRowHeader>
            <FixtureItemHeader>Fixtures</FixtureItemHeader>
          </FixtureRowHeader>
          {fixturesList}
        </FixturesContent>
      </MainRow>
    </Fragment>
  );
};

index.propTypes = {
  getRoster: PropTypes.func.isRequired,
  getLineup: PropTypes.func.isRequired,
  roster: PropTypes.object.isRequired,
  players: PropTypes.object.isRequired,
  league: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  lineup: PropTypes.array.isRequired,
  getFixtures: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  players: state.players,
  auth: state.auth,
  league: state.league,
  roster: state.roster,
  lineup: state.lineup,
  fixtures: state.fixtures,
});

export default connect(mapStateToProps, { getRoster, getLineup, getFixtures })(
  index
);
