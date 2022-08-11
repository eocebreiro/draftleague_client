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
import { Button } from "../../components/Button";

const index = ({ dropPlayer, league, auth: { user } }) => {
  let widthItem = "50px";
  let color = "white";

  const onClick = async (player_id, e) => {
    let league_id = league._id;
    dropPlayer({ league_id, player_id });
  };

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
  let found = false;
  let roster = [];
  for (let i = 0; i < league.participants.length; i++) {
    if (league.participants[i].user === user._id) {
      found = true;
      roster = league.participants[i].team.map((player) => {
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
                {player.common_name}
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
              <Button
                onClick={(e) => onClick(player.player_id, e)}
                color={"primary"}
                type={"button"}
                disabled={player.lock ? true : false}
              >
                Drop
              </Button>
            </TableItem>
          </TableRow>
        );
      });
    }
  }

  if (!found) {
    return (
      <Fragment>
        Error: You are not found in league. Contact the administrator.
      </Fragment>
    );
  }
  if (roster.length === 0) {
    return <Fragment>You have no players on your team</Fragment>;
  }
  return (
    <Table>
      <TableRowHeader>
        <TableHeader style={{ width: widthItem }}>Name</TableHeader>
        <TableHeader style={{ width: widthItem }}>Club</TableHeader>
        <TableHeader style={{ width: widthItem }}>Position</TableHeader>
        <TableHeader style={{ width: widthItem }}>Weekly Status</TableHeader>
        <TableHeader style={{ width: widthItem }}>Drop</TableHeader>
      </TableRowHeader>
      {roster}
    </Table>
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
