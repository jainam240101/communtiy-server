/** @format */

import React, { Component } from "react";
import About from "../../components/About/About";
import Page from "../../Layout/Page/Page";
import classes from "./Homepage.module.css"

class Homepage extends Component {
  render() {
    return (
      <div className={classes.Container}>
        <Page>
          <About />
        </Page>
      </div>
    );
  }
}

export default Homepage;
