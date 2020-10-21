/** @format */

import React, { useEffect, useState } from "react";
import classes from "./Inputs.module.css";

interface Props {
  name: string;
  description?: boolean;
  issue_project?: boolean;
  password?: boolean;
  defaultvalue: string;
  dispatch: any;
}

const Inputs: React.FC<Props> = ({
  issue_project,
  name,
  description,
  dispatch,
  defaultvalue,
  password,
}) => {
  const [value, setvalue] = useState("");
  useEffect(() => {
    setvalue(defaultvalue);
  }, []);
  const handleChange = (name: string, value: string) => {
    setvalue(value);
    dispatch({ type: "change", name: name, value: value });
  };
  return (
    <div className={classes.Container}>
      <div className={classes.heading}>{name}</div>
      {description ? (
        <textarea
          onChange={(event) =>
            handleChange(event.target.name, event.target.value)
          }
          name={name}
          value={value}
          className={classes.textarea}
          style={issue_project ? { width: "51vw", height: "25vh" } : {}}
        />
      ) : (
        <input
          onChange={(event) =>
            handleChange(event.target.name, event.target.value)
          }
          type={password ? "password" : "text"}
          name={name}
          value={value}
          className={classes.input}
        />
      )}
    </div>
  );
};

export default Inputs;

// (event) => change(event.target.name, event.target.value);
