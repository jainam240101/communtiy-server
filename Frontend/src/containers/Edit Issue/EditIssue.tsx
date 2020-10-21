/** @format */

import React, { useEffect, useReducer, useState } from "react";
import classes from "./EditIssue.module.css";
import Logo from "../../assets/Logo.svg";
import Heading from "../../components/Login_SignUp/Heading/Heading";
import Inputs from "../../components/Login_SignUp/Inputs/Inputs";
import Button from "../../components/Login_SignUp/Buttons/Button";
import Dropdown from "../../components/Login_SignUp/Dropdown/Dropdown";
import { useHistory } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { IssueInfo, updateIssueMutation } from "./EditIssueQuery";
import Loading from "../../components/Loading/Loading";
import { useForm } from "../../components/Custom Hooks/useForm";

const EditIssue = () => {
  const history = useHistory();
  const [id, setid] = useState("");
  const [updateIssue] = useMutation(updateIssueMutation);
  const [dispatched, setdispatched] = useState(false);
  const [reducerState, dispatch] = useForm({
    Name: "",
    Issue: "",
    Tag: "",
  });
  useEffect(() => {
    setid(history.location.pathname.split("/")[2]);
  }, []);
  const { error, data, loading } = useQuery(IssueInfo, {
    variables: { id },
  });
  if (data === undefined && loading) {
    return <Loading />;
  }
  if (error) return <div>Error!!! {error.message}</div>;
  const buttonClick = async () => {
    if (reducerState.Tag.length === 0) {
      alert("Please select the Tag of the Issue");
      return;
    }
    console.log(id);
    const data: any = await updateIssue({
      variables: {
        uniqueId: id,
        issueName: reducerState.Name,
        tag: reducerState.Tag,
        issue: reducerState.Issue,
      },
    });
    if (!data) {
      console.log("Chill Nahi hein ");
    }
    history.push("/issues");
  };
  if (!dispatched) {
    dispatch({
      type: "editIssueinitialState",
      values: {
        Name: data.issuesInfo[0].issueName,
        Issue: data.issuesInfo[0].issue,
        Tag: data.issuesInfo[0].tag,
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
          defaultvalue={reducerState.Name}
          name={"Name"}
          dispatch={dispatch}
        />
        <Dropdown dispatch={dispatch} name={"Tag"} />
        <Inputs
          issue_project={true}
          dispatch={dispatch}
          defaultvalue={reducerState.Issue}
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

export default EditIssue;
