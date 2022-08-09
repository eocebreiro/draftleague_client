import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  GET_LEAGUE,
  LEAGUE_ERROR,
  CLEAR_LEAGUE,
  UPDATE_LEAGUE,
} from "../types";

//Get leagues by league ID
export const getLeague = (leagueId) => async (dispatch) => {
  dispatch({
    type: CLEAR_LEAGUE,
  });
  try {
    const res = await axios.get(`/api/league/${leagueId}`);

    dispatch({
      type: GET_LEAGUE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LEAGUE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create a league
export const createLeague = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(formData);

    const res = await axios.post("/api/league/create", formData, config);
    await dispatch({
      type: UPDATE_LEAGUE,
      payload: res.data,
    });
  } catch (err) {
    //TODO lecture 48 time 5min 30 seconds
  }
};

// Join a league
export const joinLeague = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/league/join", formData, config);
    dispatch({
      type: UPDATE_LEAGUE,
      payload: res.data,
    });
  } catch (err) {
    //TODO lecture 48 time 5min 30 seconds
  }
};
