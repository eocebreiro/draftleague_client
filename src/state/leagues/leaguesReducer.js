import {
  GET_LEAGUES,
  LEAGUES_ERROR,
  CLEAR_LEAGUES,
  UPDATE_LEAGUES,
} from "../types";

const initialState = {
  leagues: null,
  loading: true,
  error: {},
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_LEAGUES:
    case UPDATE_LEAGUES:
      return {
        ...state,
        leagues: payload,
        loading: false,
      };
    case LEAGUES_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_LEAGUES:
      return {
        ...state,
        leagues: null,
        loading: false,
      };
    default:
      return state;
  }
}
