import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getNewPlayers } from "../../state/players/playersActions";

import NewPlayers from "./NewPlayers";
import Spinner from "../../components/Spinner";

const index = ({
  auth,
  getNewPlayers,
  players,
  leagues: { league, loading },
}) => {
  useEffect(() => {
    getNewPlayers();
  }, []);

  return loading ||
    players.loading ||
    players.players === null ||
    league === null ? (
    <Spinner />
  ) : (
    <Fragment>
      {league.activeWeek ? (
        <NewPlayers players={players.players} />
      ) : league.draftComplete ? (
        "Week in progress: Your games will start next week"
      ) : league.participantsFull ? (
        "Draft in progress"
      ) : (
        "League not full. " +
        league.participants.length +
        "/" +
        league.numOfParticipants +
        " players. Have your friends join. League code: " +
        league.leagueId
      )}
    </Fragment>
  );
};

index.propTypes = {
  getNewPlayers: PropTypes.func.isRequired,
  players: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  players: state.players,
  auth: state.auth,
  leagues: state.league,
});

export default connect(mapStateToProps, { getNewPlayers })(index);
