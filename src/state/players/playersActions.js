import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  GET_NEWPLAYERS,
  NEWPLAYERS_ERROR,
  CLEAR_NEWPLAYERS,
  GET_PLAYERS,
  CLEAR_PLAYERS,
  PLAYERS_ERROR,
  GET_PLAYER,
  PLAYER_ERROR,
  CLEAR_PLAYER,
} from "../types";

//Get new players list
export const getNewPlayers = () => async (dispatch) => {
  dispatch({
    type: CLEAR_NEWPLAYERS,
  });
  try {
    const res = await axios.get(`/api/players/new`);

    dispatch({
      type: GET_NEWPLAYERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: NEWPLAYERS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get players list
export const getPlayers = () => async (dispatch) => {
  dispatch({
    type: CLEAR_PLAYERS,
  });
  try {
    const res = await axios.get(`/api/players/`);

    dispatch({
      type: GET_PLAYERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PLAYERS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
