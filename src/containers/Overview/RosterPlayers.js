import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { addToLineup } from "../../state/league/leagueActions";

//Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

//Styling Components
import { RosterRow, RosterItem } from "../../components/Div";
import { Button } from "../../components/Button";

const RosterPlayers = ({ player, addToLineup }) => {
  const { id } = useParams();

  const onClick = async (e) => {
    await addToLineup(id, player.player_id);
  };

  return (
    <RosterRow>
      <Link
        to={"/player/" + player.player_id}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: "black",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <RosterItem>
          <img src={player.image_path} width="50" height="auto" />
        </RosterItem>
        <RosterItem style={{ flex: "1" }}>
          <span>{player.display_name}</span>
          <span>{player.position}</span>
          <span>{player.team.short_code}</span>
        </RosterItem>
      </Link>
      <RosterItem>
        <Button
          onClick={(e) => onClick(player.player_id, e)}
          color={"transparent"}
          type={"icon"}
        >
          <FontAwesomeIcon icon={faPlus} size="lg" style={{ color: "black" }} />
        </Button>
      </RosterItem>
    </RosterRow>
  );
};
RosterPlayers.propTypes = {
  players: PropTypes.array.isRequired,
  addToLineup: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addToLineup })(RosterPlayers);
