import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import StyledLeague from "./StyledLeague";
import P from "../../components/P";
import { LeaguesContent } from "../../components/Div";
import { TableItem } from "../../components/Table";
import Link from "../../components/Link";
import { getRoster } from "../../state/roster/rosterActions";
import { getLeague } from "../../state/league/leagueActions";

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
    console.log("IN HERE");
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
    <LeaguesContent style={{ margin: "1px" }} key={league._id}>
      <Link
        to={"/league/" + league._id}
        onClick={(e) => onClick(league._id, e)}
      >
        <StyledLeague>
          <TableItem
            style={{
              width: "250px",
              borderRight: "1px solid black",
              fontWeight: "700",
            }}
          >
            <P color="black">{league.leaguename}</P>
          </TableItem>
          <TableItem style={{ width: "250px" }}>
            <P color="black">{team1}</P>
          </TableItem>
          <TableItem style={{ width: "250px" }}>
            <P
              style={{
                display: "flex",
                flexGrow: "1",
                width: "100%",
                justifyContent: "space-around",
              }}
              color="black"
            >
              <span style={{ fontWeight: team1Winning && "700" }}>
                {team1Score === null ? "--" : team1Score}
              </span>
              <span>{" vs "}</span>
              <span style={{ fontWeight: team2Winning && "700" }}>
                {team2Score === null ? "--" : team2Score}
              </span>
            </P>
          </TableItem>
          <TableItem style={{ width: "250px" }}>
            <P color="black">{team2}</P>
          </TableItem>
          <TableItem style={{ width: "250px", borderLeft: "1px solid black" }}>
            <P style={{ padding: "0" }} color="black">
              League Rank
            </P>
            <P style={{ padding: "0" }} color="black">
              {rank !== null ? rank + " / " + league.numOfParticipants : "--"}
            </P>
          </TableItem>
        </StyledLeague>
      </Link>
    </LeaguesContent>
  ) : (
    <LeaguesContent key={league._id}>
      <StyledLeague>
        <TableItem
          style={{
            width: "250px",
            borderRight: "1px solid black",
            fontWeight: "700",
          }}
        >
          <P color="black">{league.leaguename}</P>
        </TableItem>
        <TableItem style={{ width: "750px" }}>
          <P style={{ padding: "0" }} color="black">
            Invite your friends!
          </P>
          <P style={{ padding: "0" }} color="black">
            League Code:{" "}
            <span style={{ color: "blue" }}>{league.leagueId}</span>
          </P>
          <P style={{ padding: "0" }} color="black">
            {league.participants.length +
              " / " +
              league.numOfParticipants +
              " players"}
          </P>
        </TableItem>
        <TableItem style={{ width: "250px", borderLeft: "1px solid black" }}>
          <P style={{ padding: "0" }} color="black">
            League Rank
          </P>
          <P style={{ padding: "0" }} color="black">
            {rank !== null ? rank + " / " + league.numOfParticipants : "--"}
          </P>
        </TableItem>
      </StyledLeague>
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
