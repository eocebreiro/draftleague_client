import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getPlayers } from "../../state/players/playersActions";
import { getTeamNames } from "../../utils/getTeamNames";
//Styling Components
import Spinner from "../../components/Spinner";
import PlayerTable from "./PlayerTable";

const index = ({
  league: { league },
  getPlayers,
  players: { players, loading },
}) => {
  const [data, setData] = useState({
    team: "All Clubs",
    position: "All Positions",
  });

  const { team, position } = data;

  useEffect(() => {
    getPlayers();
  }, [team, position]);

  // Position: Create the options for the dropdown menu
  const positionList = [
    "All Positions",
    "Goalkeeper",
    "Defender",
    "Midfielder",
    "Forward",
  ];
  const positionOptions = [];
  for (let i = 0; i < positionList.length; i++) {
    if (positionList[i] === position) {
      positionOptions.push(
        <option value={positionList[i]} selected>
          {positionList[i]}
        </option>
      );
    } else {
      positionOptions.push(
        <option value={positionList[i]}>{positionList[i]}</option>
      );
    }
  }

  // Team: Create the options for the dropdown menu
  const teamList = getTeamNames();
  const teamOptions = [];

  teamOptions.push(<option value="All Clubs">All Clubs</option>);
  for (let i = 0; i < teamList.length; i++) {
    if (teamList[i] === team) {
      teamOptions.push(
        <option value={teamList[i]} selected>
          {teamList[i]}
        </option>
      );
    } else {
      teamOptions.push(<option value={teamList[i]}>{teamList[i]}</option>);
    }
  }

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return loading || players === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <select name="position" onChange={(e) => onChange(e)}>
        {positionOptions}
      </select>
      <select name="team" onChange={(e) => onChange(e)}>
        {teamOptions}
      </select>
      <PlayerTable
        position={position}
        team={team}
        league={league}
      ></PlayerTable>
    </Fragment>
  );
};

index.propTypes = {
  getPlayers: PropTypes.func.isRequired,
  players: PropTypes.object.isRequired,
  league: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  players: state.players,
  league: state.league,
  auth: state.auth,
});

export default connect(mapStateToProps, { getPlayers })(index);
