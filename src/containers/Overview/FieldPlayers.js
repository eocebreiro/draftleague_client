import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useParams, Link } from "react-router-dom";
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

  //Variables
  let score = [];

  let activeWeek = null;
  let playerIndex = null;
  let dataList = [];
  let count = 0; // if count is 2, then it is a double game week;
  let result = null;

  // find the player in the lineup state
  for (let i = 0; i < lineup.length; i++) {
    if (lineup[i].player_id === player.player_id) {
      playerIndex = i;
      break;
    }
  }

  // get active week
  for (let i = 0; i < league.schedule.length; i++) {
    if (league.schedule[i].week === league.activeWeek) {
      activeWeek = league.schedule[i].week;
      break;
    }
  }

  // get the fixtures for the week (check to see if it's a double game week)
  if (playerIndex !== null) {
    for (let i = 0; i < lineup[playerIndex].fixtures.length; i++) {
      if (lineup[playerIndex].fixtures[i].week === activeWeek) {
        dataList.push({
          fixture_id: null,
          score: null,
          fixture_status: null,
        });
        dataList[count].fixture_id = lineup[playerIndex].fixtures[i].fixture_id;
        if (lineup[playerIndex].fixtures[i].played) {
          dataList[count].score =
            lineup[playerIndex].fixtures[i].stats.total_points;
        } else {
          dataList[count].score = "DNP";
        }
        count++;
      }
    }
  }

  // Check to see if the game is live
  for (let a = 0; a < dataList.length; a++) {
    for (let i = 0; i < fixtures.data.length; i++) {
      if (dataList[a].fixture_id === fixtures.data[i].fixture_id) {
        dataList[a].fixture_status = fixtures.data[i].time.status;
      }
    }
  }

  // Display scores
  if (dataList.length === 1) {
    result = (
      <Fragment>
        <span
          style={{
            fontWeight: "700",
            color:
              dataList[0].fixture_status === "FT" ||
              dataList[0].fixture_status === "NS"
                ? "black"
                : "green",
          }}
        >
          {dataList[0].score === "DNP" && dataList[0].fixture_status === "FT"
            ? "DNP"
            : dataList[0].score === "DNP"
            ? " - "
            : dataList[0].score}
        </span>
      </Fragment>
    );
  }

  if (dataList.length === 2) {
    let score0Higher = false;
    let score1Higher = false;
    if (dataList[0].score !== "DNP" && dataList[1].score !== "DNP") {
      if (dataList[0].score > dataList[1].score) {
        score0Higher = true;
      } else {
        score1Higher = true;
      }
    }

    result = (
      <Fragment>
        <span
          style={{
            fontWeight: score0Higher && "700",
            color:
              dataList[0].fixture_status === "FT" ||
              dataList[0].fixture_status === "NS"
                ? "black"
                : "green",
          }}
        >
          {dataList[0].score === "DNP" && dataList[0].fixture_status === "FT"
            ? "DNP"
            : dataList[0].score === "DNP"
            ? "-"
            : dataList[0].score}
        </span>
        <span>{" , "}</span>
        <span
          style={{
            fontWeight: score1Higher && "700",
            color:
              dataList[1].fixture_status === "FT" ||
              dataList[1].fixture_status === "NS"
                ? "black"
                : "green",
          }}
        >
          {dataList[1].score === "DNP" && dataList[1].fixture_status === "FT"
            ? "DNP"
            : dataList[1].score === "DNP"
            ? "-"
            : dataList[1].score}
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
      <Link
        to={"/player/" + player.player_id}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "black" }}
      >
        <FieldImage>
          <img src={player.image_path} width="65px" />
        </FieldImage>
        <FieldItem>
          <span style={{ fontWeight: "600" }}>{player.display_name}</span>
          <span>{player.position + " / " + player.team.short_code}</span>
        </FieldItem>
      </Link>
      <FieldItem style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
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
