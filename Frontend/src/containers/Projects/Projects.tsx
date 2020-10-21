/** @format */

import React, { Fragment, useState } from "react";
import Page from "../../Layout/Page/Page";
import { useLazyQuery, useQuery } from "@apollo/client";
import { all_projects, projects_by_tag } from "./Queries";
import classes from "./Projects.module.css";
import Header from "../../components/Headers/Header";
import Loading from "../../components/Loading/Loading";
import Projects from "../../components/Projects/Projects";

const Project = () => {
  const { loading, error, data } = useQuery(all_projects);
  const [getProjects, values] = useLazyQuery(projects_by_tag);
  if (loading) return <Loading />;
  if (error) return <div>Error!!! {error.message}</div>;
  const taghandler = (tag: string) => {
    getProjects({ variables: { tag: tag } });
  };
  if (values.data) {
    if (values.data.projectDisplayTag.length === 0) {
      return (
        <Page>
          <Header tagHandler={taghandler} heading={"Projects"} />
          <div className={classes.notFound}>
            No Projects of this Domain Found
          </div>
        </Page>
      );
    }
    return (
      <Page>
        <Header tagHandler={taghandler} heading={"Projects"} />
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
      </Page>
    );
  }
  return (
    <Page>
      <Header tagHandler={taghandler} heading={"Projects"} />
      {data.projectsInfo.map((element: any) => (
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
    </Page>
  );
};

export default Project;
