/** @format */

import React, { useEffect, useState } from "react";
import classes from "./EditIssue.module.css";
import Logo from "../../assets/Logo.svg";
import Heading from "../../components/Login_SignUp/Heading/Heading";
import Inputs from "../../components/Login_SignUp/Inputs/Inputs";
import Button from "../../components/Login_SignUp/Buttons/Button";
import { useForm } from "../../components/Custom Hooks/useForm";
import Dropdown from "../../components/Login_SignUp/Dropdown/Dropdown";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { IssueInfo } from "./EditIssueQuery";
import Loading from "../../components/Loading/Loading";

const EditIssue = () => {
  const history = useHistory();
  const [id, setid] = useState("")
  const ref = useForm({
          Name: "",
          Tag: "",
          Issue: "",
        });
  useEffect(() => {
    setid(history.location.pathname.split("/")[2])
  }, [])
  const { error, data, loading } = useQuery(IssueInfo, {
    variables:{id}
  })
  if (data === undefined && loading) {
    return <Loading/>
  }
  if (error) return <div>Error!!! {error.message}</div>;
  const buttonClick = async () => {
    console.log("Button Clicked")
  };
  console.log(data.issuesInfo[0])
  ref.values.current.Name = data.issuesInfo[0].issueName
  ref.values.current.Issue = data.issuesInfo[0].issue
  console.log(ref)
  return (
    <div className={classes.Container}>
      <div className={classes.logo}>
        <img src={Logo} />
      </div>
      <div className={classes.card}>
        <Heading Heading={"New Issue"} />
        <Inputs propvalue={ref.values.current.Name} change={ref.handleChange} name={"Name"} />
        <Dropdown change={ref.handleChange} name={"Tag"} />
        <Inputs
          issue_project={true}
          change={ref.handleChange}
          name={"Issue"}
          propvalue={ref.values.current.Issue}
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
