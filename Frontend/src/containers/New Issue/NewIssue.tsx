/** @format */

import React from "react";
import classes from "./NewIssues.module.css";
import Logo from "../../assets/Logo.svg";
import Heading from "../../components/Login_SignUp/Heading/Heading";
import Inputs from "../../components/Login_SignUp/Inputs/Inputs";
import Button from "../../components/Login_SignUp/Buttons/Button";
import { useForm } from "../../components/Custom Hooks/useForm";
import Dropdown from "../../components/Login_SignUp/Dropdown/Dropdown";
import { useMutation } from "@apollo/client";
import { NewIssueMutation } from "./NewIssueMutation";
import { useHistory } from "react-router-dom";

const NewIssue = () => {
  const [newIssue] = useMutation(NewIssueMutation);
  const history = useHistory();
  const [reducerState, dispatch] = useForm({
    Name: "",
    Tag: "",
    Issue: "",
  });
  const buttonClick = async () => {
    console.log(reducerState.Name);
    console.log(reducerState.Tag);
    console.log(reducerState.Issue);
    if (
      reducerState.Name.length === 0 ||
      reducerState.Tag.length === 0 ||
      reducerState.Issue.length === 0
    ) {
      alert("No Value Can be Left Empty");
      return;
    }
    const data: any = await newIssue({
      variables: {
        issueName: reducerState.Name,
        tag: reducerState.Tag,
        issue: reducerState.Issue,
      },
    });
    if (data.data.createIssue.uniqueid.length === 0) {
      alert("Some Error Occured");
    }
    history.push("/issues");
  };
  return (
    <div className={classes.Container}>
      <div className={classes.logo}>
        <img src={Logo} />
      </div>
      <div className={classes.card}>
        <Heading Heading={"New Issue"} />
        <Inputs dispatch={dispatch} defaultvalue={""} name={"Name"} />
        <Dropdown dispatch={dispatch} name={"Tag"} />
        <Inputs
          issue_project={true}
          defaultvalue={""}
          dispatch={dispatch}
          name={"Issue"}
          description={true}
        />
        <Button
          issue_project={true}
          click={buttonClick}
          name={"Create New Issue"}
        />
      </div>
    </div>
  );
};

export default NewIssue;
