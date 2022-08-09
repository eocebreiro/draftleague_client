import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import alertReducer from "./alert/alertReducer";
import authReducer from "./auth/authReducer";
import profileReducer from "./profile/profileReducer";
import leagueReducer from "./league/leagueReducer";
import playersReducer from "./players/playersReducer";
import playerReducer from "./player/playerReducer";

const preloadedState = {};

const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  profile: profileReducer,
  league: leagueReducer,
  players: playersReducer,
  player: playerReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  preloadedState,
});

export default store;
