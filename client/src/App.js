import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Navbar from "./components/navbar/Navbar";
import TweetList from "./components/tweetList/TweetList";
import "./App.css";
import Profile from "./components/profile/Profile";
import SearchBarComp from "./components/searchBar/SearchBarComp";
import ProfileById from "./components/profile/ProfileById";

const App = () => {
  return (
    <div className="appContainer">
      <Router>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/" exact component={Login} />
          <>
            <Navbar className="navBar" />
            <SearchBarComp className="searchBar" />
            <Route path="/homepage" exact component={TweetList} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/profile-by-id/:_id" exact component={ProfileById} />
          </>
          <Route path="**" exact component={Login} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
