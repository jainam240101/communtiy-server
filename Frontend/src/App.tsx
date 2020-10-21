/** @format */

import { gql, useQuery } from "@apollo/client";
/** @format */

import React from "react";
import { Route, Switch } from "react-router-dom";
import { cache } from "./index";
import Homepage from "./containers/Homepage/Homepage";
import Issues from "./containers/Issues/Issues";
import Login from "./containers/LogIn/Login";
import Project from "./containers/Projects/Projects";
import Signup from "./containers/SignUp/SignUp";
import { IS_LOGGED_IN, ME } from "./Custom Queries/user";
import NewIssue from "./containers/New Issue/NewIssue";
import NewProject from "./containers/New Project/NewProject";
import EditIssue from "./containers/Edit Issue/EditIssue";
import Dashboard from "./containers/Dashboard/Dashboard";
import Answers from "./containers/Answers/Answers";
import EditProject from "./containers/Edit Project/EditProject";

const App = () => {
  const { data } = useQuery(ME);
  if (data !== undefined) {
    cache.writeQuery({
      query: IS_LOGGED_IN,
      data: {
        isLoggedIn: !!localStorage.getItem("token"),
        name: data.me.name,
        email: data.me.email,
        enrollment: data.me.enrollment,
        description: data.me.description,
      },
    });
  }
  return (
    <Switch>
      <Route exact path='/' component={Homepage} />
      <Route exact path='/projects' component={Project} />
      <Route exact path='/issues' component={Issues} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/signup' component={Signup} />
      <Route exact path='/newissue' component={NewIssue} />
      <Route exact path='/editissue/:id' component={EditIssue} />
      <Route exact path='/editproject/:id' component={EditProject} />
      <Route exact path='/answers/:id' component={Answers} />
      <Route exact path='/newproject' component={NewProject} />
      <Route exact path='/dashboard' component={Dashboard} />
    </Switch>
  );
};

export default App;
