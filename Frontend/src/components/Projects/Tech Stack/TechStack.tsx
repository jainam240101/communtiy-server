/** @format */

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
  customWidth: {
    maxWidth: 300,
    fontSize: 15,
    fontWeight: "bold",
  },
  noMaxWidth: {
    maxWidth: "none",
  },
  text: {
    fontSize: 16,
    fontFamily: "Noto Sans JP",
    fontWeight: 400,
    color: "white",
    letterSpacing: 2,
    
  },
}));

interface props {
  stack: string[];
}

const TechStack: React.FC<props> = ({ stack }) => {
  const classes = useStyles();
  var longText: string = "";
  stack.map((element) => (longText = longText + " " + element+" ,"));
  
  return (
    <div>
      <Tooltip title={longText} classes={{ tooltip: classes.customWidth }}>
        <Button className={classes.text}>Tech Stack</Button>
      </Tooltip>
    </div>
  );
};

export default TechStack;
