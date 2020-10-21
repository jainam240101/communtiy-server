/** @format */

import React from "react";
import classes from "./SignUp.module.css";
import Logo from "../../assets/Logo.svg";
import Heading from "../../components/Login_SignUp/Heading/Heading";
import Inputs from "../../components/Login_SignUp/Inputs/Inputs";
import Button from "../../components/Login_SignUp/Buttons/Button";
import { useForm } from "../../components/Custom Hooks/useForm";
import { createUserMutation } from "./mutationFile";
import { useMutation } from "@apollo/client";

const Signup = () => {
  const [createUser] = useMutation(createUserMutation);
  const [reducerState, dispatch] = useForm({
    Name: "",
    Email: "",
    Password: "",
    Enrollment: "",
    Description: "",
  });
  const buttonClick = () => {
    createUser({
      variables: {
        name: reducerState.Name,
        email: reducerState.Email,
        password: reducerState.Password,
        enrollment: reducerState.Enrollment,
        description: reducerState.Description,
      },
    });
  };
  return (
    <div className={classes.Container}>
      <div className={classes.logo}>
        <img src={Logo} />
      </div>
      <div className={classes.card}>
        <Heading Heading={"Sign Up"} />
        <Inputs defaultvalue={""} dispatch={dispatch} name={"Name"} />
        <Inputs defaultvalue={""} dispatch={dispatch} name={"Email"} />
        <Inputs
          defaultvalue={""}
          dispatch={dispatch}
          name={"Password"}
          password={true}
        />
        <Inputs defaultvalue={""} dispatch={dispatch} name={"Enrollment"} />
        <Inputs
          defaultvalue={""}
          dispatch={dispatch}
          name={"Description"}
          description={true}
        />
        <Button click={buttonClick} name={"Sign Up"} />
      </div>
    </div>
  );
};

export default Signup;
