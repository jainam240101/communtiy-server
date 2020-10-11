/** @format */

import React, { useEffect } from "react";
import classes from "./Inputs.module.css";

interface Props {
  name: string;
  description?: boolean;
  issue_project?: boolean;
  password?: boolean;
  change: (name: string, value: string) => any;
}

const Inputs: React.FC<Props> = ({
  change,
  issue_project,
  name,
  description,
  password,
}) => {
  return (
    <div className={classes.Container}>
      <div className={classes.heading}>{name}</div>
      {description ? (
        <textarea
          onChange={(event) => change(event.target.name, event.target.value)}
          name={name}
          className={classes.textarea}
          style={issue_project ? { width: "51vw", height: "25vh" } : {}}
        />
      ) : (
        <input
          onChange={(event) => change(event.target.name, event.target.value)}
          type={password ? "password" : "text"}
          name={name}
          className={classes.input}
        />
      )}
    </div>
  );
};

export default Inputs;
