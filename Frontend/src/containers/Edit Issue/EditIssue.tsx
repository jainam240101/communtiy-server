/** @format */

import React,{useEffect,useState} from "react";
import classes from "./EditIssue.module.css";
import Logo from "../../assets/Logo.svg";
import Heading from "../../components/Login_SignUp/Heading/Heading";
import Inputs from "../../components/Login_SignUp/Inputs/Inputs";
import Button from "../../components/Login_SignUp/Buttons/Button";
import { useForm } from "../../components/Custom Hooks/useForm";
import Dropdown from "../../components/Login_SignUp/Dropdown/Dropdown";
import { useHistory } from "react-router-dom";
import { cache } from "../..";
import { gql } from "@apollo/client";

const EditIssue = () => {
  const history = useHistory();
  const [id, setid] = useState("")
  const ref = useForm({
    Name: "",
    Tag: "",
    Issue: "",
  });
  const data: any = cache.readQuery({
    query: gql`
      query issuesInfo{
        issuesInfo(data:{id:1}){
          issueName
          tag         
      }
      }`
  })
  useEffect(() => {
    setid(history.location.pathname.split("/")[2])
  }, [])
  const buttonClick = async () => {
    console.log("Button Clicked")
  };
  return (
    <div className={classes.Container}>
      <div className={classes.logo}>
        <img src={Logo} />
      </div>
      <div className={classes.card}>
        <Heading Heading={"New Issue"} />
        <Inputs change={ref.handleChange} name={"Name"} />
        <Dropdown change={ref.handleChange} name={"Tag"} />
        <Inputs
          issue_project={true}
          change={ref.handleChange}
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
