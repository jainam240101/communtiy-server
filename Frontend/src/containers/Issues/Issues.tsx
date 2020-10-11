/** @format */

import { useQuery } from "@apollo/client";
import React from "react";
import Loading from "../../components/Loading/Loading";
import Page from "../../Layout/Page/Page";
import { all_issues } from "./Queries";
import IssueComponent from "../.././components/Issues/Issues";
import Header from "../../components/Headers/Header";

const Issues = () => {
  const { loading, error, data } = useQuery(all_issues);
  if (loading) return <Loading />;
  if (error) return <div>Error!!! {error.message}</div>;

  return (
    <Page>
      <Header heading='Issues' />
      {data.issuesInfo.map((element: any) => (
        <IssueComponent
          key={element.uniqueid}
          issueName={element.issueName}
          issue={element.issue}
          tag={element.tag}
          uniqueid={element.uniqueid}
          createdAt={element.createdAt}
          issueOwner={element.issueOwner}
        />
      ))}
    </Page>
  );
};

export default Issues;
