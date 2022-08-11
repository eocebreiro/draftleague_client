import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";

//Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

//Styling Components
import P from "../../components/P";
import { RosterRow, RosterItem } from "../../components/Div";
import { Button } from "../../components/Button";

export const PlayerRoster = ({ player }) => {
  const [show, setShow] = useState(true);

  const onClick = async (e) => {
    setShow(false);
  };

  return show ? (
    <RosterRow>
      <RosterItem>
        <img src={player.image_path} width="50" height="auto" />
      </RosterItem>
      <RosterItem>
        <span>{player.display_name}</span>
        <span>{player.position.toUpperCase()}</span>
        <span>{player.team.short_code}</span>
      </RosterItem>
      <RosterItem>
        <Button
          onClick={(e) => onClick(player.player_id, e)}
          color={"transparent"}
          type={"button"}
        >
          <FontAwesomeIcon icon={faPlus} size="lg" style={{ color: "black" }} />
        </Button>
      </RosterItem>
    </RosterRow>
  ) : null;
};
PlayerRoster.propTypes = { players: PropTypes.array.isRequired };
