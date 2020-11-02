/** @format */

import React, { useRef, useState } from "react";
import classes from "./EditUser.module.css";
import Logo from "../../assets/Logo.svg";
import Heading from "../../components/Login_SignUp/Heading/Heading";
import Inputs from "../../components/Login_SignUp/Inputs/Inputs";
import Button from "../../components/Login_SignUp/Buttons/Button";
import { useHistory } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { useForm } from "../../components/Custom Hooks/useForm";
import { cache } from "../..";
import { edituserMutation, getDataFromCache } from "./Queriess";
import Modal from "../../components/Modal/Modal";
import { useMutation } from "@apollo/client";

const EditUser = () => {
  const data: any = cache.readQuery({ query: getDataFromCache });
  const history = useHistory();
  const [modalhandler, setmodalhandler] = useState(false);
  const [updateUser] = useMutation(edituserMutation);
  const [dispatched, setdispatched] = useState(false);
  const [reducerState, dispatch] = useForm({
    Description: "",
    Email: "",
    Enrollment: "",
    Password: "",
  });
  const agreeFunction = () => {
    var newValues: any = {};
    // const data: any = updateUser({
    //   variables: {
    //     email: reducerState.Email,
    //     description: reducerState.Email,
    //     enrollment: reducerState.Enrollment,
    //   },
    // });
    console.log("Reducer State", reducerState);
    setmodalhandler(!modalhandler);
  };
  const disagreeFunction = () => {
    console.log("Disgree");
    setmodalhandler(!modalhandler);
  };
  if (data) {
    if (data.error) return <div>Error!!!</div>;
    const buttonClick = async () => {
      setmodalhandler(!modalhandler);
    };
    if (!dispatched) {
      dispatch({
        type: "edituserInitialState",
        values: {
          Description: data.me.description,
          Password: data.me.password,
        },
      });
      setdispatched(true);
    }
    return (
      <div className={classes.Container}>
        <div className={classes.logo}>
          <img src={Logo} />
        </div>
        <div className={classes.card}>
          <Heading Heading={"New Issue"} />
          <Inputs
            issue_project={true}
            dispatch={dispatch}
            defaultvalue={reducerState.Description}
            name={"Description"}
            description={true}
          />
          <Button
            issue_project={true}
            click={buttonClick}
            name={"Save the User"}
          />
        </div>
        {modalhandler ? (
          <Modal
            agreeFunction={agreeFunction}
            disagreeFunction={disagreeFunction}
            title={"Edit the User"}
            message='Are you sure that you want to edit these changes as this cannot be undone'
            open={modalhandler}
          />
        ) : null}
      </div>
    );
  }
  return <Loading />;
};

export default EditUser;
