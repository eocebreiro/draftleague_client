import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { dropFromLineup } from "../../state/league/leagueActions";

//Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

//Styling Components
import P from "../../components/P";
import { PlayerWrapper, FieldImage, FieldItem } from "../../components/Div";
import { Button } from "../../components/Button";
import Spinner from "../../components/Spinner";

const PlayerRoster = ({
  player,
  dropFromLineup,
  league: { league },
  lineup: { lineup },
  fixtures: { fixtures },
}) => {
  const { id } = useParams();

  const onClick = async (e) => {
    dropFromLineup(id, player.player_id);
  };

  // find the player in the lineup state
  let playerIndex = null;
  for (let i = 0; i < lineup.length; i++) {
    if (lineup[i].player_id === player.player_id) {
      playerIndex = i;
      break;
    }
  }

  // get active week
  let activeWeek = null;
  for (let i = 0; i < league.schedule.length; i++) {
    if (league.schedule[i].active) {
      activeWeek = league.schedule[i].week;
      break;
    }
  }

  // get the scores for the active week
  let score = [];
  let fixturesId = [];
  let count = 0;
  if (playerIndex !== null) {
    for (let i = 0; i < lineup[playerIndex].fixtures.length; i++) {
      if (lineup[playerIndex].fixtures[i].week === activeWeek) {
        count++;
        fixturesId.push(lineup[playerIndex].fixtures[i].fixture_id);
        if (
          lineup[playerIndex].fixtures[i].stats.total_points !== null ||
          lineup[playerIndex].fixtures[i].stats.total_points !== undefined
        ) {
          score.push(lineup[playerIndex].fixtures[i].stats.total_points);
        }
      }
    }
  }

  // Check to see if the game is live
  let gameOver = [];
  let color0 = "red";
  let color1 = "red";
  let dnp0 = false;
  let dnp1 = false;
  if (fixtures !== null) {
    for (let i = 0; i < fixtures.data.length; i++) {
      if (count > 1) {
        if (fixtures.data[i].fixture_id === fixturesId[0]) {
          if (fixtures.data[i].time.status === "FT") {
            color0 = "black";
          }
        }
        if (fixtures.data[i].fixture_id === fixturesId[1]) {
          if (fixtures.data[i].time.status === "FT") {
            color1 = "black";
          }
        }
      } else {
        if (fixtures.data[i].fixture_id === fixturesId[0]) {
          if (fixtures.data[i].time.status === "FT") {
            color0 = "black";
            if (score[0] === undefined) {
              dnp0 = true;
            }
          }
          break;
        }
      }
    }
  }

  // Calculate display of scores
  let result = null;

  if (count > 1) {
    if (score[0] !== undefined && score[0] !== undefined) {
      if (score[0] > score[1]) {
        result = (
          <Fragment>
            <span style={{ fontWeight: "700", color: color0 }}>{score[0]}</span>
            <span>{" , "}</span>
            <span style={{ color: color1 }}>{score[1]}</span>
          </Fragment>
        );
      } else {
        result = (
          <Fragment>
            <span style={{ color: color0 }}>{score[0]}</span>
            <span>{" , "}</span>
            <span style={{ fontWeight: "700", color: color1 }}>{score[1]}</span>
          </Fragment>
        );
      }
    } else if (score[0] !== undefined && score[0] === undefined) {
      result = (
        <Fragment>
          <span style={{ fontWeight: "700", color: color0 }}>{score[0]}</span>
          <span>{" , "}</span>
          <span style={{ color: color0 }}>{dnp1 ? "DNP" : "-"}</span>
        </Fragment>
      );
    } else if (score[0] === undefined && score[0] === undefined) {
      result = (
        <Fragment>
          <span style={{ color: color0 }}>{dnp0 ? "DNP" : "-"}</span>
          <span>{" , "}</span>
          <span style={{ color: color1 }}>{dnp1 ? "DNP" : "-"}</span>
        </Fragment>
      );
    }
  } else if (score[0] !== undefined) {
    result = (
      <Fragment>
        <span style={{ fontWeight: "700", color: color0 }}>{score[0]}</span>
      </Fragment>
    );
  } else if (score[0] === undefined) {
    result = (
      <Fragment>
        <span style={{ fontWeight: "700", color: color0 }}>
          {dnp0 ? "DNP" : " - "}
        </span>
      </Fragment>
    );
  }

  return playerIndex === null ? (
    <PlayerWrapper>
      <Spinner />
    </PlayerWrapper>
  ) : (
    <PlayerWrapper>
      <FieldImage>
        <img src={player.image_path} width="65px" />
      </FieldImage>
      <FieldItem>
        <span style={{ fontWeight: "600" }}>{player.display_name}</span>
        <span>{player.position + " / " + player.team.short_code}</span>
      </FieldItem>
      <FieldItem>
        {lineup[playerIndex].lock ? (
          result
        ) : (
          <Button
            style={{ background: "transparent", border: "none" }}
            onClick={(e) => onClick(player.player_id, e)}
            color={"transparent"}
            type={"icon"}
          >
            <FontAwesomeIcon
              icon={faX}
              style={{
                color: "red",
                borderRadius: "50%",
                border: "1px solid red",
                padding: "7px",
              }}
            />
          </Button>
        )}
      </FieldItem>
    </PlayerWrapper>
  );
};
PlayerRoster.propTypes = {
  league: PropTypes.object.isRequired,
  dropFromLineup: PropTypes.func.isRequired,
  fixtures: PropTypes.object.isRequired,
  lineup: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  league: state.league,
  lineup: state.lineup,
  fixtures: state.fixtures,
});

export default connect(mapStateToProps, { dropFromLineup })(PlayerRoster);
