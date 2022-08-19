import axios from "axios";
import { useNavigate } from "react-router-dom";

import { GET_FIXTURES, FIXTURES_ERROR, CLEAR_FIXTURES } from "../types";

const { REACT_APP_APIURL } = process.env;

//Get fixtures by league ID
export const getFixtures = () => async (dispatch) => {
  try {
    const res = await axios.get(REACT_APP_APIURL + `/api/fixtures/`);

    dispatch({
      type: GET_FIXTURES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: FIXTURES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
