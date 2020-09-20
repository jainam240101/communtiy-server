/** @format */

import React from "react";
import classes from "./Feature.module.css";
import Steps from "./Steps/Steps";

interface props {
  information: string[];
  heading: string;
  description: string;
  description2: string;
  svg:any
}

const Feature: React.FC<props> = ({
  heading,
  information,
  description,
  description2,
  svg
}) => {
  return (
    <div className={classes.Container}>
      <div>
        <div className={classes.Heading}>{heading}</div>
        <div className={classes.description}>{description}</div>
        <div className={classes.description2}>{description2}</div>
        <div>
          {information.map((element) => (
            <Steps information={element} />
          ))}
        </div>
      </div>
      <div className={classes.image}>
        <img src={svg} />
      </div>
    </div>
  );
};

export default Feature;
