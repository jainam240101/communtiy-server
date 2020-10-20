/** @format */

import React, { useEffect, useState } from "react";
import classes from "./Information.module.css";
import Switcher from "../Switcher/Switcher";
import { cache } from "../../..";
import { gql } from "@apollo/client";
import { ownedIssues, ownedProjects, issuesAnswered } from "./Queries";
import Projects from "../../Projects/Projects";
import IssueComponent from "../../Issues/Issues";

const Infromation = () => {
  const [controller, setcontroller] = useState("Projects");
  const [content, setcontent] = useState();
  useEffect(() => {
    var ProjectData: any = cache.readQuery({
      query: ownedProjects,
    });
    if (controller === "Projects" && ProjectData !== undefined) {
      var contact = {
        name: ProjectData.me.name,
        email: ProjectData.me.email,
        uniqueid: ProjectData.me.uniqueid,
      };
      var context: any = ProjectData.me.ownedprojects.map((element: any) => (
        <Projects
          key={element.uniqueid}
          title={element.title}
          uniqueid={element.uniqueid}
          contact={contact}
          description={element.definition}
          tag={element.tag}
          techStack={element.techStack}
          formLink={element.formLink}
        />
      ));
      setcontent(context);
    }
    var IssuesData: any = cache.readQuery({
      query: ownedIssues,
    });
    if (controller === "Issues Raised" && IssuesData !== undefined) {
      console.log(IssuesData.me);
      var contact = {
        name: IssuesData.me.name,
        email: IssuesData.me.email,
        uniqueid: IssuesData.me.uniqueid,
      };
      var content: any = IssuesData.me.ownedIssues.map((element: any) => (
        <IssueComponent
          createdAt={element.createdAt}
          uniqueid={element.uniqueid}
          issue={element.issue}
          issueName={element.issueName}
          issueOwner={contact}
          tag={element.tag}
        />
      ));
      setcontent(content);
    }
    var answeredIssues = cache.readQuery({
      query: issuesAnswered,
    });
    if (controller === "Issues Answered" && answeredIssues !== undefined) {
      console.log(answeredIssues);
    }
  }, [controller]);
  const click = (element: string) => {
    setcontroller(element);
  };

  return (
    <div className={classes.Container}>
      <div className={classes.Controller}>
        <Switcher click={click} />
      </div>
      <div>{content}</div>
    </div>
  );
};

export default Infromation;
