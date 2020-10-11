/** @format */

import React from "react";
import classes from "./Button.module.css";

interface Props {
  name: string;
  issue_project?: boolean;
  click: () => void;
}

const Button: React.FC<Props> = ({ issue_project, click, name }) => {
  return (
    <div className={classes.Container}>
      <button
        onClick={click}
        className={classes.Button}
        style={issue_project ? {marginLeft:"27%"} : {}}>
        {name}
      </button>
    </div>
  );
};

export default Button;
