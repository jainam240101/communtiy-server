/** @format */

import React from "react";
import Page from "../../Layout/Page/Page";
import { useQuery } from "@apollo/client";
import { all_projects } from "./Queries";
// import classes from "./Project.module.css";
import Header from "../../components/Headers/Header";
import Loading from "../../components/Loading/Loading";
import Projects from "../../components/Projects/Projects";

const Project = () => {
  const { loading, error, data } = useQuery(all_projects);
  if (loading) return <Loading />;
  if (error) return <div>Error!!! {error.message}</div>;
  return (
    <Page>
      <Header />
      {data.projectsInfo.map((element: any) => (
        <Projects
          contact={element.projectOwner}
          description={element.definition}
          totalMembers={element.totalMembers}
          techStack={element.techStack}
          formLink={element.formLink}
        />
      ))}
    </Page>
  );
};

export default Project;
