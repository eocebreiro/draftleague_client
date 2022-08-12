import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addPlayer } from "../../state/players/playersActions";

//Styling Components
import P from "../../components/P";
import { Div, CenterRow, RowItem } from "../../components/Div";
import {
  Table,
  TableRow,
  TableItem,
  TableHeader,
  TableRowHeader,
} from "../../components/Table";
import { Button } from "../../components/Button";

const PlayerTable = ({
  addPlayer,
  league: { league },
  players: { players },
  team,
  position,
}) => {
  // size of items in table
  let widthItem = "75px";

  // Function: Sort by club name
  if (team !== "All Clubs") {
    players = players.filter((p) => {
      return p.team.name === team;
    });
  }

  const onClick = async (player_id, e) => {
    let league_id = league._id;
    addPlayer({ league_id, player_id });
  };

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

  let color = "white";

  const playerList = players.map((player) => {
    switch (color) {
      case "#CCCCCC":
        color = "white";
        break;
      case "white":
        color = "#CCCCCC";
        break;
    }

    // Calculate season total points
    let totalPoints = 0;
    for (let i = 0; i < player.data.length; i++) {
      if (player.data[i].played) {
        totalPoints = totalPoints + player.data[i].total_points;
      }
    }

    // Check to see if player is taken
    let ownerId = null;
    let ownerName = null;
    for (let i = 0; i < player.ownership.length; i++) {
      if (player.ownership[i].league_id === league._id) {
        ownerId = player.ownership[i].user_id;
      }
    }

    if (ownerId) {
      for (let i = 0; i < league.participants.length; i++) {
        if (ownerId === league.participants[i].user) {
          ownerName = league.participants[i].teamname;
        }
      }
    }

    return (
      <TableRow style={{ background: color }}>
        <TableItem style={{ width: "100px" }}>
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
            {player.common_name}
          </Link>
        </TableItem>
        <TableItem style={{ width: "100px" }}>{player.team.name}</TableItem>
        <TableItem style={{ width: widthItem }}>{player.position}</TableItem>
        <TableItem style={{ width: widthItem }}>{totalPoints}</TableItem>
        <TableItem style={{ width: widthItem }}>
          {player.lock ? "Locked" : "Available"}
        </TableItem>
        <TableItem style={{ width: widthItem }}>
          {!league.participantsFull ? null : !league.draftComplete ? null : ownerName ? (
            <span>{ownerName}</span>
          ) : (
            <Button
              onClick={(e) => onClick(player.player_id, e)}
              color={"primary"}
              width={widthItem}
              type={"button"}
              disabled={player.lock ? true : false}
            >
              Add
            </Button>
          )}
        </TableItem>
      </TableRow>
    );
  });

  return (
    <Table>
      <TableRowHeader>
        <TableHeader style={{ width: "100px" }}>Name</TableHeader>
        <TableHeader style={{ width: "100px" }}>Club</TableHeader>
        <TableHeader style={{ width: widthItem }}>Position</TableHeader>
        <TableHeader style={{ width: widthItem }}>Total Points</TableHeader>
        <TableHeader style={{ width: widthItem }}>Week Status</TableHeader>
        <TableHeader style={{ width: widthItem }}>Availability</TableHeader>
      </TableRowHeader>
      {playerList}
    </Table>
  );
};

PlayerTable.propTypes = {
  addPlayer: PropTypes.func.isRequired,
  players: PropTypes.object.isRequired,
  league: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  players: state.players,
  league: state.league,
  auth: state.auth,
});

export default connect(mapStateToProps, { addPlayer })(PlayerTable);
