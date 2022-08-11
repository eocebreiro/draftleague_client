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
    case ADD_PLAYER_SUCCESS:
    case DROP_PLAYER_SUCCESS:
      return {
        ...state,
        league: payload,
        loading: false,
      };
    case LEAGUE_ERROR:
    case ADD_PLAYER_FAIL:
    case DROP_PLAYER_FAIL:
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
