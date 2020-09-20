/** @format */

import React from "react";
import classes from "./Navbar.module.css";
import Logo from "../../assets/Logo.svg";

class Navbar extends React.Component {
  render() {
    return (
      <div className={classes.Container}>
        <div className={classes.logoDiv}>
          <img src={Logo} />
          <p className={classes.logo}>Logo</p>
        </div>
        <div className={classes.components}>
          <div className={classes.links}>Home</div>
          <div className={classes.links}>Projects</div>
          <div className={classes.links}>Issues</div>
          <div className={classes.links}>Community</div>
        </div>
        <div className={classes.buttons}>
          <button className={classes.btn}>Log In</button>
          <button className={classes.btn}>Sign Up</button>
        </div>
      </div>
    );
  }
}

export default Navbar;
