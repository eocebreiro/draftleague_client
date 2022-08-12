import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getNewPlayers } from "../../state/players/playersActions";
import { getTeamNames } from "../../utils/getTeamNames";
import { Link } from "react-router-dom";

//Styling Components
import Spinner from "../../components/Spinner";
import { Div } from "../../components/Div";
import {
  Table,
  TableRow,
  TableItem,
  TableHeader,
  TableRowHeader,
} from "../../components/Table";
const index = ({
  league: { league },
  getNewPlayers,
  players: { players, loading },
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

  const [data, setData] = useState({
    team: "All Clubs",
    position: "All Positions",
  });

  const { team, position } = data;

  useEffect(() => {
    getNewPlayers();
  }, [team, position]);

  let widthItem = "75px";

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // get the new players for the week
  let color = "white";
  let playerList = [];
  const teamOptions = [];
  const positionOptions = [];
  const teamList = [];
  const positionList = [];
  if (players === null || players.length === 0) {
    playerList = <Fragment>There are no players for this team</Fragment>;
  } else {
    //*** Drop Down menu list before filtering the players */
    for (let i = 0; i < players.length; i++) {
      // Create a drop down list of all the possible new player teams and positions
      if (teamList.indexOf(players[i].team.name) === -1) {
        teamList.push(players[i].team.name);
      }

      let position;
      switch (players[i].position) {
        case "GK":
          position = "Goalkeeper";
          break;
        case "Def":
          position = "Defender";
          break;
        case "Mid":
          position = "Midfielder";
          break;
        case "Fwd":
          position = "Forward";
          break;
      }
      if (positionList.indexOf(position) === -1) {
        positionList.push(position);
      }
    }
    // Orginize team list options
    teamList.sort();
    if (teamList.length > 1) {
      teamList.unshift("All Clubs");
      for (let i = 0; i < teamList.length; i++) {
        teamOptions.push(
          <option
            value={teamList[i]}
            selected={teamList[i] === team ? true : false}
          >
            {teamList[i]}
          </option>
        );
      }
    }

    // orginize position list options
    let orderedPositionList = [
      "All Positions",
      "Goalkeeper",
      "Defender",
      "Midfielder",
      "Forward",
    ];
    if (positionList.length > 1) {
      positionList.unshift("All Positions");
      for (let i = 0; i < orderedPositionList.length; i++) {
        for (let j = 0; j < positionList.length; j++) {
          if (orderedPositionList[i] === positionList[j]) {
            positionOptions.push(
              <option
                value={orderedPositionList[i]}
                selected={orderedPositionList[i] === position ? true : false}
              >
                {orderedPositionList[i]}
              </option>
            );
            break;
          }
        }
      }
    }

    // Function: Sort by club name or position
    if (team !== "All Clubs") {
      players = players.filter((p) => {
        return p.team.name === team;
      });
    }
    if (position !== "All Positions") {
      let position_code;
      if (position === "Goalkeeper") {
        position_code = "GK";
      } else if (position === "Defender") {
        position_code = "Def";
      } else if (position === "Midfielder") {
        position_code = "Mid";
      } else if (position === "Forward") {
        position_code = "Fwd";
      }
      players = players.filter((p) => {
        return p.position === position_code;
      });
    }

    // Build Table for each player

    playerList = players.map((player) => {
      switch (color) {
        case "#CCCCCC":
          color = "white";
          break;
        case "white":
          color = "#CCCCCC";
          break;
      }

      return (
        <TableRow style={{ background: color }}>
          <TableItem style={{ width: widthItem }}>
            <Link
              to={"/player/" + player.player_id}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  height: "70px",
                }}
              >
                <img src={player.image_path} />
              </div>
              {player.display_name}
            </Link>
          </TableItem>
          <TableItem style={{ width: widthItem }}>{player.team.name}</TableItem>
          <TableItem style={{ width: widthItem }}>{player.position}</TableItem>
        </TableRow>
      );
    });

    return loading || players === null ? (
      <Spinner />
    ) : (
      <Fragment>
        <Div>
          <select name="position" onChange={(e) => onChange(e)}>
            {positionOptions}
          </select>
          <select name="team" onChange={(e) => onChange(e)}>
            {teamOptions}
          </select>
        </Div>
        <Table>
          <TableRowHeader>
            <TableHeader style={{ width: widthItem }}>Name</TableHeader>
            <TableHeader style={{ width: widthItem }}>Club</TableHeader>
            <TableHeader style={{ width: widthItem }}>Position</TableHeader>
          </TableRowHeader>
          {playerList === 0
            ? "No new players for this search result"
            : playerList}
        </Table>
      </Fragment>
    );
  }
};

index.propTypes = {
  getNewPlayers: PropTypes.func.isRequired,
  players: PropTypes.object.isRequired,
  league: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  players: state.players,
  league: state.league,
  auth: state.auth,
});

export default connect(mapStateToProps, { getNewPlayers })(index);
