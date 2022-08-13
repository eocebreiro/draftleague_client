import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

//Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

//Styling Components
import P from "../../components/P";
import {
  Div,
  PlayerWrapper,
  FieldImage,
  FieldItem,
} from "../../components/Div";
import { Button } from "../../components/Button";

const PlayerRoster = ({ player }) => {
  const { id } = useParams();

  const onClick = async (e) => {
    // deleteFromLineup(id, player.player_id);
  };

  return (
    <PlayerWrapper>
      <FieldImage>
        <img src={player.image_path} width="65px" />
      </FieldImage>
      <FieldItem>
        <span style={{ fontWeight: "600" }}>{player.display_name}</span>
        <span>{player.position + " / " + player.team.short_code}</span>
      </FieldItem>
      <FieldItem>
        {player.team.short_code === "CIN" ? (
          <span>Hi</span>
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
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  league: state.league,
});

export default connect(mapStateToProps, {})(PlayerRoster);
