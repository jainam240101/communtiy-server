/** @format */

import React from "react";
import classes from "./Login.module.css";
import Logo from "../../assets/Logo.svg";
import Heading from "../../components/Login_SignUp/Heading/Heading";
import Inputs from "../../components/Login_SignUp/Inputs/Inputs";
import Button from "../../components/Login_SignUp/Buttons/Button";
import { useForm } from "../../components/Custom Hooks/useForm";
import { useMutation } from "@apollo/client";
import { LoginUserMutation } from "./LoginMutation";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [loginUser] = useMutation(LoginUserMutation);
  const history = useHistory();
  const ref = useForm({
    Email: "",
    Password: "",
  });
  const buttonClick = async () => {
    const data: any = await loginUser({
      variables: {
        email: ref.values.current.Email,
        password: ref.values.current.Password,
      },
    });
    localStorage.setItem("token", data.data.loginUser.token);
    //Error Handling code goes here
    history.push("/");
  };
  return (
    <div className={classes.Container}>
      <div className={classes.logo}>
        <img src={Logo} />
      </div>
      <div className={classes.card}>
        <Heading Heading={"Log In"} />
        <Inputs change={ref.handleChange} name={"Email"} />
        <Inputs change={ref.handleChange} name={"Password"} password={true} />
        <Button click={buttonClick} name={"LogIn"} />
      </div>
    </div>
  );
};

export default Login;
