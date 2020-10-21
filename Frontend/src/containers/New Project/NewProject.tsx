/** @format */

import React from "react";
import classes from "./NewProject.module.css";
import Logo from "../../assets/Logo.svg";
import Heading from "../../components/Login_SignUp/Heading/Heading";
import Inputs from "../../components/Login_SignUp/Inputs/Inputs";
import Button from "../../components/Login_SignUp/Buttons/Button";
import { useForm } from "../../components/Custom Hooks/useForm";
import Dropdown from "../../components/Login_SignUp/Dropdown/Dropdown";
import Stack from "../../components/Login_SignUp/Stack/Stack";
import { useMutation } from "@apollo/client";
import { NewProjectMutation } from "./NewProjectMutation";
import { useHistory } from "react-router-dom";

const NewProject = () => {
  const [newProject] = useMutation(NewProjectMutation);
  const history = useHistory();
  const [reducerState, dispatch] = useForm({
    Title: "",
    Tag: "",
    Pitch: "",
    Form_Link: "",
    Stack: [],
  });
  const buttonClick = async () => {
    if (
      reducerState.Title.length === 0 ||
      reducerState.Tag.length === 0 ||
      reducerState.Pitch.length === 0 ||
      reducerState.Form_Link.length === 0 ||
      reducerState.Stack.length === 0
    ) {
      alert("No Value Can be Left Empty");
      return;
    }
    const data: any = await newProject({
      variables: {
        title: reducerState.Title,
        definition: reducerState.Pitch,
        formLink: reducerState.Form_Link,
        tag: reducerState.Tag,
        techStack: reducerState.Stack,
      },
    });
    if (data.data.createProject.uniqueid.length === 0) {
      alert("Some Error Occured");
    }
    history.push("/projects");
  };
  return (
    <div className={classes.Container}>
      <div className={classes.logo}>
        <img src={Logo} />
      </div>
      <div className={classes.card}>
        <Heading Heading={"New Project"} />
        <Inputs defaultvalue={""} dispatch={dispatch} name={"Title"} />
        <Dropdown dispatch={dispatch} name={"Tag"} />
        <Inputs
          defaultvalue={""}
          issue_project={true}
          dispatch={dispatch}
          name={"Pitch"}
          description={true}
        />
        <Inputs defaultvalue={""} dispatch={dispatch} name={"Form_Link"} />
        <div className={classes.Stack}>
          <Stack dispatch={dispatch} name={"Stack"} />
        </div>
        <Button
          issue_project={true}
          click={buttonClick}
          name={"Create New Project"}
        />
      </div>
    </div>
  );
};

export default NewProject;
