import { GET_FIXTURES, FIXTURES_ERROR, CLEAR_FIXTURES } from "../types";

const initialState = {
  fixtures: null,
  loading: true,
  error: {},
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_FIXTURES:
      return {
        ...state,
        fixtures: payload,
        loading: false,
      };
    case FIXTURES_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_FIXTURES:
      return {
        ...state,
        fixtures: null,
        loading: false,
      };
    default:
      return state;
  }
}
