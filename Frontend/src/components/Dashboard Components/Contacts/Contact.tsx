/** @format */

import React from "react";
import Buttons from "./Buttons";
import classes from "./Contact.module.css";
const Contact = () => {
  return (
    <div className={classes.Container}>
      <div className={classes.heading}>Contact Information :</div>
      <div>
        <Buttons />
      </div>
    </div>
  );
};

export default Contact;
