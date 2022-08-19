import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  GET_LEAGUES,
  LEAGUES_ERROR,
  CLEAR_LEAGUES,
  UPDATE_LEAGUES,
} from "../types";

//Get all leagues that the user is in
export const getLeagues = (userId) => async (dispatch) => {
  dispatch({
    type: CLEAR_LEAGUES,
  });

  try {
    const res = await axios.get(`/api/leagues/${userId}`);

    dispatch({
      type: GET_LEAGUES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LEAGUES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
