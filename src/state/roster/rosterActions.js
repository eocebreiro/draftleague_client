import axios from "axios";
import { useNavigate } from "react-router-dom";

import { GET_ROSTER, ROSTER_ERROR, CLEAR_ROSTER } from "../types";
const { REACT_APP_APIURL } = process.env;

//Get a user roster list
export const getRoster = (league_id, player_id) => async (dispatch) => {
  dispatch({
    type: CLEAR_ROSTER,
  });
  try {
    const res = await axios.get(
      REACT_APP_APIURL + `/api/league/${league_id}/roster/${player_id}`
    );

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

// Drop (delete) player from a team
export const dropPlayer = ({ league_id, player_id }) => async (dispatch) => {
  try {
    const res = await axios.post(
      process.env.APIURL + `/api/league/${league_id}/roster/drop/${player_id}`
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
