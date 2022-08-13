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

const PlayerRoster = ({ player, dropFromLineup }) => {
  const { id } = useParams();

  const onClick = async (e) => {
    dropFromLineup(id, player.player_id);
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
  dropFromLineup: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  league: state.league,
});

export default connect(mapStateToProps, { dropFromLineup })(PlayerRoster);
