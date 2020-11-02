/** @format */

import React, { useEffect, useRef, useState } from "react";
import Page from "../../Layout/Page/Page";
import { useLazyQuery, useQuery } from "@apollo/client";
import { all_projects, projects_by_tag } from "./Queries";
import classes from "./Projects.module.css";
import Header from "../../components/Headers/Header";
import Loading from "../../components/Loading/Loading";
import Projects from "../../components/Projects/Projects";
import Pagination from "@material-ui/lab/Pagination/Pagination";
import { CollectionsBookmark } from "@material-ui/icons";
import TechStack from "../../components/Projects/Tech Stack/TechStack";

const Project = () => {
  const [getProjects, values] = useLazyQuery(projects_by_tag);
  const [page, setpage] = useState(0);
  const [currentPage, setcurrentPage] = useState(1);
  const currentTag = useRef<String>("All");
  const content = useRef<any[]>([]);
  const [projectsData, projectData] = useLazyQuery(all_projects);
  useEffect(() => {
    projectsData();
  }, []);

  const paginationEvent = (event: any, value: number) => {
    setcurrentPage(value);
  };

  if (projectData.error) return <div>Error!!! {projectData.error.message}</div>;
  const taghandler = (tag: string) => {
    currentTag.current = tag;
    getProjects({ variables: { tag: tag, techStack: "" } });
  };
  const techStackhandler = (techStack: string) => {
    console.log(techStack, "\t", currentTag.current);
    getProjects({
      variables: { tag: currentTag.current, techStack: techStack },
    });
  };
  if (values.data) {
    console.log(values.data);
    if (values.data.projectDisplayTag.length === 0) {
      return (
        <Page>
          <Header
            stackHandler={techStackhandler}
            tagHandler={taghandler}
            heading={"Projects"}
          />
          <div className={classes.notFound}>
            No Projects of this Domain Found
          </div>
        </Page>
      );
    }
    return (
      <Page>
        <Header
          stackHandler={techStackhandler}
          tagHandler={taghandler}
          heading={"Projects"}
        />
        {values.data.projectDisplayTag.map((element: any) => (
          <Projects
            uniqueid={element.uniqueid}
            key={element.uniqueid}
            title={element.title}
            contact={element.projectOwner}
            description={element.definition}
            tag={element.tag}
            techStack={element.techStack}
            formLink={element.formLink}
          />
        ))}
        <Pagination
          onChange={paginationEvent}
          defaultValue={currentPage}
          count={page}
          showFirstButton
          showLastButton
        />
      </Page>
    );
  }
  if (projectData.data) {
    var roundOfPage: number = Number(
      (projectData.data.projectsInfo.length / 5).toFixed(0)
    );
    var finalPages: number = roundOfPage + 1;
    if (page === 0) setpage(finalPages);
    var allData: any[] = [],
      temp: any[] = [];
    for (var i = 0; i < projectData.data.projectsInfo.length; i++) {
      if (i === 5) {
        allData.push(temp);
        temp = [];
      }
      temp.push(projectData.data.projectsInfo[i]);
    }
    allData.push(temp);
    content.current = allData;
    return (
      <Page>
        <Header
          stackHandler={techStackhandler}
          tagHandler={taghandler}
          heading={"Projects"}
        />
        {content.current[currentPage - 1].map((element: any) => (
          <Projects
            uniqueid={element.uniqueid}
            key={element.uniqueid}
            title={element.title}
            contact={element.projectOwner}
            description={element.definition}
            tag={element.tag}
            techStack={element.techStack}
            formLink={element.formLink}
          />
        ))}
        <div className={classes.pagination}>
          <Pagination
            onChange={paginationEvent}
            defaultValue={currentPage}
            count={page}
            showFirstButton
            showLastButton
          />
        </div>
      </Page>
    );
  }
  return <Loading />;
};

export default Project;
