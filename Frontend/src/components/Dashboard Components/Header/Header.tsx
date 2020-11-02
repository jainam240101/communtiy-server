/** @format */

import React from "react";
import classes from "./Header.module.css";

interface Props {
  name: string;
  description: string;
}

const Header: React.FC<Props> = ({ description, name }) => {
  return (
    <div className={classes.Container}>
      <div className={classes.Heading}>
        {name}
       
      </div>
      <div className={classes.Description}>{description}</div>
    </div>
  );
};

export default Header;
