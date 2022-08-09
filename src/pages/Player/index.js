import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import { getPlayer } from "../../state/player/playerActions";

//Styling Components
import Spinner from "../../components/Spinner";
import { Container } from "../../components/Div";
import PlayerStats from "../../containers/PlayerStats";
import PlayerHeader from "../../containers/PlayerHeader";

const index = ({ auth, getPlayer, player: { player, loading } }) => {
  const { id } = useParams();
  useEffect(() => {
    getPlayer(id);
  }, []);

  return (
    <Container>
      <Fragment>
        {player === null || loading ? (
          <Spinner />
        ) : (
          <Fragment>
            <PlayerHeader player={player} />
            <PlayerStats playerInfo={player.fixtures} />
          </Fragment>
        )}
      </Fragment>
    </Container>
  );
};

index.propTypes = {
  getPlayer: PropTypes.func.isRequired,
  player: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ player: state.player, auth: state.auth });

export default connect(mapStateToProps, { getPlayer })(index);
