import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import alertReducer from "./alert/alertReducer";
import authReducer from "./auth/authReducer";
import profileReducer from "./profile/profileReducer";

const preloadedState = {};

const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  profile: profileReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  preloadedState,
});

export default store;
