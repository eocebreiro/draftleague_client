import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

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

const PlayerTable = ({ players, team, position }) => {
  // size of items in table
  let widthItem = "75px";

  // Function: Sort by club name
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

    let totalPoints = 0;
    for (let i = 0; i < player.data.length; i++) {
      if (player.data[i].played) {
        totalPoints = totalPoints + player.data[i].total_points;
      }
    }

    return (
      <TableRow style={{ background: color }}>
        <TableItem style={{ width: "200px" }}>
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
        <TableItem style={{ width: "200px" }}>{player.team.name}</TableItem>
        <TableItem style={{ width: widthItem }}>{player.position}</TableItem>
        <TableItem style={{ width: widthItem }}>{totalPoints}</TableItem>
        <TableItem style={{ width: widthItem }}>
          {player.lock ? "Locked" : "Avail."}
        </TableItem>
      </TableRow>
    );
  });
  return (
    <Table>
      <TableRowHeader>
        <TableHeader style={{ width: "200px" }}>Name</TableHeader>
        <TableHeader style={{ width: "200px" }}>Club</TableHeader>
        <TableHeader style={{ width: widthItem }}>Position</TableHeader>
        <TableHeader style={{ width: widthItem }}>Total Points</TableHeader>
        <TableHeader style={{ width: widthItem }}>Status</TableHeader>
      </TableRowHeader>
      {playerList}
    </Table>
  );
};
PlayerTable.propTypes = { players: PropTypes.array.isRequired };

export default PlayerTable;