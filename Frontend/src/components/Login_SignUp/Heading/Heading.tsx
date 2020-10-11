/** @format */

import React from "react";
import classes from "./Heading.module.css";

interface Props {
  Heading: string;
}

const Heading: React.FC<Props> = ({ Heading }) => {
  return <div className={classes.Heading}>{Heading}</div>;
};

export default Heading;
