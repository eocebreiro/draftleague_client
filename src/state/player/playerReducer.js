import { GET_PLAYER, PLAYER_ERROR, CLEAR_PLAYER } from "../types";

const initialState = {
  player: null,
  loading: true,
  error: {},
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PLAYER:
      return {
        ...state,
        player: payload,
        loading: false,
      };
    case CLEAR_PLAYER:
      return {
        ...state,
        player: null,
        loading: false,
      };
    case PLAYER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
}
