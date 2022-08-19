import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  CLEAR_PROFILE,
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  PROFILE_LOADING,
  CLEAR_LEAGUE,
  CLEAR_PLAYERS,
  CLEAR_PLAYER,
  CLEAR_ROSTER,
} from "../types";
const { REACT_APP_APIURL } = process.env;

//Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: CLEAR_LEAGUE });
  dispatch({ type: CLEAR_PLAYERS });
  dispatch({ type: CLEAR_PLAYER });
  dispatch({ type: CLEAR_ROSTER });

  dispatch({ type: PROFILE_LOADING });

  try {
    const res = await axios.get(REACT_APP_APIURL + "/api/profile/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: CLEAR_PROFILE });

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create or update profile
export const createProfile = (formData, edit = false) => async (dispatch) => {
  dispatch({ type: PROFILE_LOADING });

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      process.env.APIURL + "/api/profile",
      formData,
      config
    );
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    //TODO lecture 48 time 5min 30 seconds
  }
};
