import axios from "axios";
import { useNavigate } from "react-router-dom";

import { GET_PLAYER, PLAYER_ERROR, CLEAR_PLAYER } from "../types";

//Get player by ID
export const getPlayer = (playerId) => async (dispatch) => {
  dispatch({
    type: CLEAR_PLAYER,
  });
  try {
    const res = await axios.get(process.env.APIURL + `/api/player/${playerId}`);

    dispatch({
      type: GET_PLAYER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PLAYER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
