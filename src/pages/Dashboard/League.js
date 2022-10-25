import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import StyledLeague from "./StyledLeague";
import P from "../../components/P";
import {
  LeaguesContent,
  LeagueNameWrapper,
  LeagueName,
  ArrowBox,
  LeagueDataWrapper,
  Name,
  Points,
  Crest,
  MatchUpBox,
  UserInfo,
  RankData,
  LeagueData,
  InviteBox,
  Team1,
  Team2,
  Team1Name,
  Team2Name,
} from "../../components/Div";
import { TableItem } from "../../components/Table";
import { Link } from "react-router-dom";
import { getRoster } from "../../state/roster/rosterActions";
import { getLeague } from "../../state/league/leagueActions";
import { Button } from "../../components/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const League = ({
  auth: { user },
  league,
  getLeague,
  fixtures: { fixtures },
}) => {
  const onClick = async (league_id, e) => {
    getLeague(league_id);
    getRoster(league_id, user._id);
  };
  let team1 = null;
  let team2 = null;
  let team1Score = null;
  let team2Score = null;
  let team1Winning = false;
  let team2Winning = false;
  let rank = null;
  // Check to see if league is not full;
  if (league.participantsFull && fixtures !== null) {
    // Get Rank

    // if week has started, get current week rankings
    // If not, get last week rankings
    let index = league.ranking.length - 1;
    if (!fixtures.hasStarted) {
      index = league.ranking.length - 2;
    }
    for (let i = 0; i < league.ranking[index].players.length; i++) {
      if (league.ranking[index].players[i].user_id === user._id) {
        rank = league.ranking[index].players[i].rank;
        break;
      }
    }

    // Get upcoming opponent

    for (let i = 0; i < league.schedule.length; i++) {
      if (league.schedule[i].week === league.activeWeek) {
        for (let j = 0; j < league.schedule[i].data.length; j++) {
          if (league.schedule[i].data[j].team_one.user_id === user._id) {
            team2 = league.schedule[i].data[j].team_two.teamname;
            team1 = league.schedule[i].data[j].team_one.teamname;
            team1Score = league.schedule[i].data[j].team_one.score;
            team2Score = league.schedule[i].data[j].team_two.score;

            break;
          }
          if (league.schedule[i].data[j].team_two.user_id === user._id) {
            team1 = league.schedule[i].data[j].team_one.teamname;
            team2 = league.schedule[i].data[j].team_two.teamname;
            team1Score = league.schedule[i].data[j].team_one.score;
            team2Score = league.schedule[i].data[j].team_two.score;
            break;
          }
        }
        break;
      }
    }

    // see who is currently winning
    if (team1Score === null || team2Score === null) {
      if (team1Score === null) {
        team1Winning = false;
      }
      if (team2Score === null) {
        team2Winning = false;
      }
    } else if (team1Score > team2Score) {
      team1Winning = true;
      team2Winning = false;
    } else if (team1Score < team2Score) {
      team1Winning = false;
      team2Winning = true;
    } else {
      team1Winning = false;
      team2Winning = false;
    }
  } else {
  }

  return league.participantsFull ? (
    <LeaguesContent key={league._id}>
      <LeagueNameWrapper>
        <LeagueName>
          <Link
            to={"/league/" + league._id}
            onClick={(e) => onClick(league._id, e)}
          >
            <P color="black">{league.leaguename}</P>
          </Link>
        </LeagueName>
        <ArrowBox>
          <Link
            to={"/league/" + league._id}
            onClick={(e) => onClick(league._id, e)}
          >
            <FontAwesomeIcon icon={faAngleRight} size="lg" />
          </Link>
        </ArrowBox>
      </LeagueNameWrapper>
      <LeagueDataWrapper>
        <LeagueData>
          <Team1>
            <Crest></Crest>
            <Name>
              <P color="black">{team1}</P>
            </Name>
            <Points>{team1Score === null ? "--" : team1Score}</Points>
          </Team1>
          <MatchUpBox>
            <Link
              to={"/league/" + league._id + "/fixture/"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button color="primary">Match Up</Button>
            </Link>
          </MatchUpBox>
          <Team2>
            <Points>{team2Score === null ? "--" : team2Score}</Points>
            <Name>
              <P color="black">{team2}</P>
            </Name>
            <Crest></Crest>
          </Team2>
        </LeagueData>
        <RankData>
          <P style={{ padding: "0" }} color="black">
            League Rank
          </P>
          <P style={{ padding: "0" }} color="black">
            {rank !== null ? rank + " / " + league.numOfParticipants : "--"}
          </P>
        </RankData>
      </LeagueDataWrapper>
    </LeaguesContent>
  ) : (
    <LeaguesContent key={league._id}>
      <LeagueNameWrapper>
        <LeagueName>
          <P color="black">{league.leaguename}</P>
        </LeagueName>
        <ArrowBox></ArrowBox>
      </LeagueNameWrapper>
      <InviteBox>
        <P style={{ padding: "0" }} color="black">
          Invite your friends!
        </P>
        <P style={{ padding: "0" }} color="black">
          League Code: <span style={{ color: "blue" }}>{league.leagueId}</span>
        </P>
        <P style={{ padding: "0" }} color="black">
          {league.participants.length +
            " / " +
            league.numOfParticipants +
            " players"}
        </P>
      </InviteBox>
    </LeaguesContent>
  );
};

League.propTypes = {
  league: PropTypes.array.isRequired,
  fixtures: PropTypes.object.isRequired,
  getLeague: PropTypes.func.isRequired,
  getRoster: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  fixtures: state.fixtures,
});

export default connect(mapStateToProps, { getRoster, getLeague })(League);
