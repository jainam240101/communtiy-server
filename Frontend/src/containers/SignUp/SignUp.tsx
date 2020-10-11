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
  const ref = useForm({
    Name: "",
    Email: "",
    Password: "",
    Enrollment: "",
    Description: "",
  });
  const buttonClick = () => {
    createUser({
      variables: {
        name: ref.values.current.Name,
        email: ref.values.current.Email,
        password: ref.values.current.Password,
        enrollment: ref.values.current.Enrollment,
        description: ref.values.current.Description,
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
        <Inputs change={ref.handleChange} name={"Name"} />
        <Inputs change={ref.handleChange} name={"Email"} />
        <Inputs change={ref.handleChange} name={"Password"} password={true} />
        <Inputs change={ref.handleChange} name={"Enrollment"} />
        <Inputs
          change={ref.handleChange}
          name={"Description"}
          description={true}
        />
        <Button click={buttonClick} name={"Sign Up"} />
      </div>
    </div>
  );
};

export default Signup;
