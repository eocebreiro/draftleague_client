import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

//Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";

//Styling Components
import Spinner from "../../components/Spinner";
import {
  Table,
  TableRow,
  TableItem,
  TableHeader,
  TableRowHeader,
} from "../../components/Table";

const index = ({ league: { league }, fixtures: { fixtures } }) => {
  let players = [];
  let width = "50px";
  let prevRankingIndex = null;
  let currentRankingIndex = league.activeWeek;
  let arrow;

  // check to see if the week has started.
  let offset;
  if (fixtures.hasStarted) {
    offset = 1;
  } else {
    offset = 2;
  }

  for (let i = 0; i < league.ranking.length; i++) {
    // Check to see if there was a match before

    if (league.ranking[i].week === league.activeWeek - offset) {
      prevRankingIndex = i;
      currentRankingIndex = i + 1;
      break;
    }
  }

  // Get last weeks results and ranking

  for (let j = 0; j < league.ranking[currentRankingIndex].players.length; j++) {
    if (prevRankingIndex !== null) {
      for (
        let k = 0;
        k < league.ranking[prevRankingIndex].players.length;
        k++
      ) {
        if (
          league.ranking[currentRankingIndex].players[j].user_id ===
          league.ranking[prevRankingIndex].players[k].user_id
        ) {
          if (
            league.ranking[currentRankingIndex].players[j].rank <
            league.ranking[prevRankingIndex].players[k].rank
          ) {
            arrow = (
              <FontAwesomeIcon style={{ color: "green" }} icon={faArrowUp} />
            );
          } else if (
            league.ranking[currentRankingIndex].players[j].rank >
            league.ranking[prevRankingIndex].players[k].rank
          ) {
            arrow = (
              <FontAwesomeIcon style={{ color: "red" }} icon={faArrowDown} />
            );
          } else {
            arrow = <FontAwesomeIcon icon={faMinus} />;
          }
        }
      }
    } else {
      if (
        league.ranking[currentRankingIndex].players[j].wins === 1 ||
        league.ranking[currentRankingIndex].players[j].draws === 1
      ) {
        arrow = <FontAwesomeIcon style={{ color: "green" }} icon={faArrowUp} />;
      } else {
        arrow = <FontAwesomeIcon style={{ color: "red" }} icon={faArrowDown} />;
      }
    }
    players.push(
      <TableRow>
        <TableItem style={{ width: "20px" }}>{arrow}</TableItem>

        <TableItem style={{ width: width }}>
          {league.ranking[currentRankingIndex].players[j].rank}
        </TableItem>
        <TableItem style={{ width: "150px" }}>
          {league.ranking[currentRankingIndex].players[j].teamname}
        </TableItem>
        <TableItem style={{ width: width }}>
          {league.ranking[currentRankingIndex].players[j].wins}
        </TableItem>
        <TableItem style={{ width: width }}>
          {league.ranking[currentRankingIndex].players[j].draws}
        </TableItem>
        <TableItem style={{ width: width }}>
          {league.ranking[currentRankingIndex].players[j].losses}
        </TableItem>
        <TableItem style={{ width: width }}>
          {league.ranking[currentRankingIndex].players[j].league_points}
        </TableItem>
        <TableItem style={{ width: width }}>
          {league.ranking[currentRankingIndex].players[j].total_points}
        </TableItem>
      </TableRow>
    );
  }

  if (players.length === 0) {
    for (let k = 0; k < league.participants.length; k++) {
      // Empty table beccause games have not started yet
      players.push(
        <TableRow>
          <TableItem style={{ width: "20px" }}></TableItem>
          <TableItem style={{ width: width }}>{"-"}</TableItem>
          <TableItem>{league.participants[k].teamname}</TableItem>
          <TableItem style={{ width: width }}>{"0"}</TableItem>
          <TableItem style={{ width: width }}>{"0"}</TableItem>
          <TableItem style={{ width: width }}>{"0"}</TableItem>
          <TableItem style={{ width: width }}>{"0"}</TableItem>
          <TableItem style={{ width: width }}>{"0"}</TableItem>
        </TableRow>
      );
    }
  }

  return (
    <Table>
      <TableRowHeader>
        <TableHeader style={{ width: "20px" }}></TableHeader>
        <TableHeader style={{ width: width }}>Rank</TableHeader>
        <TableHeader style={{ width: "150px" }}>Team</TableHeader>
        <TableHeader style={{ width: width }}>Wins</TableHeader>
        <TableHeader style={{ width: width }}>Draws</TableHeader>
        <TableHeader style={{ width: width }}>Losses</TableHeader>
        <TableHeader style={{ width: width }}>Points</TableHeader>
        <TableHeader style={{ width: width }}>Score</TableHeader>
      </TableRowHeader>
      {players}
    </Table>
  );
};

index.propTypes = {
  league: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  fixtures: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  league: state.league,
  fixtures: state.fixtures,
  auth: state.auth,
});

export default connect(mapStateToProps)(index);
