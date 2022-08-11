import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  GET_LEAGUE,
  LEAGUE_ERROR,
  CLEAR_LEAGUE,
  UPDATE_LEAGUE,
  ADD_PLAYER_SUCCESS,
  ADD_PLAYER_FAIL,
  DROP_PLAYER_SUCCESS,
  DROP_PLAYER_FAIL,
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

// Add player to team in a league
export const addPlayer = ({ league_id, player_id }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ league_id });

  try {
    const res = await axios.post(
      `/api/league/player/add/${player_id}`,
      body,
      config
    );
    dispatch({
      type: ADD_PLAYER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ADD_PLAYER_FAIL,
    });
  }
};

// Add player to team in a league
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
      type: DROP_PLAYER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: DROP_PLAYER_FAIL,
    });
  }
};

// Check to see if players are locked in a league
export const checkRostersLock = (league_id) => async (dispatch) => {
  try {
    console.log("test");
    const res = await axios.get(`/api/league/rosters/lock/check`, {
      params: { league_id: league_id },
    });
    dispatch({ type: UPDATE_LEAGUE, payload: res.data });
  } catch (error) {
    dispatch({
      type: LEAGUE_ERROR,
    });
  }
};
