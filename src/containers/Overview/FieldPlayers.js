import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

//Styling Components
import P from "../../components/P";
import { PlayerWrapper } from "../../components/Div";
import { Button } from "../../components/Button";

const PlayerRoster = ({ player }) => {
  const { id } = useParams();

  const [show, setShow] = useState(true);

  const onClick = async (e) => {
    setShow(false);
    // deleteFromLineup(id, player.player_id);
  };

  return show ? (
    <PlayerWrapper style={{ color: "white" }}>
      {player.display_name}
    </PlayerWrapper>
  ) : null;
};
PlayerRoster.propTypes = {
  league: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  league: state.league,
});

export default connect(mapStateToProps, {})(PlayerRoster);
