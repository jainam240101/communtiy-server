/** @format */

import React from "react";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import {useHistory } from "react-router-dom"

interface Props{
  type: string,
  id: string,
}

const Edit_Delete: React.FC<Props> = ({ type, id }) => {
  const history=useHistory()
  const EditButtonClick = () => {
    console.log(type)
    console.log(id)
    history.push(`/${type}/${id}`)
  }
  return (
    <React.Fragment>
      <Button variant='contained' color='secondary' startIcon={<DeleteIcon />}>
        Delete
      </Button>
      <Button
        onClick={EditButtonClick}
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
