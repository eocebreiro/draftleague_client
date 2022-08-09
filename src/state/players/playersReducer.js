import {
  GET_NEWPLAYERS,
  CLEAR_NEWPLAYERS,
  NEWPLAYERS_ERROR,
  GET_PLAYERS,
  PLAYERS_ERROR,
  CLEAR_PLAYERS,
} from "../types";

const initialState = {
  players: null,
  loading: true,
  error: {},
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_NEWPLAYERS:
    case GET_PLAYERS:
      return {
        ...state,
        players: payload,
        loading: false,
      };

    case NEWPLAYERS_ERROR:
    case PLAYERS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_NEWPLAYERS:
    case CLEAR_PLAYERS:
      return {
        ...state,
        players: null,
        loading: false,
      };
    default:
      return state;
  }
}
