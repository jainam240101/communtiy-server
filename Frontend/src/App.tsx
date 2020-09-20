/** @format */

import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Homepage from "./containers/Homepage/Homepage";
import Project from "./containers/Projects/Projects";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route exact path='/projects' component={Project} />
      </Switch>
    );
  }
}

export default App;
