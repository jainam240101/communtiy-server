/** @format */

import React from "react";
import classes from "./Dropdown.module.css";

interface Props {
  name: string;
  change: (name: string, value: string) => any;
}

const Dropdown: React.FC<Props> = ({ name, change }) => {
  return (
    <div className={classes.container}>
      <div className={classes.heading}>{name}</div>
      <select
        onChange={(event) => change(event.target.name, event.target.value)}
        name={name}
        className={classes.dropdown}>
        <option disabled selected>
          Select An Option
        </option>
        <option>Web Development</option>
        <option>Mobile Development</option>
        <option>AR/VR</option>
        <option>Cloud</option>
        <option>Machine Learning</option>
      </select>
    </div>
  );
};

export default Dropdown;
