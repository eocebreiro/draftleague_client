import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { getRoster } from "../state/roster/rosterActions";
import { getLeague } from "../state/league/leagueActions";

// Styles
import { DesktopView, MobileView } from "../Styles";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const MyLeagues = ({
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
    <div className="card mb-5 shadow">
      <div className="card-header">
        <Link
          className="link-dark"
          to={"/league/" + league._id}
          onClick={(e) => onClick(league._id, e)}
        >
          <div className="row">
            <div className="col-1"></div>
            <div className="col-10">
              <h5 className="text-center fw-bold">{league.leaguename}</h5>
            </div>
            <div className="col-1 d-flex justify-content-end align-items-center">
              <FontAwesomeIcon icon={faAngleRight} size="lg" />
            </div>
          </div>
        </Link>
      </div>
      <div className="card-body">
        <DesktopView>
          <div className="row justify-content-center">
            <div className="col-4">
              <div className="text-center">
                <h5 className="fw-bold">{team1}</h5>
              </div>
              <div className="d-flex justify-content-center m-3">
                <img
                  src="https://draftleague.s3.us-west-1.amazonaws.com/avatar-1299805_640.png"
                  alt="crest"
                  height={"150px"}
                />
              </div>
            </div>

            <div className="col-3 d-flex justify-content-between align-items-center">
              <div className={`${team1Winning && "fw-bold"}`}>
                <h3>{team1Score === null ? "--" : team1Score}</h3>
              </div>
              <button className="btn btn-dark ms-2 me-2">Matchup</button>
              <div className={`${team2Winning && "fw-bold"}`}>
                <h3 className="">{team2Score === null ? "--" : team2Score}</h3>
              </div>
            </div>

            <div className="col-4">
              <div className="text-center">
                <h5 className="fw-bold">{team2}</h5>
              </div>
              <div className="d-flex justify-content-center m-3">
                <img
                  src="https://draftleague.s3.us-west-1.amazonaws.com/avatar-1299805_640.png"
                  alt="crest"
                  height={"150px"}
                />
              </div>
            </div>
          </div>
        </DesktopView>
        <MobileView>
          <div className="row justify-content-center mb-3">
            <div className="col-5 d-flex justify-content-center align-items-center">
              <span className="text-center fw-bold">{team1}</span>
            </div>
            <div className="col-2"></div>
            <div className="col-5 d-flex justify-content-center align-items-center">
              <span className="text-center fw-bold">{team2}</span>
            </div>
          </div>

          <div className="row justify-content-center mb-3">
            <div
              className={`col-5 d-flex justify-content-center align-items-center ${team1Winning &&
                "fw-bold"}`}
            >
              <h5>{team1Score === null ? "--" : team1Score}</h5>
            </div>
            <div className="col-2 d-flex justify-content-center align-items-center ">
              <button className="btn btn-dark ms-2 me-2">VS</button>
            </div>
            <div
              className={`col-5 d-flex justify-content-center align-items-center ${team2Winning &&
                "fw-bold"}`}
            >
              <h5>{team2Score === null ? "--" : team2Score}</h5>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-5 d-flex justify-content-center">
              <img
                src="https://draftleague.s3.us-west-1.amazonaws.com/avatar-1299805_640.png"
                alt="crest"
                height={"75px"}
              />
            </div>
            <div className="col-2"></div>
            <div className="col-5 d-flex justify-content-center">
              <img
                src="https://draftleague.s3.us-west-1.amazonaws.com/avatar-1299805_640.png"
                alt="crest"
                height={"75px"}
              />
            </div>
          </div>
        </MobileView>
      </div>
      <div className="card-footer">
        <div className="d-flex justify-content-center fw-bold">
          League Rank: 5
        </div>
      </div>
    </div>
  ) : (
    <div className="card mb-5 shadow">
      <div className="card-header">
        <h5 className="text-center fw-bold">{league.leaguename}</h5>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="text-center">
            <p className="lead">Invite your friends!</p>
            <p className="lead">
              League Code: <span>{league.leagueId}</span>
            </p>
            <p className="lead">
              {league.participants.length +
                " / " +
                league.numOfParticipants +
                " players"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

MyLeagues.propTypes = {
  league: PropTypes.array.isRequired,
  fixtures: PropTypes.object.isRequired,
  getLeague: PropTypes.func.isRequired,
  getRoster: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  fixtures: state.fixtures,
});

export default connect(mapStateToProps, { getRoster, getLeague })(MyLeagues);

/**
 * 
 * <LeaguesContent key={league._id}>
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
 */
