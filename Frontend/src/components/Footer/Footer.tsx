/** @format */

import React from "react";
import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={classes.Copyright}>
      <div className={classes.logo}>LOGO</div>
      <div className={classes.functions}>
        <h3>Functions</h3>
        <ul className={classes.list}>
          <li>Projects</li>
          <li>Threads</li>
        </ul>
      </div>
      <div className={classes.functions}>
        <h3>Terms</h3>
        <ul className={classes.list}>
          <li>Terms Of Use</li>
          <li>Join The Community</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
