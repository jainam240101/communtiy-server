/** @format */

import React from "react";
import classes from "./Answers.module.css"

interface Props {
  id: string;
  answer: string; 
  contact: {
    name: string;
    uniqueid: string;
  };
}

const Answers:React.FC<Props> = ({answer,contact,id}) => {
    return <div className={classes.Container}> 
      
  </div>;
};
export default Answers;
