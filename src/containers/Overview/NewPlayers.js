import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";

//Styling Components
import P from "../../components/P";
import { Div, CenterRow, RowItem } from "../../components/Div";

const NewPlayers = ({ players }) => {
  if (players > 0) {
    const newPlayers = players.map((player) => (
      <CenterRow key={player.player_id}>
        <P color="black">{player.display_name}</P>
        <P color="black">{player.team.name}</P>
        <div style={{ height: "30px" }}>
          <img src={player.image_path} />
        </div>
      </CenterRow>
    ));
    return <Fragment>{newPlayers}</Fragment>;
  } else return <Fragment>No new player this week.</Fragment>;
};
NewPlayers.propTypes = { players: PropTypes.array.isRequired };

export default NewPlayers;
