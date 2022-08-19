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
    const res = await axios.get(process.env.APIURL + `/api/league/${leagueId}`);

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

    const res = await axios.post(
      process.env.APIURL + "/api/league/create",
      formData,
      config
    );
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

    const res = await axios.post(
      process.env.APIURL + "/api/league/join",
      formData,
      config
    );
    dispatch({
      type: UPDATE_LEAGUE,
      payload: res.data,
    });
  } catch (err) {
    //TODO lecture 48 time 5min 30 seconds
  }
};

// Check to see if players are locked in a league
export const checkRostersLock = (league_id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.get(
      process.env.APIURL + `/api/league/rosters/lock/check`,
      {
        params: { league_id: league_id },
      }
    );
    dispatch({ type: UPDATE_LEAGUE, payload: res.data });
  } catch (err) {
    dispatch({
      type: LEAGUE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addToLineup = (league_id, player_id) => async (dispatch) => {
  try {
    const res = await axios.post(
      process.env.APIURL + `/api/league/${league_id}/lineup/add/${player_id}`
    );
    await dispatch({
      type: UPDATE_LEAGUE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LEAGUE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const dropFromLineup = (league_id, player_id) => async (dispatch) => {
  try {
    const res = await axios.post(
      process.env.APIURL + `/api/league/${league_id}/lineup/drop/${player_id}`
    );
    await dispatch({
      type: UPDATE_LEAGUE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LEAGUE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
