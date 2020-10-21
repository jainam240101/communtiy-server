/** @format */

import React from "react";
import classes from "./Header.module.css";

interface Props {
  heading: string;
  tagHandler: (tag: any) => void;
}

const Header: React.FC<Props> = ({ heading, tagHandler }) => {
  return (
    <div className={classes.Container}>
      <div className={classes.HeadingContainer}>
        <div className={classes.Heading}>{heading}</div>
        <div className={classes.filterContainer}>
          <p className={classes.filter}>Filter By</p>
          <p className={classes.filter}>Domain</p>
          <select
            onChange={(event) => tagHandler(event.target.value)}
            className={classes.options}>
            <option>All</option>
            <option>Web Development</option>
            <option>Mobile Development</option>
            <option>AR/VR</option>
            <option>Cloud</option>
            <option>Machine Learning</option>
          </select>
          {heading === "Issues" ? null : (
            <div className={classes.techStackContainer}>
              <p className={classes.filter}>Tech Stack</p>
              <select className={classes.options}>
                <option>Web Development</option>
                <option>Mobile Development</option>
                <option>AR/VR</option>
                <option>Cloud</option>
                <option>Machine Learning</option>
              </select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
