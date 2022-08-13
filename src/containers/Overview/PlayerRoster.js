import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { addToLineup } from "../../state/league/leagueActions";

//Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

//Styling Components
import P from "../../components/P";
import { RosterRow, RosterItem } from "../../components/Div";
import { Button } from "../../components/Button";

const PlayerRoster = ({ player, addToLineup }) => {
  const { id } = useParams();

  const onClick = async (e) => {
    await addToLineup(id, player.player_id);
  };

  return (
    <RosterRow>
      <RosterItem>
        <img src={player.image_path} width="50" height="auto" />
      </RosterItem>
      <RosterItem>
        <span>{player.display_name}</span>
        <span>{player.position}</span>
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
  );
};
PlayerRoster.propTypes = {
  players: PropTypes.array.isRequired,
  addToLineup: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addToLineup })(PlayerRoster);
