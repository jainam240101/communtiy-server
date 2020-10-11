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
  const ref = useForm({
    Title: "",
    Tag: "",
    Pitch: "",
    Form_Link: "",
    Stack: [],
  });
  const buttonClick = async () => {
    if (
      ref.values.current.Title.length === 0 ||
      ref.values.current.Tag.length === 0 ||
      ref.values.current.Pitch.length === 0 ||
      ref.values.current.Form_Link.length === 0 ||
      ref.values.current.Stack.length === 0
    ) {
      alert("No Value Can be Left Empty");
      return;
    }
    const data: any = await newProject({
      variables: {
        title: ref.values.current.Title,
        definition: ref.values.current.Pitch,
        formLink: ref.values.current.Form_Link,
        tag: ref.values.current.Tag,
        techStack: ref.values.current.Stack,
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
        <Inputs change={ref.handleChange} name={"Title"} />
        <Dropdown change={ref.handleChange} name={"Tag"} />
        <Inputs
          issue_project={true}
          change={ref.handleChange}
          name={"Pitch"}
          description={true}
        />
        <Inputs change={ref.handleChange} name={"Form_Link"} />
        <div className={classes.Stack}>
          <Stack change={ref.handleChange} name={"Stack"} />
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
