/** @format */

import React from "react";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <div className={classes.Container}>
      <div className={classes.HeadingContainer}>
        <div className={classes.Heading}>Projects</div>
        <div className={classes.filterContainer}>
          <p className={classes.filter}>Filter By</p>
          <p className={classes.filter}>Domain</p>
          <select className={classes.options}>
            <option>Web Technologies</option>
            <option>Mobile Technologies</option>
            <option>AR/VR</option>
            <option>Cloud</option>
            <option>Machine Learning</option>
          </select>
          <p className={classes.filter}>Tech Stack</p>
          <select className={classes.options}>
            <option>Web Technologies</option>
            <option>Mobile Technologies</option>
            <option>AR/VR</option>
            <option>Cloud</option>
            <option>Machine Learning</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Header;
