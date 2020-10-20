/** @format */

import { gql } from "@apollo/client";
/** @format */

import React from "react";
import { cache } from "../..";
import { findUniqueId } from "../../Custom Queries/user";
import classes from "./Projects.module.css";
import TechStack from "./Tech Stack/TechStack";
import Button from "@material-ui/core/Button";
import Edit_Delete from "../Edit_Delete/Edit_Delete";
interface Props {
  title: string;
  description: string;
  uniqueid: string;
  tag: string;
  techStack: string[];
  formLink: string;
  contact: {
    name: string;
    email: string;
    uniqueid: string;
  };
}

const Projects: React.FC<Props> = ({
  contact,
  uniqueid,
  description,
  formLink,
  title,
  techStack,
  tag,
}) => {
  const data: any = cache.readQuery({
    query: findUniqueId,
  });
  return (
    <div className={classes.Container}>
      <div className={classes.LeftContainer}>
        <div className={classes.headerContainer}>
          <p className={classes.heading}>{title}</p>
          <div className={classes.tag}>{tag}</div>
        </div>
        <div className={classes.description}>{description}</div>
        <div className={classes.bottomContainer}>
          {data.me.uniqueid === contact.uniqueid ? (
            <Button
              style={{ marginLeft: "20px", marginTop: "17px", height: "5vh" }}
              variant='contained'
              disabled>
              Disabled
            </Button>
          ) : (
            <Button
              style={{ marginLeft: "20px", marginTop: "17px", height: "5vh" }}
              className={classes.btn}
              variant='contained'
              color='primary'>
              Apply
            </Button>
          )}
          <div className={classes.techStackContainer}>
            <TechStack stack={techStack} />
          </div>
          {data.me.uniqueid === contact.uniqueid ? (
            <div className={classes.specials}>
              {<Edit_Delete id={uniqueid} type={"editproject"} />}
            </div>
          ) : null}
        </div>
      </div>
      <div className={classes.rightContainer}>
        <div className={classes.contact}>Contact</div>
        <div className={classes.contactInfo}>
          Name : {contact.name}
          <br />
          Email: {contact.email}
        </div>
      </div>
    </div>
  );
};

export default Projects;
