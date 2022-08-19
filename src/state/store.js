import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import alertReducer from "./alert/alertReducer";
import authReducer from "./auth/authReducer";
import profileReducer from "./profile/profileReducer";
import leagueReducer from "./league/leagueReducer";
import leaguesReducer from "./leagues/leaguesReducer";
import playersReducer from "./players/playersReducer";
import playerReducer from "./player/playerReducer";
import rosterReducer from "./roster/rosterReducer";
import lineupReducer from "./lineup/lineupReducer";
import fixturesReducer from "./fixtures/fixturesReducer";

const preloadedState = {};

const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  profile: profileReducer,
  league: leagueReducer,
  leagues: leaguesReducer,
  players: playersReducer,
  player: playerReducer,
  roster: rosterReducer,
  lineup: lineupReducer,
  fixtures: fixturesReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  preloadedState,
});

export default store;
