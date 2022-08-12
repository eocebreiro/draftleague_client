import axios from "axios";
import { useNavigate } from "react-router-dom";

import { GET_ROSTER, ROSTER_ERROR, CLEAR_ROSTER } from "../types";

//Get a user roster list
export const getRoster = (league_id, player_id) => async (dispatch) => {
  dispatch({
    type: CLEAR_ROSTER,
  });
  try {
    const res = await axios.get(`/api/league/${league_id}/roster/${player_id}`);

    dispatch({
      type: GET_ROSTER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ROSTER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Drop player to team in a league
export const dropPlayer = ({ league_id, player_id }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ league_id });

  try {
    const res = await axios.post(
      `/api/league/player/drop/${player_id}`,
      body,
      config
    );
    dispatch({
      type: GET_ROSTER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ROSTER_ERROR,
    });
  }
};
