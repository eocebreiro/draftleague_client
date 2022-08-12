import { GET_ROSTER, ROSTER_ERROR, CLEAR_ROSTER } from "../types";

const initialState = {
  roster: null,
  loading: true,
  error: {},
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ROSTER:
      return {
        ...state,
        roster: payload,
        loading: false,
      };

    case ROSTER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_ROSTER:
      return {
        ...state,
        roster: null,
        loading: false,
      };
    default:
      return state;
  }
}
