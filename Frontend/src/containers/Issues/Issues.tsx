/** @format */

import { useLazyQuery, useQuery } from "@apollo/client";
import React from "react";
import classes from "./Issues.module.css";
import Loading from "../../components/Loading/Loading";
import Page from "../../Layout/Page/Page";
import { all_issues, issues_by_tag } from "./Queries";
import IssueComponent from "../.././components/Issues/Issues";
import Header from "../../components/Headers/Header";

const Issues = () => {
  const { loading, error, data } = useQuery(all_issues);
  const [getIssues, values] = useLazyQuery(issues_by_tag);
  if (loading) return <Loading />;
  if (error) return <div>Error!!! {error.message}</div>;
  const taghandler = (tag: any) => {
    getIssues({ variables: { tag: tag } });
  };
  const stackhandler = (stack: any) => {};
  if (values.data) {
    if (values.data.tagIssue.length === 0) {
      return (
        <Page>
          <Header
            stackHandler={stackhandler}
            tagHandler={taghandler}
            heading={"Projects"}
          />
          <div className={classes.notFound}>No Issues of this Domain Found</div>
        </Page>
      );
    }
    return (
      <Page>
        <Header
          stackHandler={stackhandler}
          tagHandler={taghandler}
          heading='Issues'
        />
        {values.data.tagIssue.map((element: any) => (
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
  }
  return (
    <Page>
      <Header
        stackHandler={stackhandler}
        tagHandler={taghandler}
        heading='Issues'
      />
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
