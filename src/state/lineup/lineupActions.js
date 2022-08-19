import axios from "axios";
import { CLEAR_LINEUP, GET_LINEUP, LINEUP_ERROR } from "../types";

//Get a user's lineup for the active week
export const getLineup = (league_id, user_id) => async (dispatch) => {
  try {
    const res = await axios.get(
      REACT_APP_APIURL + `/api/league/${league_id}/lineup/${user_id}`
    );

    dispatch({
      type: GET_LINEUP,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LINEUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
