/** @format */

import React from "react";
import classes from "./Dropdown.module.css";

interface Props {
  name: string;
  dispatch?: any;
}

const Dropdown: React.FC<Props> = ({ name, dispatch }) => {
  return (
    <div className={classes.container}>
      <div className={classes.heading}>{name}</div>
      <select
        onChange={(event) =>
          dispatch({
            type: "change",
            name: event.target.name,
            value: event.target.value,
          })
        }
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
