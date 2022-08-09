import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

//Styling Components
import Spinner from "../../components/Spinner";
import {
  Table,
  TableRow,
  TableItem,
  TableHeader,
  TableRowHeader,
} from "../../components/Table";

const index = ({ league, auth: { user } }) => {
  let widthItem = "50px";
  let color = "white";

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

  const opponents = league.schedule.map((fixture) => {
    switch (color) {
      case "#CCCCCC":
        color = "white";
        break;
      case "white":
        color = "#CCCCCC";
        break;
    }
    // Find player and opponent
    let player = user._id;
    let opponent, opponentScore, playerScore, fixture_id;
    for (let i = 0; i < fixture.data.length; i++) {
      if (fixture.data[i].team_one.user_id === player) {
        playerScore = fixture.data[i].team_one.score;
        opponent = fixture.data[i].team_two.teamname;
        opponentScore = fixture.data[i].team_two.score;
        fixture_id = fixture.data[i]._id;
        break;
      } else if (fixture.data[i].team_two.user_id === player) {
        playerScore = fixture.data[i].team_two.score;
        opponent = fixture.data[i].team_one.teamname;
        opponentScore = fixture.data[i].team_one.score;
        fixture_id = fixture.data[i]._id;

        break;
      }
    }

    return (
      <Link
        style={{ textDecoration: "none" }}
        to={"/league/" + league._id + "/schedule/" + fixture_id}
        target="_blank"
        rel="noopener noreferrer"
      >
        <TableRow style={{ background: color }}>
          <TableItem style={{ width: widthItem }}>{fixture.week}</TableItem>
          <TableItem style={{ width: "200px" }}>{opponent}</TableItem>
          <TableItem style={{ width: widthItem }}>
            {playerScore === null ? "-" : playerScore}
          </TableItem>
          <TableItem style={{ width: widthItem }}>
            {opponentScore === null ? "-" : opponentScore}
          </TableItem>
          <TableItem style={{ width: widthItem }}>
            {playerScore === null
              ? "-"
              : playerScore > opponentScore
              ? "W"
              : playerScore < opponentScore
              ? "L"
              : "D"}
          </TableItem>
        </TableRow>
      </Link>
    );
  });
  return (
    <Table>
      <TableRowHeader>
        <TableHeader style={{ width: widthItem }}>Week</TableHeader>
        <TableHeader style={{ width: "200px" }}>Opponent</TableHeader>
        <TableHeader style={{ width: widthItem }}>Your Score</TableHeader>
        <TableHeader style={{ width: widthItem }}>Opponent Score</TableHeader>
        <TableHeader style={{ width: widthItem }}>Result</TableHeader>
      </TableRowHeader>
      {opponents}
    </Table>
  );
};

index.propTypes = {
  league: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(index);
