import {
  GET_LEAGUE,
  LEAGUE_ERROR,
  CLEAR_LEAGUE,
  UPDATE_LEAGUE,
} from "../types";

const initialState = {
  league: null,
  loading: true,
  error: {},
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_LEAGUE:
    case UPDATE_LEAGUE:
      return {
        ...state,
        league: payload,
        loading: false,
      };
    case LEAGUE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_LEAGUE:
      return {
        ...state,
        league: null,
        loading: false,
      };
    default:
      return state;
  }
}
