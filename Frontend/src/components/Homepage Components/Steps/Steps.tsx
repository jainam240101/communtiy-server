/** @format */

import React from "react";
import classes from "./Steps.module.css";

interface Props{
    information:string
}

const Steps:React.FC<Props> = ({information}) => {
  return (
    <div className={classes.Container}>
      <div className={classes.Information}>
        {information}
      </div>
    </div>
  );
};

export default Steps