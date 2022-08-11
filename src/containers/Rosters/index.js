import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { dropPlayer } from "../../state/league/leagueActions";

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

const index = ({ dropPlayer, league, auth: { user } }) => {
  useEffect(() => {}, [participant_name, participant_id]);

  const [data, setData] = useState({
    participant_name: user.teamname,
    participant_id: user._id,
  });
  const { participant_name, participant_id } = data;

  const onChange = (e) => {
    setData({ ...data, participant_id: e.target.value });
  };
  const onClick = async (player_id, e) => {
    let league_id = league._id;
    dropPlayer({ league_id, player_id });
  };
  let widthItem = "50px";
  let color = "white";
  let numOfPlayers = 0;
  let rosterSize = 0;
  let options = [<option value="All teams">All teams</option>];
  // Check to see if draft and team is full
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
  if (!league.draftComplete) {
    return (
      <Fragment>Draft in progress. Come back after draft is complete.</Fragment>
    );
  }

  // get the roster for the participant selected
  // Also, get the list of participants
  let found = false;
  let roster = [];
  for (let i = 0; i < league.participants.length; i++) {
    if (league.participants[i].user === participant_id) {
      found = true;
      rosterSize = league.participants[i].team.length;
      options.push(
        <option value={league.participants[i].teamname} selected>
          {league.participants[i].teamname}
        </option>
      );
      roster = league.participants[i].team.map((player) => {
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
            <TableItem style={{ width: widthItem }}>
              {player.team.name}
            </TableItem>
            <TableItem style={{ width: widthItem }}>
              {player.position}
            </TableItem>
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
    } else {
      options.push(
        <option value={league.participants[i].user}>
          {league.participants[i].teamname}
        </option>
      );
    }
  }

  // if participant is found, return an error
  if (!found) {
    return (
      <Fragment>
        Error: You are not found in league. Contact the administrator.
      </Fragment>
    );
  }

  // Check to see the participants has any players
  if (roster.length === 0) {
    roster.push(<Fragment>There are no players for this team</Fragment>);
  }

  return (
    <Fragment>
      <Div>
        <select name="participant_name" onChange={(e) => onChange(e)}>
          {options}
        </select>
      </Div>
      <Div>
        Roster Size: {rosterSize}/{league.numOfPlayers}
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
        {roster}
      </Table>{" "}
    </Fragment>
  );
};

index.propTypes = {
  dropPlayer: PropTypes.func.isRequired,
  league: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { dropPlayer })(index);
