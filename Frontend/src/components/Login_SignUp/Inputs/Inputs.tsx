/** @format */

import React, { useEffect } from "react";
import classes from "./Inputs.module.css";

interface Props {
  name: string;
  description?: boolean;
  issue_project?: boolean;
  password?: boolean;
  propvalue?: string;
  change: (name: string, value: string) => any;
}

const Inputs: React.FC<Props> = ({
  change,
  issue_project,
  propvalue,
  name,
  description,
  password,
}) => {
  console.log("value ",propvalue?.length,"\t",name)
  return (
    <div className={classes.Container}>
      <div className={classes.heading}>{name}</div>
      {description ? (
        <textarea
          onChange={(event) => change(event.target.name, event.target.value)}
          name={name}
          value={propvalue?.length===0?"":propvalue}
          className={classes.textarea}
          style={issue_project ? { width: "51vw", height: "25vh" } : {}}
        />
      ) : (
        <input
          onChange={(event) => change(event.target.name, event.target.value)}
          type={password ? "password" : "text"}
            name={name}
            value={propvalue?.length===0?"":propvalue}
          className={classes.input}
        />
      )}
    </div>
  );
};

export default Inputs;
