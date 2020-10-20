/** @format */

import { useQuery } from "@apollo/client";
import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import Page from "../../Layout/Page/Page";
import { GET_ANSWERS } from "./Query";
import classes from "./Answers.module.css";
import AnswersComponent from "../../components/Answers/Answers";

const Answers = () => {
  const history = useHistory();
  const [id, setid] = useState("");
  useEffect(() => {
    setid(history.location.pathname.split("/")[2]);
  }, []);
  const { data, error, loading } = useQuery(GET_ANSWERS, {
    variables: { id: id },
  });
  if (error) {
    return <div>{error}</div>;
  }
  if (loading) {
    return <Loading />;
  }
  console.log(data.issueAnswers);
  if (data.issueAnswers.length === 0) {
    return (
      <Page>
        <div className={classes.noAnswers}> No Answers Found for the Given Issue</div>
      </Page>
    );
  }
  return (
    <Page>
      <div className={classes.Heading}>
        {data.issueAnswers[0].issue.issueName}
        <div className={classes.tag}>{data.issueAnswers[0].issue.tag}</div>
      </div>
      <div className={classes.issue}>{data.issueAnswers[0].issue.issue}</div>
      <div className={classes.AnswersHeading}>Answers</div>
      {data.issueAnswers.map((element: any) => (
        <AnswersComponent
          id={element.id}
          key={element.id}
          answer={element.answer}
          owner={element.answerOwner}
        />
      ))}
    </Page>
  );
};

export default Answers;
