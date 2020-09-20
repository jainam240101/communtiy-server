/** @format */

import React from "react";
import classes from "./Projects.module.css";

interface Props {
  description: string;
  totalMembers: number;
  techStack: string[];
  formLink: string;
  contact: {
    name: string;
    email: string;
  };
}

const Projects: React.FC<Props> = ({
  contact,
  description,
  formLink,
  techStack,
  totalMembers,
}) => {
  console.log(contact);
  console.log(formLink);
  console.log(techStack);
  console.log(totalMembers);
  return (
    <div className={classes.Container}>
      <div className={classes.LeftContainer}>
        <p className={classes.heading}>{description}</p>
        <div>
          
        </div>
      </div>
    </div>
  );
};

export default Projects;
