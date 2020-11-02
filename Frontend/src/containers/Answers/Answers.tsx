/** @format */

import { useMutation, useQuery } from "@apollo/client";
import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import Page from "../../Layout/Page/Page";
import { createAnswerMutation, GET_ANSWERS, loggedInQuery } from "./Query";
import classes from "./Answers.module.css";
import AnswersComponent from "../../components/Answers/Answers";
import { cache } from "../..";

const Answers = () => {
  const history = useHistory();
  var newAnswerContent: any;
  var loggedIn: any;
  try {
    loggedIn = cache.readQuery({ query: loggedInQuery });
    newAnswerContent = (
      <Fragment>
        {loggedIn.me.uniqueid ? (
          <div className={classes.btnShift}>
          <button
            className={classes.submitbtn}
            style={{ backgroundColor: "#0984e3" }}
            onClick={() => setanswerContainer(!answerContainer)}>
            Do you want to write one
          </button>

          </div>
        ) : null}
      </Fragment>
    );
  } catch (error) {}
  const [createAnswer] = useMutation(createAnswerMutation);
  const [id, setid] = useState("");
  const [answer, setanswer] = useState("");
  const [answerContainer, setanswerContainer] = useState(false);
  useEffect(() => {
    setid(history.location.pathname.split("/")[2]);
  }, []);
  const { data, error, loading } = useQuery(GET_ANSWERS, {
    variables: { id: id },
  });
  const onChangeHandler = (value: string) => {
    setanswer(value);
  };
  const submitHandler = async () => {
    const mutationData: any = await createAnswer({
      variables: { issueid: id, answer: answer },
    });
    if (mutationData.data) {
      window.location.reload();
    }
  };
  if (error) {
    return <div>{error}</div>;
  }
  if (loading) {
    return <Loading />;
  }
  if (data.issueAnswers.length === 0) {
    return (
      <Page>
        <div className={classes.noAnswers}>
          {" "}
          No Answers Found for the Given Issue
          <br />
          {newAnswerContent}
          {answerContainer ? (
            <div className={classes.answercontainer}>
              <textarea
                placeholder='Your Answer'
                value={answer}
                onChange={(e) => onChangeHandler(e.target.value)}
                className={classes.answertext}
              />
              <br />
              <button onClick={submitHandler} className={classes.submitbtn}>
                Submit
              </button>
            </div>
          ) : null}
        </div>
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
      {newAnswerContent}
      {answerContainer ? (
        <div className={classes.answercontainer}>
          <textarea
            placeholder='Your Answer'
            value={answer}
            onChange={(e) => onChangeHandler(e.target.value)}
            className={classes.answertext}
          />
          <br />
          <button onClick={submitHandler} className={classes.submitbtn}>
            Submit
          </button>
        </div>
      ) : null}
    </Page>
  );
};

export default Answers;
