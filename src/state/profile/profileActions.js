import axios from "axios";
import { useNavigate } from "react-router-dom";

import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE } from "../types";

//Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create or update profile
export const createProfile = (formData, edit = false) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/profile", formData, config);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    if (!edit) {
      useNavigate("/dashboard");
    }
  } catch (err) {
    //TODO lecture 48 time 5min 30 seconds
  }
};

// Add (create) a league
export const createLeague = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/profile/createleague", formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    useNavigate("/dashboard");
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

    const res = await axios.post("/api/profile/joinleague", formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    useNavigate("/dashboard");
  } catch (err) {
    //TODO lecture 48 time 5min 30 seconds
  }
};
