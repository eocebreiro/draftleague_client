import { CLEAR_LINEUP, GET_LINEUP, LINEUP_ERROR } from "../types";

const initialState = {
  lineup: null,
  loading: true,
  error: {},
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_LINEUP:
      return {
        ...state,
        lineup: payload,
        loading: false,
      };

    case LINEUP_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_LINEUP:
      return {
        ...state,
        lineup: null,
        loading: false,
      };
    default:
      return state;
  }
}
