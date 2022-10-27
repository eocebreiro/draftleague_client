import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//Redux
import { Provider } from "react-redux";
import store from "./state/store";
import { loadUser } from "./state/auth/authActions";
import setAuthToken from "./utils/setAuthToken";
import GlobalStyle from "./components/GlobalStyle";
import PrivateRoute from "./components/PrivateRoute";

// Style
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Old style
import EditProfile from "./pages/EditProfile";
import League from "./pages/League";
import Player from "./pages/Player";
import LeagueFixture from "./pages/LeagueFixture";

// Layout
import Navbar from "./Layout/Navbar";
import Landing from "./Layout/Landing";
import Register from "./Layout/Register";
import Login from "./Layout/Login";
import Dashboard from "./Layout/Dashboard";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <GlobalStyle />
        <Navbar />
        <Routes>
          <Route exact path="/about" />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/player/:id/" element={<Player />} />
          <Route
            exact
            path="/league/:id/schedule/:fixture_id"
            element={<LeagueFixture />}
          />
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
            path="/league/:id/*"
            element={<PrivateRoute component={League} />}
          />

          <Route exact path="/" element={<Landing />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
