/** @format */

import React from "react";
import classes from "./Projects.module.css";
import TechStack from "./Tech Stack/TechStack";

interface Props {
  title: string;
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
  title,
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
        <p className={classes.heading}>{title}</p>
        <div className={classes.description}>{description}</div>
        <div className={classes.bottomContainer}>
          <button className={classes.applyBtn}>Apply</button>
          <div className={classes.techStackContainer}>
            <TechStack stack={techStack} />
          </div>
        </div>
      </div>
      <div className={classes.rightContainer}>
        <div className={classes.contact}>Contact</div>
        <div className={classes.contactInfo}>
          Name : {contact.name}
          <br/>
          Email: {contact.email}
        </div>
      </div>
    </div>
  );
};

export default Projects;
