/** @format */

import { gql, useMutation } from "@apollo/client";
import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import { cache } from "../..";
import { findUniqueId } from "../../Custom Queries/user";
import Edit_Delete from "../Edit_Delete/Edit_Delete";
import Modal from "../Modal/Modal";
import classes from "./Answers.module.css";
import { editAnswerMutation } from "./Queries";

interface Props {
  id: string;
  answer: string;
  owner: {
    name: string;
    uniqueid: string;
  };
}

const AnswersComponent: React.FC<Props> = ({ answer, owner, id }) => {
  const [deleteanswerhandler, setdeleteanswerhandler] = useState(false);
  const [modalHandler, setmodalHandler] = useState(false);
  const [updateAnswer] = useMutation(editAnswerMutation);
  const [answerContainer, setanswerContainer] = useState(false);
  const [editedAnswer, seteditedAnswer] = useState("");
  const history = useHistory();
  const onChangeHandler = (value: string) => {
    seteditedAnswer(value);
  };
  const submitHandler = () => {
    setmodalHandler(!modalHandler);
  };
  const userDirect = () => {
    history.push(`/user/${owner.uniqueid}`);
  };
  const agreeFunction = async () => {
    setmodalHandler(!modalHandler);
    setanswerContainer(!answerContainer);
    const data: any = await updateAnswer({
      variables: { answerId: id, answer: editedAnswer },
    });
  };
  const disagreeFunction = () => {
    setmodalHandler(!modalHandler);
  };
  const newEdit = () => {
    setanswerContainer(!answerContainer);
  };
  const newDelete = () => {
    setmodalHandler(!modalHandler);
  };
  const deleteAnswer = (id: string) => {
    console.log("delete answer with id ", id);
  };
  var editDeleteButtonContent: any;
  var answerData: any;
  try {
    answerData = cache.readQuery({
      query: findUniqueId,
    });
    editDeleteButtonContent = (
      <Fragment>
        {answerData.me.uniqueid === owner.uniqueid ? (
          <div className={classes.editDelete}>
            <Edit_Delete
              answerEdit={true}
              newDelete={newDelete}
              newEdit={newEdit}
              type={"editissue"}
              id={id}
            />
          </div>
        ) : null}
      </Fragment>
    );
  } catch (error) {}
  return (
    <div className={classes.Container}>
      <div className={classes.answer}>{answer}</div>
      <div className={classes.bottomContainer}>
        <span onClick={userDirect} className={classes.Owner}>
          {owner.name}
        </span>
        Written By:
      </div>
      {answerContainer ? (
        <div className={classes.answercontainer}>
          <textarea
            placeholder='Your Answer'
            value={editedAnswer}
            onChange={(e) => onChangeHandler(e.target.value)}
            className={classes.answertext}
          />
          <br />
          <button onClick={submitHandler} className={classes.submitbtn}>
            Submit
          </button>
        </div>
      ) : null}
      {editDeleteButtonContent}
      {modalHandler ? (
        <Modal
          agreeFunction={agreeFunction}
          disagreeFunction={disagreeFunction}
          title={"Edit the Answer"}
          message='Are you sure that you want to edit these changes as this cannot be undone'
          open={modalHandler}
        />
      ) : null}
    </div>
  );
};
export default AnswersComponent;
