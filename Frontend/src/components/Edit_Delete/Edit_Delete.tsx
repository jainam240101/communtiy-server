/** @format */

import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useHistory } from "react-router-dom";
import Modal from "../Modal/Modal";
import { deleteProjectMutation, deleteIssueMutation } from "./Queries";
import { useMutation } from "@apollo/client";

interface Props {
  type: string;
  id: string;
  answerEdit?: boolean;
  newEdit?: () => void;
  newDelete?: () => void;
}

const Edit_Delete: React.FC<Props> = ({
  type,
  id,
  answerEdit,
  newDelete,
  newEdit,
}) => {
  var [deleteProject, projectdata] = useMutation(deleteProjectMutation);
  var [deleteIssue, issuedata] = useMutation(deleteIssueMutation);
  const [modalhandler, setmodalhandler] = useState(false);
  const history = useHistory();
  const EditButtonClick = () => {
    history.push(`/${type}/${id}`);
  };
  const openModal = () => {
    setmodalhandler(!modalhandler);
  };
  const agreeFunction = () => {
    if (type === "editproject") {
      deleteProject({ variables: { id: id } });
      if (projectdata.error === undefined) {
        setmodalhandler(!modalhandler);
        window.location.reload();
      }
    }
    if (type === "editissue") {
      deleteIssue({ variables: { id: id } });
      if (issuedata.error === undefined) {
        setmodalhandler(!modalhandler);
        window.location.reload();
      }
    }
  };
  const disagreeFunction = () => {
    setmodalhandler(!modalhandler);
  };
  return (
    <React.Fragment>
      <Button
        variant='contained'
        color='secondary'
        onClick={answerEdit ? newDelete : openModal}
        startIcon={<DeleteIcon />}>
        Delete
      </Button>
      {modalhandler ? (
        <Modal
          agreeFunction={agreeFunction}
          disagreeFunction={disagreeFunction}
          title={"Delete"}
          message='Are you sure that you want to delete it as this cannot be undone'
          open={modalhandler}
        />
      ) : null}
      <Button
        onClick={answerEdit ? newEdit : EditButtonClick}
        style={{ marginLeft: "5px" }}
        startIcon={<EditIcon />}
        variant='contained'
        color='primary'>
        Edit
      </Button>
    </React.Fragment>
  );
};

export default Edit_Delete;
