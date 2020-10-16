/** @format */

import React from "react";
import classes from "./Header.module.css";

interface Props {
  name: string;
  email: string;
  description: string;
  enrollment: string;
}

const Header: React.FC<Props> = ({ description, email, enrollment, name }) => {
  return (
    <div className={classes.Container}>
      <div className={classes.Heading}>{name}</div>
      <br />
      <div className={classes.Description}>{description}</div>
      <br />
      {enrollment}
    </div>
  );
};

export default Header;
