/** @format */

import React, { useEffect, useReducer, useState } from "react";
import classes from "./EditProject.module.css";
import Logo from "../../assets/Logo.svg";
import Heading from "../../components/Login_SignUp/Heading/Heading";
import Inputs from "../../components/Login_SignUp/Inputs/Inputs";
import Button from "../../components/Login_SignUp/Buttons/Button";
import Dropdown from "../../components/Login_SignUp/Dropdown/Dropdown";
import { useHistory } from "react-router-dom";
import { projctsInfo } from "./EditProjectQueries";
import Loading from "../../components/Loading/Loading";
import { useForm } from "../../components/Custom Hooks/useForm";
import { useQuery } from "@apollo/client";
import Stack from "../../components/Login_SignUp/Stack/Stack";

const EditProject = () => {
  const history = useHistory();
  const [id, setid] = useState("");
  //   const [updateIssue] = useMutation(updateIssueMutation);
  const [dispatched, setdispatched] = useState(false);
  const [reducerState, dispatch] = useForm({
    Title: "",
    Definition: "",
    FormLink: "",
    Tag: "",
    TechStack: "",
  });
  useEffect(() => {
    setid(history.location.pathname.split("/")[2]);
  }, []);
  const { error, data, loading } = useQuery(projctsInfo, {
    variables: { id },
  });
  if (data === undefined && loading) {
    return <Loading />;
  }
  if (error) return <div>Error!!! {error.message}</div>;
  const buttonClick = async () => {
    console.log("Button Clicked");
    if (reducerState.Tag.length === 0 || reducerState.TechStack.length === 0) {
      alert("Please select the Tag of the Issue");
      return;
    }
    // console.log(id);
    // const data: any = await updateIssue({
    //   variables: {
    //     uniqueId: id,
    //     issueName: reducerState.Name,
    //     tag: reducerState.Tag,
    //     issue: reducerState.Issue,
    //   },
    // });
    // if (!data) {
    //   console.log("Chill Nahi hein ");
    // }
    // history.push("/issues");
  };
  if (!dispatched) {
    dispatch({
      type: "editProjectInititalState",
      values: {
        Title: data.projectsInfo[0].title,
        Definition: data.projectsInfo[0].definition,
        FormLink: data.projectsInfo[0].formLink,
        Tag: "",
        TechStack: [],
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
          defaultvalue={reducerState.Title}
          name={"Title"}
          dispatch={dispatch}
        />
        <Inputs
          issue_project={true}
          dispatch={dispatch}
          defaultvalue={reducerState.Definition}
          name={"Definition"}
          description={true}
        />
        <Inputs
          issue_project={true}
          dispatch={dispatch}
          defaultvalue={reducerState.FormLink}
          name={"FormLink"}
        />
        <Dropdown dispatch={dispatch} name={"Tag"} />
        <div className={classes.Stack}>
          <Stack dispatch={dispatch} name={"Stack"} />
        </div>
        <Button issue_project={true} click={buttonClick} name={"KW"} />
      </div>
    </div>
  );
};

export default EditProject;
