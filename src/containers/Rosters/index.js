import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { dropPlayer, getRoster } from "../../state/roster/rosterActions";

//Styling Components
import Spinner from "../../components/Spinner";
import {
  Table,
  TableRow,
  TableItem,
  TableHeader,
  TableRowHeader,
} from "../../components/Table";
import { Div } from "../../components/Div";
import { Button } from "../../components/Button";

const index = ({
  getRoster,
  dropPlayer,
  league: { league },
  auth: { user },
  roster: { roster, loading },
}) => {
  const [data, setData] = useState({
    participant_name: user.teamname,
    participant_id: user._id,
  });
  const { participant_name, participant_id } = data;
  let league_id = league._id;

  useEffect(() => {
    getRoster(league_id, participant_id);
  }, [participant_name, participant_id]);

  const onChange = (e) => {
    setData({ ...data, participant_id: e.target.value });
  };
  const onClick = async (player_id, e) => {
    dropPlayer({ league_id, player_id });
  };
  let widthItem = "50px";
  let color = "white";
  let numOfPlayers = 0;
  let rosterData = [];
  let options = [<option value="All teams">All teams</option>];
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
  // Check to see the participants has any players
  if (roster !== null && roster.length === 0) {
    rosterData = <Fragment>There are no players for this team</Fragment>;
  }

  // get the teamnames only in order to sort
  let teamnames = [];
  let selected;
  for (let i = 0; i < league.participants.length; i++) {
    if (league.participants[i].user === participant_id) {
      selected = league.participants[i].teamname;
    }
    teamnames.push(league.participants[i].teamname);
  }
  teamnames.sort();

  // Create the dropdown list of teams
  for (let j = 0; j < teamnames.length; j++) {
    for (let i = 0; i < league.participants.length; i++) {
      if (league.participants[i].teamname === teamnames[j]) {
        if (teamnames[j] === selected) {
          options.push(
            <option value={league.participants[i].user} selected>
              {league.participants[i].teamname}
            </option>
          );
        } else {
          options.push(
            <option value={league.participants[i].user}>
              {league.participants[i].teamname}
            </option>
          );
        }
      }
    }
  }

  // Create the table for each player
  if (roster !== null) {
    rosterData = roster.map((player) => {
      switch (color) {
        case "#CCCCCC":
          color = "white";
          break;
        case "white":
          color = "#CCCCCC";
          break;
      }
      numOfPlayers++;

      return (
        <TableRow style={{ background: color }}>
          <TableItem style={{ width: "10px" }}>{numOfPlayers}</TableItem>
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
          <TableItem style={{ width: widthItem }}>
            {player.lock ? "Locked" : "Available"}
          </TableItem>

          <TableItem style={{ width: widthItem }}>
            {participant_id === user._id && (
              <Button
                onClick={(e) => onClick(player.player_id, e)}
                color={"primary"}
                type={"button"}
                disabled={player.lock ? true : false}
              >
                Drop
              </Button>
            )}
          </TableItem>
        </TableRow>
      );
    });
  }

  return roster === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Div>
        <select name="participant_name" onChange={(e) => onChange(e)}>
          {options}
        </select>
      </Div>
      <Div>
        Roster Size: {roster.length}/{league.numOfPlayers}
      </Div>
      <Table>
        <TableRowHeader>
          <TableHeader style={{ width: "10px" }}>#</TableHeader>
          <TableHeader style={{ width: widthItem }}>Name</TableHeader>
          <TableHeader style={{ width: widthItem }}>Club</TableHeader>
          <TableHeader style={{ width: widthItem }}>Position</TableHeader>
          <TableHeader style={{ width: widthItem }}>Weekly Status</TableHeader>
          <TableHeader style={{ width: widthItem }}>
            {participant_id === user._id && "Drop"}
          </TableHeader>
        </TableRowHeader>
        {rosterData}
      </Table>{" "}
    </Fragment>
  );
};

index.propTypes = {
  dropPlayer: PropTypes.func.isRequired,
  getRoster: PropTypes.func.isRequired,
  roster: PropTypes.array.isRequired,
  league: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  roster: state.roster,
  league: state.league,
  auth: state.auth,
});

export default connect(mapStateToProps, { dropPlayer, getRoster })(index);
