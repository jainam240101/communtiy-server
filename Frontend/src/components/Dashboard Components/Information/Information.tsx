/** @format */

import React, { Fragment, useEffect, useState } from "react";
import classes from "./Information.module.css";
import Switcher from "../Switcher/Switcher";
import Projects from "../../Projects/Projects";
import IssueComponent from "../../Issues/Issues";
import { Doughnut } from "@reactchartjs/react-chart.js";
import AnswersComponent from "../../Answers/Answers";

interface Props {
  ownedProjects: any[];
  ownedIssues: any[];
  issueAnswered: any[];
  name: any;
  email: any;
  uniqueid: any;
}

const Infromation: React.FC<Props> = ({
  issueAnswered,
  ownedIssues,
  ownedProjects,
  name,
  email,
  uniqueid,
}) => {
  const [controller, setcontroller] = useState("Projects");
  const [content, setcontent] = useState();
  useEffect(() => {
    var ProjectData: any = ownedProjects;
    if (controller === "Projects" && ProjectData !== undefined) {
      var contact = {
        name: name,
        email: email,
        uniqueid: uniqueid,
      };
      var context: any = ProjectData.map((element: any) => (
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
    var IssuesData: any = ownedIssues;
    if (controller === "Issues Raised" && IssuesData !== undefined) {
      var contact = {
        name: name,
        email: email,
        uniqueid: uniqueid,
      };
      var content: any = IssuesData.map((element: any) => (
        <IssueComponent
          key={element.createdAt}
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
    var answeredIssues: any = issueAnswered;
    if (controller === "Issues Answered" && answeredIssues !== undefined) {
      if (answeredIssues.length === 0) {
        var content: any = (
          <div style={{ backgroundColor: "blue" }}>
            <h1>No Issues Have Been Answered by You</h1>
          </div>
        );
        setcontent(content);
      }
      console.log(answeredIssues);
      var content: any = (
        <Fragment>
          {answeredIssues.map((element: any, index: number) => (
            <AnswersComponent
              key={index}
              id={element.issueId}
              answer={element.answer}
              owner={{
                name: name,
                uniqueid: uniqueid,
              }}
            />
          ))}
        </Fragment>
      );
      setcontent(content);
    }
    if (controller === "Stats" && answeredIssues !== undefined) {
      const issueData: any = {
        labels: ["Issues Raised", "Issues Answered"],
        datasets: [
          {
            data: [ownedIssues.length, issueAnswered.length],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
            ],
            borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
            borderWidth: 1,
          },
        ],
      };
      var content: any = (
        <div>
          <div>Issues Stats</div>
          <Doughnut height={100} type={"any"} data={issueData} />
          <br />
        </div>
      );
      setcontent(content);
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
