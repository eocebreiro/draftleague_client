import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import GlobalStyle from "./components/GlobalStyle";

import Navbar from "./containers/Navbar";
import Landing from "./containers/Landing";
import Register from "./containers/Register";
import Login from "./containers/Login";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./containers/Dashboard";
import EditProfile from "./containers/EditProfile";
import CreateLeague from "./containers/CreateLeague";
import JoinLeague from "./containers/JoinLeague";

//Redux
import { Provider } from "react-redux";
import store from "./state/store";
import { loadUser } from "./state/auth/authActions";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    console.log("test");
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <GlobalStyle />
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/about" />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route
            exact
            path="/dashboard"
            element={<PrivateRoute component={Dashboard} />}
          />
          <Route
            exact
            path="/edit-profile"
            element={<PrivateRoute component={EditProfile} />}
          />
          <Route
            exact
            path="/create-league"
            element={<PrivateRoute component={CreateLeague} />}
          />
          <Route
            exact
            path="/join-league"
            element={<PrivateRoute component={JoinLeague} />}
          />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
